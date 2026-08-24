function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildUserContactEmail({ name, message }) {
  const safeName = escapeHtml(name?.trim() || "there");
  const safeMessage = escapeHtml(message?.trim() || "");

  return {
    subject: `Thanks for reaching out, ${name?.trim() || "there"} — message received`,

    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Message Received</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f3f3f1;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    color: #171717;
  "
>
  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="
      background-color: #f3f3f1;
      padding: 44px 16px;
    "
  >
    <tr>
      <td align="center">

        <!-- Main card -->
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            max-width: 640px;
            background-color: #ffffff;
            border: 1px solid #e3e3e0;
          "
        >

          <!-- Brand header -->
          <tr>
            <td
              style="
                padding: 30px 40px;
                border-bottom: 1px solid #e5e5e5;
              "
            >
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>
                  <td>

                    <div
                      style="
                        font-size: 14px;
                        line-height: 1;
                        font-weight: 700;
                        letter-spacing: -0.02em;
                        color: #171717;
                      "
                    >
                      Darshan B R
                    </div>

                    <div
                      style="
                        margin-top: 7px;
                        font-size: 11px;
                        line-height: 1.4;
                        font-weight: 600;
                        letter-spacing: 0.16em;
                        text-transform: uppercase;
                        color: #8a8a86;
                      "
                    >
                      Full Stack Developer
                    </div>

                  </td>

                  <td align="right">

                    <div
                      style="
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        background-color: #171717;
                      "
                    ></div>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accent -->
          <tr>
            <td
              style="
                height: 3px;
                background-color: #171717;
                font-size: 0;
                line-height: 0;
              "
            >
              &nbsp;
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding: 46px 40px 44px;">

              <!-- Confirmation label -->
              <div
                style="
                  display: inline-block;
                  padding: 7px 10px;
                  border: 1px solid #dededb;
                  background-color: #fafaf8;
                  font-size: 10px;
                  line-height: 1;
                  font-weight: 700;
                  letter-spacing: 0.14em;
                  text-transform: uppercase;
                  color: #73736e;
                "
              >
                Message received
              </div>

              <!-- Greeting -->
              <p
                style="
                  margin: 30px 0 0;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #525252;
                "
              >
                Hi ${safeName},
              </p>

              <!-- Heading -->
              <h1
                style="
                  margin: 10px 0 0;
                  font-size: 34px;
                  line-height: 1.15;
                  font-weight: 650;
                  letter-spacing: -0.045em;
                  color: #171717;
                "
              >
                Thanks for reaching out.
              </h1>

              <!-- Intro -->
              <p
                style="
                  margin: 22px 0 0;
                  max-width: 510px;
                  font-size: 15px;
                  line-height: 1.85;
                  color: #5a5a57;
                "
              >
                Your message has been successfully received. Thank you for
                taking the time to get in touch through my portfolio.
              </p>

              <!-- Message section -->
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  margin-top: 34px;
                  border: 1px solid #e2e2df;
                  background-color: #fafaf8;
                "
              >
                <tr>
                  <td style="padding: 24px 26px;">

                    <div
                      style="
                        font-size: 10px;
                        line-height: 1.4;
                        font-weight: 700;
                        letter-spacing: 0.16em;
                        text-transform: uppercase;
                        color: #7a7a76;
                      "
                    >
                      Your message
                    </div>

                    <div
                      style="
                        margin-top: 16px;
                        font-size: 14px;
                        line-height: 1.85;
                        color: #353535;
                        white-space: pre-line;
                      "
                    >
                      ${safeMessage}
                    </div>

                  </td>
                </tr>
              </table>

              <!-- Response note -->
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="margin-top: 30px;"
              >
                <tr>
                  <td
                    style="
                      width: 3px;
                      background-color: #171717;
                      font-size: 0;
                    "
                  >
                    &nbsp;
                  </td>

                  <td
                    style="
                      padding: 2px 0 2px 18px;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 14px;
                        line-height: 1.8;
                        color: #5a5a57;
                      "
                    >
                      I’ll personally review your message and get back to you
                      as soon as possible.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Closing -->
              <p
                style="
                  margin: 34px 0 0;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #303030;
                "
              >
                Best regards,<br />
                <strong style="color: #171717;">
                  Darshan B R
                </strong>
                <br />
                <span style="color: #858582;">
                  Full Stack Developer
                </span>
              </p>

              <!-- CTA -->
              <table
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="margin-top: 30px;"
              >
                <tr>
                  <td>
                    <a
                      href="https://darshan-portfolio-client.vercel.app"
                      target="_blank"
                      style="
                        display: inline-block;
                        padding: 14px 22px;
                        background-color: #171717;
                        color: #ffffff;
                        text-decoration: none;
                        font-size: 13px;
                        line-height: 1;
                        font-weight: 600;
                      "
                    >
                      Visit my portfolio
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                padding: 25px 40px;
                border-top: 1px solid #e5e5e5;
                background-color: #fafaf8;
              "
            >

              <p
                style="
                  margin: 0;
                  font-size: 11px;
                  line-height: 1.7;
                  color: #999994;
                "
              >
                You are receiving this email because a message was submitted
                through Darshan B R's portfolio website.
              </p>

              <p
                style="
                  margin: 8px 0 0;
                  font-size: 11px;
                  line-height: 1.7;
                  color: #999994;
                "
              >
                © ${new Date().getFullYear()} Darshan B R
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
  };
}