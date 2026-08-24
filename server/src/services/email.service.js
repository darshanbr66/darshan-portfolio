import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendContactNotification({
  name,
  email,
  message,
}) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_NOTIFICATION_EMAIL,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: [
      `You received a new message through your portfolio.`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });
}