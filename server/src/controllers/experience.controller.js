import Experience from "../models/Experience.js";

const ALLOWED_STATUS = ["published", "draft"];

function validateExperiencePayload(body, { partial = false } = {}) {
  const errors = {};

  if (!partial || body.company !== undefined) {
    if (
      typeof body.company !== "string" ||
      !body.company.trim()
    ) {
      errors.company = "Company is required.";
    }
  }

  if (!partial || body.role !== undefined) {
    if (
      typeof body.role !== "string" ||
      !body.role.trim()
    ) {
      errors.role = "Role is required.";
    }
  }

  if (!partial || body.startDate !== undefined) {
    if (
      typeof body.startDate !== "string" ||
      !body.startDate.trim()
    ) {
      errors.startDate = "Start date is required.";
    }
  }

  if (body.endDate !== undefined && typeof body.endDate !== "string") {
    errors.endDate = "End date must be a string.";
  }

  if (body.location !== undefined && typeof body.location !== "string") {
    errors.location = "Location must be a string.";
  }

  if (body.technologies !== undefined) {
    if (
      !Array.isArray(body.technologies) ||
      body.technologies.some(
        (technology) => typeof technology !== "string",
      )
    ) {
      errors.technologies =
        "Technologies must be an array of strings.";
    }
  }

  if (body.description !== undefined && typeof body.description !== "string") {
    errors.description = "Description must be a string.";
  }

  if (body.responsibilities !== undefined) {
    if (
      !Array.isArray(body.responsibilities) ||
      body.responsibilities.some(
        (responsibility) => typeof responsibility !== "string",
      )
    ) {
      errors.responsibilities =
        "Responsibilities must be an array of strings.";
    }
  }

  if (body.status !== undefined) {
    if (
      typeof body.status !== "string" ||
      !ALLOWED_STATUS.includes(body.status)
    ) {
      errors.status =
        "Status must be either 'published' or 'draft'.";
    }
  }

  if (body.order !== undefined) {
    if (
      typeof body.order !== "number" ||
      !Number.isFinite(body.order)
    ) {
      errors.order = "Order must be a valid number.";
    }
  }

  return errors;
}

/*
 * PUBLIC
 *
 * Returns only published experiences.
 */
export async function getExperiences(req, res) {
  try {
    const experiences = await Experience.find({
      status: "published",
    }).sort({
      order: 1,
      startDate: -1,
    });

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

/*
 * ADMIN
 *
 * Returns all experiences, including drafts.
 */
export async function getAllExperiences(req, res) {
  try {
    const experiences = await Experience.find().sort({
      order: 1,
      startDate: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("Failed to fetch all experiences:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
    });
  }
}

/*
 * ADMIN
 *
 * Create a new experience.
 */
export async function createExperience(req, res) {
  try {
    const errors = validateExperiencePayload(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid experience data.",
        errors,
      });
    }

    const {
      company,
      role,
      startDate,
      endDate,
      location,
      technologies,
      description,
      responsibilities,
      status,
      order,
    } = req.body;

    const experience = await Experience.create({
      company: company.trim(),
      role: role.trim(),
      startDate: startDate.trim(),
      endDate:
        typeof endDate === "string" && endDate.trim()
          ? endDate.trim()
          : "Present",
      location:
        typeof location === "string"
          ? location.trim()
          : "",
      technologies: Array.isArray(technologies)
        ? technologies.map((item) => item.trim()).filter(Boolean)
        : [],
      description:
        typeof description === "string"
          ? description.trim()
          : "",
      responsibilities: Array.isArray(responsibilities)
        ? responsibilities
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      status: status || "published",
      order: order ?? 0,
    });

    return res.status(201).json({
      success: true,
      message: "Experience created successfully.",
      data: experience,
    });
  } catch (error) {
    console.error("Failed to create experience:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create experience.",
    });
  }
}

/*
 * ADMIN
 *
 * Update an existing experience.
 */
export async function updateExperience(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Experience ID is required.",
      });
    }

    const errors = validateExperiencePayload(req.body, {
      partial: true,
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid experience data.",
        errors,
      });
    }

    const allowedFields = [
      "company",
      "role",
      "startDate",
      "endDate",
      "location",
      "technologies",
      "description",
      "responsibilities",
      "status",
      "order",
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (typeof updateData.company === "string") {
      updateData.company = updateData.company.trim();
    }

    if (typeof updateData.role === "string") {
      updateData.role = updateData.role.trim();
    }

    if (typeof updateData.startDate === "string") {
      updateData.startDate = updateData.startDate.trim();
    }

    if (typeof updateData.endDate === "string") {
      updateData.endDate = updateData.endDate.trim();
    }

    if (typeof updateData.location === "string") {
      updateData.location = updateData.location.trim();
    }

    if (typeof updateData.description === "string") {
      updateData.description = updateData.description.trim();
    }

    if (Array.isArray(updateData.technologies)) {
      updateData.technologies = updateData.technologies
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (Array.isArray(updateData.responsibilities)) {
      updateData.responsibilities = updateData.responsibilities
        .map((item) => item.trim())
        .filter(Boolean);
    }

    const experience = await Experience.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully.",
      data: experience,
    });
  } catch (error) {
    console.error("Failed to update experience:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update experience.",
    });
  }
}

/*
 * ADMIN
 *
 * Delete an existing experience.
 */
export async function deleteExperience(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Experience ID is required.",
      });
    }

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully.",
    });
  } catch (error) {
    console.error("Failed to delete experience:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete experience.",
    });
  }
}