import mongoose from "mongoose";
import { Readable } from "node:stream";
import { getGridFSBucket } from "../config/gridfs.js";

export async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const bucket = getGridFSBucket();

    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
      metadata: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
    });

    Readable.from(req.file.buffer).pipe(uploadStream);

    uploadStream.on("finish", () => {
      return res.status(201).json({
        success: true,
        message: "File uploaded successfully.",
        data: {
          id: uploadStream.id,
          filename: req.file.originalname,
          contentType: req.file.mimetype,
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

    const files = await bucket.find({
      _id: new mongoose.Types.ObjectId(id),
    }).toArray();

    if (!files.length) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    const file = files[0];

    res.set("Content-Type", file.contentType || "application/octet-stream");

    if (file.length !== undefined) {
      res.set("Content-Length", String(file.length));
    }

    const downloadStream = bucket.openDownloadStream(file._id);

    downloadStream.on("error", (error) => {
      console.error("GridFS download failed:", error);

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
    console.error("Failed to retrieve file:", error);

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

    const files = await bucket.find({
      _id: fileId,
    }).toArray();

    if (!files.length) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
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