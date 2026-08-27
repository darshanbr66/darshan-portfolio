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

export async function getAllSkillsAdmin(req, res) {
  try {
    const skills = await Skill.find().sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Failed to fetch all skills:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
    });
  }
}

export async function createSkill(req, res) {
  try {
    const skill = await Skill.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Skill created successfully.",
      data: skill,
    });
  } catch (error) {
    console.error("Failed to create skill:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create skill",
    });
  }
}

export async function updateSkill(req, res) {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully.",
      data: skill,
    });
  } catch (error) {
    console.error("Failed to update skill:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update skill",
    });
  }
}

export async function deleteSkill(req, res) {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully.",
    });
  } catch (error) {
    console.error("Failed to delete skill:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete skill",
    });
  }
}