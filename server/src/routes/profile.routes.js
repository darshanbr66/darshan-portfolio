import express from "express";
import {
  getProfile,
  getProfileAdmin,
  updateProfile,
} from "../controllers/profile.controller.js";
import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getProfile);

// Admin
router.get("/admin", requireAdminAuth, getProfileAdmin);
router.put("/admin", requireAdminAuth, updateProfile);

export default router;