import "dotenv/config";
import mongoose from "mongoose";
import Skill from "../models/Skill.js";
import { connectDatabase } from "../config/database.js";

const skills = [
  {
    name: "MERN",
    category: "Technology",
    description: "",
    status: "published",
    order: 1,
  },
  {
    name: "Python",
    category: "Technology",
    description: "",
    status: "published",
    order: 2,
  },
];

async function seedSkills() {
  try {
    await connectDatabase();

    await Skill.deleteMany({});

    await Skill.insertMany(skills);

    console.log(
      `Seeded ${skills.length} portfolio skills successfully.`,
    );
  } catch (error) {
    console.error("Failed to seed skills:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedSkills();