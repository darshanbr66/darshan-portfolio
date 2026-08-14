import "dotenv/config";
import mongoose from "mongoose";
import Experience from "../models/Experience.js";
import { connectDatabase } from "../config/database.js";

const experiences = [
  {
    company: "Sigvitas Private Limited",
    role: "Software Engineer",
    startDate: "November 2024",
    endDate: "Present",
    location: "",
    technologies: ["MERN", "Python"],
    description: "",
    responsibilities: [],
    status: "published",
    order: 1,
  },
];

async function seedExperiences() {
  try {
    await connectDatabase();

    await Experience.deleteMany({});

    await Experience.insertMany(experiences);

    console.log(
      `Seeded ${experiences.length} portfolio experience records successfully.`,
    );
  } catch (error) {
    console.error("Failed to seed experiences:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedExperiences();