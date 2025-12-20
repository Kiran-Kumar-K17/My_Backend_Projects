import { Router } from "express";
import { uploadFile } from "../controllers/files.controller.js";
import { getFiles } from "../controllers/files.controller.js";
import { deleteFile } from "../controllers/files.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("profileImage"), uploadFile);
router.get("/", getFiles);
router.delete("/:id", deleteFile);
export default router;
