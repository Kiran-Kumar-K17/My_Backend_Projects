import { File } from "../model/FileDB.js";
import fs from "fs";
import path from "path";

const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ _id: -1 });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files" });
  }
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(200).json({ Message: "Please Upload a File" });
    }
    await File.create({
      name: req.file.originalname,
      id: req.file.filename,
    });
    return res.redirect("/");
  } catch (error) {}
};

const deleteFile = async (req, res) => {
  try {
    // 1) Find DB record
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // 2) Build absolute file path
    const filePath = path.join(process.cwd(), "uploads", file.id);

    // 3) Delete file from disk (SAFE)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 4) Delete MongoDB record
    await File.findByIdAndDelete(req.params.id);

    // 5) Respond ONCE
    return res.status(200).json({
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export { uploadFile, getFiles, deleteFile };
