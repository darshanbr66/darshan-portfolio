import express from "express";
import { getExperiences } from "../controllers/experience.controller.js";

const router = express.Router();

router.get("/", getExperiences);

export default router;