export function requireAdminAuth(req, res, next) {
  try {
    const configuredToken = process.env.ADMIN_AUTH_TOKEN;

    if (!configuredToken) {
      console.error("ADMIN_AUTH_TOKEN is not defined.");

      return res.status(500).json({
        success: false,
        message: "Authentication service is not configured.",
      });
    }

    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication format.",
      });
    }

    if (token !== configuredToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token.",
      });
    }

    req.isAdmin = true;

    next();
  } catch (error) {
    console.error("Admin authentication failed:", error);

    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
}