import express from "express";
import {
  setResume,
  getResume,
  getResumeAdmin,
} from "../controllers/resume.controller.js";
import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public resume
router.get("/", getResume);

// Admin
router.get(
  "/admin",
  requireAdminAuth,
  getResumeAdmin,
);

router.put(
  "/admin",
  requireAdminAuth,
  setResume,
);

export default router;