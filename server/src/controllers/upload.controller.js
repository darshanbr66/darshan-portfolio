import mongoose from "mongoose";
import { Readable } from "node:stream";
import { getGridFSBucket } from "../config/gridfs.js";
import path from "node:path";
import Resume from "../models/Resume.js";

function getContentType(filename, mimetype) {
  const extension = path
    .extname(filename)
    .toLowerCase();

  const contentTypes = {
    ".pdf": "application/pdf",

    ".txt": "text/plain",
    ".html": "text/html",
    ".htm": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",

    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".bmp": "image/bmp",
    ".ico": "image/x-icon",

    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",

    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".ogv": "video/ogg",

    ".doc": "application/msword",
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    ".xls": "application/vnd.ms-excel",
    ".xlsx":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    ".ppt": "application/vnd.ms-powerpoint",
    ".pptx":
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  };

  return (
    contentTypes[extension] ||
    mimetype ||
    "application/octet-stream"
  );
}

export async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const bucket = getGridFSBucket();

    const contentType = getContentType(
      req.file.originalname,
      req.file.mimetype,
    );

    const uploadStream = bucket.openUploadStream(
      req.file.originalname,
      {
        contentType,
        metadata: {
          originalName: req.file.originalname,
          mimeType: contentType,
          size: req.file.size,
        },
      },
    );

    Readable.from(req.file.buffer).pipe(uploadStream);

    uploadStream.on("finish", () => {
      return res.status(201).json({
        success: true,
        message: "File uploaded successfully.",
        data: {
          id: uploadStream.id,
          filename: req.file.originalname,
          contentType,
          size: req.file.size,
        },
      });
    });

    uploadStream.on("error", (error) => {
      console.error("GridFS upload failed:", error);

      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload file.",
        });
      }
    });
  } catch (error) {
    console.error("Failed to upload file:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload file.",
    });
  }
}

export async function getAllFiles(req, res) {
  try {
    const bucket = getGridFSBucket();

    const files = await bucket
      .find({})
      .sort({ uploadDate: -1 })
      .toArray();

    const activeResume = await Resume.findOne({
      status: "active",
    });

    const activeResumeId = activeResume?.fileId
      ? String(activeResume.fileId)
      : null;

    return res.status(200).json({
      success: true,
      data: files.map((file) => ({
        id: file._id,
        filename: file.filename,
        contentType: getContentType(
          file.filename,
          file.contentType,
        ),
        size: file.length || 0,
        uploadDate: file.uploadDate,
        isResume:
          activeResumeId === String(file._id),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch files:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch files.",
    });
  }
}

export async function setResume(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file ID.",
      });
    }

    const bucket = getGridFSBucket();

    const fileId = new mongoose.Types.ObjectId(id);

    const files = await bucket
      .find({
        _id: fileId,
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
        message: "Only PDF files can be used as the resume.",
      });
    }

    await Resume.deleteMany({});

    const resume = await Resume.create({
      fileId,
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
      await Resume.deleteOne({
        _id: resume._id,
      });

      return res.status(404).json({
        success: false,
        message: "Resume file not found.",
      });
    }

    const file = files[0];

    const contentType =
      file.contentType || "application/pdf";

    res.setHeader("Content-Type", contentType);

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
        "GridFS resume download failed:",
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

export async function getFile(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file ID.",
      });
    }

    const bucket = getGridFSBucket();

    const files = await bucket
      .find({
        _id: new mongoose.Types.ObjectId(id),
      })
      .toArray();

    if (!files.length) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    const file = files[0];

    const contentType =
      file.contentType || "application/octet-stream";

    res.setHeader("Content-Type", contentType);

    /*
     * Tell the browser to display browser-supported
     * file types instead of downloading them.
     */
    const inlineTypes = [
      "application/pdf",
      "text/plain",
      "text/html",
      "application/json",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "image/bmp",
      "image/x-icon",
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "video/mp4",
      "video/webm",
      "video/ogg",
    ];

    if (inlineTypes.includes(contentType)) {
      res.setHeader(
        "Content-Disposition",
        "inline",
      );
    } else {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${encodeURIComponent(
          file.filename,
        )}"`,
      );
    }

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
        "GridFS download failed:",
        error,
      );

      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          message: "Failed to retrieve file.",
        });
      }

      res.end();
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error(
      "Failed to retrieve file:",
      error,
    );

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve file.",
      });
    }
  }
}

export async function deleteFile(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file ID.",
      });
    }

    const bucket = getGridFSBucket();

    const fileId = new mongoose.Types.ObjectId(id);

    const files = await bucket
      .find({
        _id: fileId,
      })
      .toArray();

    if (!files.length) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    const activeResume = await Resume.findOne({
      fileId,
      status: "active",
    });

    if (activeResume) {
      return res.status(400).json({
        success: false,
        message:
          "The active resume cannot be deleted. Set another resume first.",
      });
    }

    await bucket.delete(fileId);

    return res.status(200).json({
      success: true,
      message: "File deleted successfully.",
    });
  } catch (error) {
    console.error("Failed to delete file:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete file.",
    });
  }
}