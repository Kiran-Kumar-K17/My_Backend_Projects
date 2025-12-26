import express from "express";
import jobRoutes from "./routes/jobs.js";

const app = express();
app.use(express.json());

app.use("/jobs", jobRoutes);

app.listen(3000, () => {
  console.log("API running on port 3000");
});
