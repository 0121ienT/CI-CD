import client from "prom-client";

export const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const httpRequests = new client.Counter({
  name: "orders_http_requests_total",
  help: "Total HTTP requests handled by the orders app",
  labelNames: ["method", "route", "status"],
});

export const httpDuration = new client.Histogram({
  name: "orders_http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2],
});

export const ordersCreated = new client.Counter({
  name: "orders_created_total",
  help: "Total orders created through the API",
});

register.registerMetric(httpRequests);
register.registerMetric(httpDuration);
register.registerMetric(ordersCreated);

export function metricsMiddleware(req, res, next) {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const duration = Number(process.hrtime.bigint() - start) / 1_000_000_000;
    const route = req.route?.path ?? req.path;
    const labels = {
      method: req.method,
      route,
      status: String(res.statusCode),
    };

    httpRequests.inc(labels);
    httpDuration.observe(labels, duration);
  });

  next();
}
