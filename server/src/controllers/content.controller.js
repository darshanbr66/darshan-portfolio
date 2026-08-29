import Content from "../models/Content.js";

export async function getContent(req, res) {
  try {
    let content = await Content.findOne();

    if (!content) {
      content = await Content.create({});
    }

    return res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("Failed to fetch content:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch content",
    });
  }
}

export async function getContentAdmin(req, res) {
  try {
    let content = await Content.findOne();

    if (!content) {
      content = await Content.create({});
    }

    return res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error(
      "Failed to fetch content for admin:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch content",
    });
  }
}

export async function updateContent(req, res) {
  try {
    let content = await Content.findOne();

    if (!content) {
      content = await Content.create(req.body);
    } else {
      Object.assign(content, req.body);
      await content.save();
    }

    return res.status(200).json({
      success: true,
      message: "Content updated successfully.",
      data: content,
    });
  } catch (error) {
    console.error("Failed to update content:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update content",
    });
  }
}