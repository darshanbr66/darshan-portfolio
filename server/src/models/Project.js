import mongoose from "mongoose";

const projectLinkSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    technologies: {
      type: [String],
      default: [],
    },

    thumbnail: {
      type: String,
      trim: true,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    links: {
      type: [projectLinkSchema],
      default: [],
    },

    status: {
      type: String,
      trim: true,
      default: "draft",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },

    caseStudy: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

projectSchema.index({ featured: 1, order: 1 });

const Project = mongoose.model("Project", projectSchema);

export default Project;