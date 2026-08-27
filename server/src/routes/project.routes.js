import { Router } from "express";

import {
  getProjects,
  getProjectBySlug,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = Router();

// --------------------------------------------------
// Public routes
// --------------------------------------------------

router.get("/", getProjects);

// --------------------------------------------------
// Admin routes
// --------------------------------------------------

router.get("/admin/all", requireAdminAuth, getAdminProjects);

router.post("/", requireAdminAuth, createProject);

router.put("/:id", requireAdminAuth, updateProject);

router.delete("/:id", requireAdminAuth, deleteProject);

// --------------------------------------------------
// Public project detail
// --------------------------------------------------

router.get("/:slug", getProjectBySlug);

export default router;