import express from "express";
import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
connectDB();
app.use("/api/notes", notesRoute);

app.listen(5001, () => {
  console.log("server started at port: 5001");
});
