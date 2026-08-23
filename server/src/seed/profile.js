import "dotenv/config";
import mongoose from "mongoose";
import Profile from "../models/Profile.js";

const mongoUri = process.env.MONGODB_URI;

async function seedProfile() {
  try {
    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully");

    await Profile.deleteMany({});

    await Profile.create({
      name: "Darshan B R",
      role: "Software Engineer",
      title: "Full-Stack MERN Developer",
      headline: "Building practical web applications with modern technologies.",
      about:
        "I am a Software Engineer focused on building full-stack web applications using modern JavaScript technologies.",
      location: "",
      email: "darshanbr36@gmail.com",
      socialLinks: [
        {
          id: "github",
          label: "GitHub",
          url: "https://github.com/darshanbr66",
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/darshan-b-r-94ab92269/",
        },
        {
          id: "email",
          label: "Email",
          url: "mailto:darshanbr36@gmail.com",
        },
      ],
      status: "published",
    });

    console.log("Profile seeded successfully.");
  } catch (error) {
    console.error("Failed to seed profile:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedProfile();