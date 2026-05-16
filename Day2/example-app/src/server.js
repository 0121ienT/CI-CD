import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { checkDatabase, query } from "./db.js";
import { checkRedis, deleteKey, getJson, setJson } from "./cache.js";
import { metricsMiddleware, ordersCreated, register } from "./metrics.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");
const statsCacheKey = "orders:stats";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);
app.use(express.static(publicDir));

app.get("/health", async (_req, res) => {
  const checks = {
    api: "ok",
    database: "unknown",
    redis: "unknown",
  };

  try {
    checks.database = await checkDatabase();
    checks.redis = await checkRedis();
    res.json({ status: "ok", checks });
  } catch (error) {
    res.status(503).json({
      status: "degraded",
      checks,
      error: error.message,
    });
  }
});

app.get("/api/orders", async (_req, res, next) => {
  try {
    const result = await query(
      `select id, customer, item, quantity, status, created_at
       from orders
       order by created_at desc
       limit 25`,
    );

    res.json({ orders: result.rows });
  } catch (error) {
    next(error);
  }
});

app.post("/api/orders", async (req, res, next) => {
  try {
    const { customer, item, quantity } = req.body;
    const normalizedQuantity = Number(quantity);

    if (!customer || !item || !Number.isInteger(normalizedQuantity) || normalizedQuantity < 1) {
      res.status(400).json({
        error: "customer, item, and a positive integer quantity are required",
      });
      return;
    }

    const result = await query(
      `insert into orders (customer, item, quantity)
       values ($1, $2, $3)
       returning id, customer, item, quantity, status, created_at`,
      [customer.trim(), item.trim(), normalizedQuantity],
    );

    await deleteKey(statsCacheKey);
    ordersCreated.inc();
    res.status(201).json({ order: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

app.get("/api/stats", async (_req, res, next) => {
  try {
    const cached = await getJson(statsCacheKey);
    if (cached) {
      res.json({ source: "redis", stats: cached });
      return;
    }

    const result = await query(
      `select
        count(*)::int as total_orders,
        coalesce(sum(quantity), 0)::int as total_items
       from orders`,
    );
    const stats = result.rows[0];

    await setJson(statsCacheKey, stats);
    res.json({ source: "postgres", stats });
  } catch (error) {
    next(error);
  }
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "internal server error" });
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, () => {
    console.log(`Orders app listening on port ${port}`);
  });
}
