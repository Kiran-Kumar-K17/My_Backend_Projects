import express from "express";
import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
//Middleware
app.use(express.json());

app.use(rateLimiter);

const PORT = process.env.PORT;
app.use("/api/notes", notesRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started at port: ${PORT}`);
  });
});
