import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import { heavyTask } from "../utils/fakeTask.js";

new Worker(
  "job-queue",
  async (job) => {
    console.log("Worker processing job:", job.id);
    await heavyTask(job.data);
  },
  {
    connection: redis,
    attempts: 3,
  }
);
