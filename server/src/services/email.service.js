import { Resend } from "resend";

import { buildUserContactEmail } from "./email/userContactEmail.js";

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

  const receivedAt = new Date();

  const formattedDate = receivedAt.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const { data, error } = await resend.emails.send({
    from: "Darshan Portfolio <onboarding@resend.dev>",
    to: [notificationEmail],
    replyTo: email,

    subject: `New portfolio inquiry from ${name}`,

    text: `
New Contact Inquiry
-------------------

Someone contacted you through your portfolio.

Name: ${name}
Email: ${email}

Message:
${message}

Received: ${formattedDate}

Reply directly to this email to respond to ${name}.
`,

    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>New Contact Inquiry</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f5f5f3;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif;
    color: #18181b;
  "
>

  <!-- Outer wrapper -->
  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
      width: 100%;
      background-color: #f5f5f3;
      margin: 0;
      padding: 0;
    "
  >
    <tr>
      <td
        align="center"
        style="padding: 40px 16px;"
      >

        <!-- Main container -->
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 640px;
            width: 100%;
            background-color: #ffffff;
            border: 1px solid #e5e5e5;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                padding: 28px 32px;
                border-bottom: 1px solid #e5e5e5;
              "
            >

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>

                  <!-- Brand -->
                  <td
                    valign="middle"
                    style="
                      font-size: 15px;
                      font-weight: 700;
                      letter-spacing: -0.02em;
                      color: #18181b;
                    "
                  >
                    <span
                      style="
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        background-color: #18181b;
                        color: #ffffff;
                        font-size: 13px;
                        font-weight: 700;
                        margin-right: 10px;
                        vertical-align: middle;
                      "
                    >
                      D
                    </span>

                    DARSHAN PORTFOLIO
                  </td>

                  <!-- Badge -->
                  <td
                    align="right"
                    valign="middle"
                  >
                    <span
                      style="
                        display: inline-block;
                        padding: 6px 9px;
                        border: 1px solid #d4d4d4;
                        color: #52525b;
                        font-size: 10px;
                        font-weight: 700;
                        letter-spacing: 0.12em;
                      "
                    >
                      NEW INQUIRY
                    </span>
                  </td>

                </tr>
              </table>

            </td>
          </tr>


          <!-- Intro -->
          <tr>
            <td
              style="
                padding: 44px 32px 28px;
              "
            >

              <p
                style="
                  margin: 0 0 12px;
                  color: #71717a;
                  font-size: 11px;
                  font-weight: 700;
                  letter-spacing: 0.18em;
                  text-transform: uppercase;
                "
              >
                Contact
              </p>

              <h1
                style="
                  margin: 0;
                  color: #18181b;
                  font-size: 32px;
                  line-height: 1.15;
                  font-weight: 600;
                  letter-spacing: -0.04em;
                "
              >
                New contact inquiry
              </h1>

              <p
                style="
                  margin: 16px 0 0;
                  color: #71717a;
                  font-size: 15px;
                  line-height: 1.7;
                "
              >
                Someone reached out through your portfolio website.
              </p>

            </td>
          </tr>


          <!-- Divider -->
          <tr>
            <td style="padding: 0 32px;">
              <div
                style="
                  height: 1px;
                  background-color: #e5e5e5;
                  line-height: 1px;
                  font-size: 1px;
                "
              >
                &nbsp;
              </div>
            </td>
          </tr>


          <!-- Sender -->
          <tr>
            <td
              style="
                padding: 28px 32px 10px;
              "
            >

              <p
                style="
                  margin: 0 0 14px;
                  color: #71717a;
                  font-size: 10px;
                  font-weight: 700;
                  letter-spacing: 0.16em;
                  text-transform: uppercase;
                "
              >
                From
              </p>

              <p
                style="
                  margin: 0;
                  color: #18181b;
                  font-size: 20px;
                  line-height: 1.4;
                  font-weight: 600;
                  letter-spacing: -0.02em;
                "
              >
                ${safeName}
              </p>

              <p
                style="
                  margin: 5px 0 0;
                  font-size: 14px;
                  line-height: 1.5;
                "
              >
                <a
                  href="mailto:${safeEmail}"
                  style="
                    color: #52525b;
                    text-decoration: none;
                  "
                >
                  ${safeEmail}
                </a>
              </p>

            </td>
          </tr>


          <!-- Message -->
          <tr>
            <td
              style="
                padding: 24px 32px 32px;
              "
            >

              <p
                style="
                  margin: 0 0 12px;
                  color: #71717a;
                  font-size: 10px;
                  font-weight: 700;
                  letter-spacing: 0.16em;
                  text-transform: uppercase;
                "
              >
                Message
              </p>

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td
                    style="
                      padding: 22px;
                      background-color: #fafafa;
                      border: 1px solid #e5e5e5;
                      border-left: 3px solid #18181b;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        color: #27272a;
                        font-size: 15px;
                        line-height: 1.8;
                        white-space: pre-wrap;
                      "
                    >
                      ${safeMessage}
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>


          <!-- CTA -->
          <tr>
            <td
              style="
                padding: 0 32px 36px;
              "
              align="left"
            >

              <a
                href="mailto:${safeEmail}"
                style="
                  display: inline-block;
                  padding: 14px 22px;
                  background-color: #18181b;
                  color: #ffffff;
                  font-size: 13px;
                  font-weight: 600;
                  text-decoration: none;
                  letter-spacing: -0.01em;
                "
              >
                Reply to ${safeName} →
              </a>

            </td>
          </tr>


          <!-- Metadata -->
          <tr>
            <td
              style="
                padding: 20px 32px;
                border-top: 1px solid #e5e5e5;
                background-color: #fafafa;
              "
            >

              <p
                style="
                  margin: 0;
                  color: #71717a;
                  font-size: 12px;
                  line-height: 1.6;
                "
              >
                Received ${formattedDate}
              </p>

            </td>
          </tr>


          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding: 28px 32px;
                background-color: #ffffff;
              "
            >

              <p
                style="
                  margin: 0;
                  color: #18181b;
                  font-size: 12px;
                  font-weight: 600;
                  letter-spacing: -0.01em;
                "
              >
                Darshan Portfolio
              </p>

              <p
                style="
                  margin: 6px 0 0;
                  color: #a1a1aa;
                  font-size: 11px;
                "
              >
                Contact notification
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
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

export async function sendContactConfirmation({
  name,
  email,
  message,
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined");
  }

  if (!email) {
    throw new Error("Recipient email is required");
  }

  const { subject, html } = buildUserContactEmail({
    name,
    message,
  });

  const { data, error } = await resend.emails.send({
    from: "Darshan Portfolio <onboarding@resend.dev>",
    to: [email],
    subject,
    html,
  });

  if (error) {
    throw new Error(
      error.message || "Resend failed to send confirmation email",
    );
  }

  console.log(
    "Contact confirmation email sent:",
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