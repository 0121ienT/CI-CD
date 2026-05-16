import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

redis.on("error", (error) => {
  console.error("Redis error", error);
});

export async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
}

export async function checkRedis() {
  await connectRedis();
  await redis.ping();
  return "ok";
}

export async function getJson(key) {
  await connectRedis();
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
}

export async function setJson(key, value, ttlSeconds = 30) {
  await connectRedis();
  await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
}

export async function deleteKey(key) {
  await connectRedis();
  await redis.del(key);
}
