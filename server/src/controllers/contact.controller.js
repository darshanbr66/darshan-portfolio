import ContactMessage from "../models/ContactMessage.js";
import {
  sendContactNotification,
  sendContactConfirmation,
} from "../services/email.service.js";

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

    /*
     * First send the notification to the portfolio owner.
     *
     * The visitor confirmation email will only be sent
     * if this notification succeeds.
     */
    try {
      await sendContactNotification({
        name: contactMessage.name,
        email: contactMessage.email,
        message: contactMessage.message,
      });
    } catch (emailError) {
      console.error(
        "Contact message saved, but owner notification failed:",
        emailError,
      );

      return res.status(500).json({
        success: false,
        message:
          "Your message was saved, but we could not complete the notification process. Please try again.",
      });
    }

    /*
     * Owner notification succeeded.
     *
     * Now send the confirmation email to the visitor.
     */
    try {
      await sendContactConfirmation({
        name: contactMessage.name,
        email: contactMessage.email,
        message: contactMessage.message,
      });
    } catch (confirmationError) {
      /*
       * The owner's notification was already successful,
       * so we don't fail the entire request.
       *
       * The message is safely stored and you have already
       * received the notification.
       */
      console.error(
        "Owner notification sent, but visitor confirmation failed:",
        confirmationError,
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