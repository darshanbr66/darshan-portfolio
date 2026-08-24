import ContactMessage from "../models/ContactMessage.js";
import { sendContactNotification } from "../services/email.service.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createContactMessage(req, res) {
  try {
    const { name, email, message } = req.body;

    // Validate data types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    // Normalize input
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    // Validate required values
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    // Validate name length
    if (trimmedName.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Name is too long.",
      });
    }

    // Validate email
    if (
      trimmedEmail.length > 200 ||
      !EMAIL_REGEX.test(trimmedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Validate message length
    if (trimmedMessage.length > 5000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long.",
      });
    }

    // Save message to MongoDB
    const contactMessage = await ContactMessage.create({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    // Send email notification
    try {
      await sendContactNotification({
        name: contactMessage.name,
        email: contactMessage.email,
        message: contactMessage.message,
      });
    } catch (emailError) {
      console.error(
        "Contact message saved, but email notification failed:",
        emailError,
      );
    }

    return res.status(201).json({
      success: true,
      message: "Your message has been received.",
      data: {
        id: contactMessage._id,
      },
    });
  } catch (error) {
    console.error("Failed to create contact message:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send your message.",
    });
  }
}