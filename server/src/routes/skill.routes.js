import express from "express";
import {
  getSkills,
  getAllSkillsAdmin,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";
import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getSkills);

// Admin
router.get("/admin/all", requireAdminAuth, getAllSkillsAdmin);
router.post("/admin", requireAdminAuth, createSkill);
router.put("/admin/:id", requireAdminAuth, updateSkill);
router.delete("/admin/:id", requireAdminAuth, deleteSkill);

export default router;