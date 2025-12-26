import express from "express";
import { cache } from "../middleware/cache.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import { getDataFromDB } from "../utils/fakeDB.js";

const router = express.Router();

router.get("/data", cache("data", 30), async (req, res) => {
  const data = await getDataFromDB();
  res.json(data);
});

router.post("/login", rateLimiter(3, 60), (req, res) => {
  res.json({ message: "Login attempt accepted" });
});

export default router;
