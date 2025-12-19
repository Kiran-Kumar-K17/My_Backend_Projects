import express from "express";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import { File } from "./model/FileDB.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = 8000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), async (req, res) => {
  if (!req.file) {
    return res.status(200).json({ Message: "Please Upload a File" });
  }
  await File.create({
    name: req.file.originalname,
    id: req.file.filename,
  });
  return res.redirect("/");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening in Port: ${process.env.PORT}`);
});
