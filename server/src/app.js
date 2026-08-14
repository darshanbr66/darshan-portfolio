import "dotenv/config";
import cors from "cors";
import express from "express";
import projectRoutes from "./routes/project.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import skillRoutes from "./routes/skill.routes.js";

const app = express();

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
  });
});

app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/experience", experienceRoutes);
app.use("/api/v1/skills", skillRoutes);


export default app;