import "dotenv/config";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import { connectDatabase } from "../config/database.js";
import "dotenv/config";

const projects = [
  {
    title: "Roster Data Management",
    slug: "roster-data-management",
    category: "Professional",
    status: "published",
    featured: false,
    order: 1,
  },

  {
    title: "Patent Claim Parsing",
    slug: "patent-claim-parsing",
    category: "Professional",
    status: "published",
    featured: false,
    order: 2,
  },

  {
    title: "US Patent Blog Application",
    slug: "us-patent-blog-application",
    category: "Professional",
    status: "published",
    featured: false,
    order: 3,
  },

  {
    title: "Daily Routine App",
    slug: "daily-routine-app",
    category: "Personal Project",
    technologies: ["MERN"],
    status: "published",
    featured: false,
    order: 4,
    links: [
      {
        label: "GitHub",
        url: "https://github.com/darshanbr66/daily-routine-app",
      },
      {
        label: "Live",
        url: "https://daily-routine-app-zeta.vercel.app",
      },
    ],
  },
];

async function seedProjects() {
  try {
    await connectDatabase();

    await Project.deleteMany({});

    const insertedProjects = await Project.insertMany(projects);

    console.log(
      `Seeded ${insertedProjects.length} portfolio projects successfully.`,
    );
  } catch (error) {
    console.error("Failed to seed projects:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedProjects();