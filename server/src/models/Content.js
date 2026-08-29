import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    hero: {
      availableForLabel: {
        type: String,
        default: "Available for",
        trim: true,
      },

      availableForText: {
        type: String,
        default: "",
        trim: true,
      },

      exploreWorkLabel: {
        type: String,
        default: "Explore work",
        trim: true,
      },

      scrollLabel: {
        type: String,
        default: "Scroll to explore",
        trim: true,
      },
    },

    about: {
      sectionLabel: {
        type: String,
        default: "About",
        trim: true,
      },

      heading: {
        type: String,
        default: "A little about me.",
        trim: true,
      },

      backgroundLabel: {
        type: String,
        default: "Background",
        trim: true,
      },

      backgroundText: {
        type: String,
        default: "",
        trim: true,
      },
    },

    skills: {
      sectionLabel: {
        type: String,
        default: "Technology",
        trim: true,
      },

      heading: {
        type: String,
        default: "Skills",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },
    },

    experience: {
      sectionLabel: {
        type: String,
        default: "Experience",
        trim: true,
      },

      heading: {
        type: String,
        default: "Where I've worked.",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },
    },

    projects: {
      sectionLabel: {
        type: String,
        default: "Selected work",
        trim: true,
      },

      heading: {
        type: String,
        default: "Projects",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },
    },

    contact: {
      sectionLabel: {
        type: String,
        default: "Contact",
        trim: true,
      },

      heading: {
        type: String,
        default: "Get in touch",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },
    },

    footer: {
      eyebrow: {
        type: String,
        default: "Let's build something",
        trim: true,
      },

      heading: {
        type: String,
        default: "Have an idea?\nLet's talk.",
        trim: true,
      },

      buttonLabel: {
        type: String,
        default: "Start a conversation",
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Content = mongoose.model("Content", contentSchema);

export default Content;