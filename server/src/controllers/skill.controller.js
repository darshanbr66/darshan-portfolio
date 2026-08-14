import Skill from "../models/Skill.js";

export async function getSkills(req, res) {
  try {
    const skills = await Skill.find({
      status: "published",
    }).sort({ order: 1 });

    return res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Failed to fetch skills:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
    });
  }
}