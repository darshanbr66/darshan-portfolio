import express from "express";
import {
  getExperiences,
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";
import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

/*
 * PUBLIC
 *
 * Only published experiences are exposed.
 */
router.get("/", getExperiences);

/*
 * ADMIN
 *
 * All experiences, including drafts.
 */
router.get(
  "/admin/all",
  requireAdminAuth,
  getAllExperiences,
);

/*
 * ADMIN
 *
 * Create experience.
 */
router.post(
  "/",
  requireAdminAuth,
  createExperience,
);

/*
 * ADMIN
 *
 * Update experience.
 */
router.put(
  "/:id",
  requireAdminAuth,
  updateExperience,
);

/*
 * ADMIN
 *
 * Delete experience.
 */
router.delete(
  "/:id",
  requireAdminAuth,
  deleteExperience,
);

export default router;