import express from "express";
import rateLimit from "express-rate-limit";
import { createContactMessage } from "../controllers/contact.controller.js";

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

router.post("/", contactLimiter, createContactMessage);

export default router;