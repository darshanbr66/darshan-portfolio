import express from "express";
import multer from "multer";
import {
  uploadFile,
  getAllFiles,
  getFile,
  deleteFile,
} from "../controllers/upload.controller.js";
import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  requireAdminAuth,
  upload.single("file"),
  uploadFile,
);

router.get(
  "/admin/all",
  requireAdminAuth,
  getAllFiles,
);

router.get("/:id", getFile);

router.delete(
  "/:id",
  requireAdminAuth,
  deleteFile,
);

export default router;