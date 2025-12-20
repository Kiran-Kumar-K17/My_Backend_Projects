import express from "express";
import uploadFileRouter from "./routes/files.routes.js";
import path from "path";
import cors from "cors";

const app = express(); // created an express app

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/uploads", express.static("uploads"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ✅ ROOT ROUTE
app.get("/", (req, res) => {
  res.render("homepage");
});

// routes
app.use("/api/v1/file", uploadFileRouter);

export default app;
