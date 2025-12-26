import { redis } from "../config/redis.js";

export const rateLimiter =
  (limit = 5, windowSec = 60) =>
  async (req, res, next) => {
    const ip = req.ip;
    const key = `rl:${ip}`;

    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, windowSec);

    if (count > limit) {
      return res.status(429).json({ message: "Too many requests" });
    }

    next();
  };
