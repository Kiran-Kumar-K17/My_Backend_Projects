import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotev from "dotenv";

dotev.config();
//create a rate-limiter that allow 10 request in 20 seconds
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default rateLimit;
