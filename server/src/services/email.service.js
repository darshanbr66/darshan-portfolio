import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactNotification({
  name,
  email,
  message,
}) {
  const notificationEmail =
    process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined");
  }

  if (!notificationEmail) {
    throw new Error(
      "CONTACT_NOTIFICATION_EMAIL is not defined",
    );
  }

  const { data, error } = await resend.emails.send({
    from: "Darshan Portfolio <onboarding@resend.dev>",
    to: [notificationEmail],
    replyTo: email,
    subject: `New portfolio contact message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Message</h2>

        <p>
          <strong>Name:</strong> ${escapeHtml(name)}
        </p>

        <p>
          <strong>Email:</strong>
          <a href="mailto:${escapeHtml(email)}">
            ${escapeHtml(email)}
          </a>
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p style="white-space: pre-wrap;">
          ${escapeHtml(message)}
        </p>

        <hr />

        <p style="color: #666; font-size: 12px;">
          This message was submitted through your portfolio website.
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(
      error.message || "Resend failed to send email",
    );
  }

  console.log(
    "Contact notification email sent:",
    data?.id,
  );

  return data;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}