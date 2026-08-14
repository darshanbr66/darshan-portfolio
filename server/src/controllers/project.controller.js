import Project from "../models/Project.js";

export async function getProjects(req, res) {
  try {
    const projects = await Project.find({
      status: "published",
    }).sort({
      featured: -1,
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
}

export async function getProjectBySlug(req, res) {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
}