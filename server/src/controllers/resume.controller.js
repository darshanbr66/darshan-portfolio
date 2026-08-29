import mongoose from "mongoose";
import Resume from "../models/Resume.js";
import { getGridFSBucket } from "../config/gridfs.js";
import path from "node:path";

function getContentType(filename, mimetype) {
  const extension = path
    .extname(filename)
    .toLowerCase();

  const contentTypes = {
    ".pdf": "application/pdf",
  };

  return (
    contentTypes[extension] ||
    mimetype ||
    "application/octet-stream"
  );
}

export async function setResume(req, res) {
  try {
    const { fileId } = req.body;

    if (!fileId) {
      return res.status(400).json({
        success: false,
        message: "File ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file ID.",
      });
    }

    const bucket = getGridFSBucket();

    const files = await bucket
      .find({
        _id: new mongoose.Types.ObjectId(fileId),
      })
      .toArray();

    if (!files.length) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    const file = files[0];

    const contentType = getContentType(
        file.filename,
        file.contentType,
    );

    if (contentType !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files can be set as the resume.",
      });
    }

    await Resume.deleteMany({});

    const resume = await Resume.create({
      fileId: file._id,
      filename: file.filename,
      status: "active",
    });

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully.",
      data: resume,
    });
  } catch (error) {
    console.error("Failed to set resume:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to set resume.",
    });
  }
}

export async function getResume(req, res) {
  try {
    const resume = await Resume.findOne({
      status: "active",
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    const bucket = getGridFSBucket();

    const files = await bucket
      .find({
        _id: resume.fileId,
      })
      .toArray();

    if (!files.length) {
      return res.status(404).json({
        success: false,
        message: "Resume file not found.",
      });
    }

    const file = files[0];

    res.setHeader(
      "Content-Type",
      file.contentType || "application/pdf",
    );

    res.setHeader(
      "Content-Disposition",
      "inline",
    );

    if (file.length !== undefined) {
      res.setHeader(
        "Content-Length",
        String(file.length),
      );
    }

    const downloadStream =
      bucket.openDownloadStream(file._id);

    downloadStream.on("error", (error) => {
      console.error(
        "Resume download failed:",
        error,
      );

      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          message: "Failed to retrieve resume.",
        });
      }

      res.end();
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error(
      "Failed to retrieve resume:",
      error,
    );

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve resume.",
      });
    }
  }
}

export async function getResumeAdmin(req, res) {
  try {
    const resume = await Resume.findOne({
      status: "active",
    });

    return res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error(
      "Failed to fetch active resume:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume.",
    });
  }
}