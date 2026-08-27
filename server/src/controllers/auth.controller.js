import bcrypt from "bcryptjs";

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    const authToken = process.env.ADMIN_AUTH_TOKEN;

    // Validate server configuration
    if (!adminEmail || !passwordHash || !authToken) {
      console.error("Admin authentication environment variables are missing.");

      return res.status(500).json({
        success: false,
        message: "Authentication service is not configured.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Verify email
    if (normalizedEmail !== adminEmail.trim().toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Verify password against bcrypt hash
    const passwordMatches = await bcrypt.compare(
      password,
      passwordHash,
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Authentication successful
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        token: authToken,
      },
    });
  } catch (error) {
    console.error("Admin login failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to complete login.",
    });
  }
}