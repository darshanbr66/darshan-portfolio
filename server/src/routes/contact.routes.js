import express from "express";
import rateLimit from "express-rate-limit";
import {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
  updateContactMessageStatus,
} from "../controllers/contact.controller.js";
import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages. Please try again later.",
  },
});

// Public
router.post("/", contactLimiter, createContactMessage);

// Admin
router.get("/admin/all", requireAdminAuth, getContactMessages);

router.patch(
  "/admin/:id/status",
  requireAdminAuth,
  updateContactMessageStatus,
);

router.delete("/admin/:id", requireAdminAuth, deleteContactMessage);

export default router;