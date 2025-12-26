import { redis } from "../config/redis.js";

export const cache =
  (keyPrefix, ttl = 60) =>
  async (req, res, next) => {
    const key = `${keyPrefix}:${req.originalUrl}`;
    const cached = await redis.get(key);

    if (cached) {
      return res.json({ source: "cache", data: JSON.parse(cached) });
    }

    res.sendResponse = res.json;
    res.json = async (body) => {
      await redis.setex(key, ttl, JSON.stringify(body));
      res.sendResponse({ source: "db", data: body });
    };

    next();
  };
