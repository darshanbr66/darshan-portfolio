import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },

    filename: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;