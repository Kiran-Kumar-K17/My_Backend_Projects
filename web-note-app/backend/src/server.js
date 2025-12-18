import express from "express";
import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
connectDB();

//Middleware
app.use(express.json());

const PORT = process.env.PORT;
app.use("/api/notes", notesRoute);

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
