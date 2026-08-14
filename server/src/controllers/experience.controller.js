import Experience from "../models/Experience.js";

export async function getExperiences(req, res) {
  try {
    const experiences = await Experience.find({
      status: "published",
    }).sort({ order: 1, startDate: -1 });

    return res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("Failed to fetch experiences:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
    });
  }
}