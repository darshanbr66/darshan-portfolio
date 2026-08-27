import Project from "../models/Project.js";

function normalizeProjectData(body) {
  const {
    title,
    slug,
    category,
    shortDescription,
    description,
    technologies,
    thumbnail,
    images,
    links,
    status,
    featured,
    order,
    caseStudy,
  } = body;

  return {
    title,
    slug,
    category,
    shortDescription,
    description,
    technologies,
    thumbnail,
    images,
    links,
    status,
    featured,
    order,
    caseStudy,
  };
}

// --------------------------------------------------
// PUBLIC
// --------------------------------------------------

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

// --------------------------------------------------
// ADMIN
// --------------------------------------------------

export async function getAdminProjects(req, res) {
  try {
    const projects = await Project.find().sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Failed to fetch admin projects:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
}

export async function createProject(req, res) {
  try {
    const projectData = normalizeProjectData(req.body);

    if (
      typeof projectData.title !== "string" ||
      !projectData.title.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Project title is required.",
      });
    }

    if (
      typeof projectData.slug !== "string" ||
      !projectData.slug.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Project slug is required.",
      });
    }

    if (
      typeof projectData.category !== "string" ||
      !projectData.category.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Project category is required.",
      });
    }

    projectData.title = projectData.title.trim();
    projectData.slug = projectData.slug.trim().toLowerCase();
    projectData.category = projectData.category.trim();

    const existingProject = await Project.findOne({
      slug: projectData.slug,
    });

    if (existingProject) {
      return res.status(409).json({
        success: false,
        message: "A project with this slug already exists.",
      });
    }

    const project = await Project.create(projectData);

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: project,
    });
  } catch (error) {
    console.error("Failed to create project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
}

export async function updateProject(req, res) {
  try {
    const projectData = normalizeProjectData(req.body);

    if (projectData.slug !== undefined) {
      if (
        typeof projectData.slug !== "string" ||
        !projectData.slug.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Project slug cannot be empty.",
        });
      }

      projectData.slug = projectData.slug.trim().toLowerCase();
    }

    if (projectData.title !== undefined) {
      if (
        typeof projectData.title !== "string" ||
        !projectData.title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Project title cannot be empty.",
        });
      }

      projectData.title = projectData.title.trim();
    }

    if (projectData.category !== undefined) {
      if (
        typeof projectData.category !== "string" ||
        !projectData.category.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Project category cannot be empty.",
        });
      }

      projectData.category = projectData.category.trim();
    }

    if (projectData.slug) {
      const duplicateProject = await Project.findOne({
        slug: projectData.slug,
        _id: { $ne: req.params.id },
      });

      if (duplicateProject) {
        return res.status(409).json({
          success: false,
          message: "A project with this slug already exists.",
        });
      }
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: project,
    });
  } catch (error) {
    console.error("Failed to update project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
}

export async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("Failed to delete project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
}