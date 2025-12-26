import IoRedis from "ioredis";

export const redis = new IoRedis({
  host: "127.0.0.1",
  port: "6379",
});
