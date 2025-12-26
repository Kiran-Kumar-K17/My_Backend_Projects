import express from "express";
import { jobQueue } from "../queue/index.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const job = await jobQueue.add("heavy-job", req.body);

  res.status(202).json({
    message: "Job added to queue",
    jobId: job.id,
  });
});

export default router;
