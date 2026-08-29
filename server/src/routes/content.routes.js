import express from "express";
import {
  getContent,
  getContentAdmin,
  updateContent,
} from "../controllers/content.controller.js";
import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getContent);

// Admin
router.get(
  "/admin",
  requireAdminAuth,
  getContentAdmin,
);

router.put(
  "/admin",
  requireAdminAuth,
  updateContent,
);

export default router;