import ContactMessage from "../models/ContactMessage.js";

export async function createContactMessage(req, res) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      message,
    });

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