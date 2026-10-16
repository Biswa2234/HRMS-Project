import jwt from "jsonwebtoken";
import env from "../config/env.js";

const authenticateToken = (req, res, next) => {
 console.log("rEQ", req);
  const authHeader = req.headers.authorization;
   console.log("Authenticating token...", authHeader);

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  const token = authHeader.slice("Bearer ".length).trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET, {
      algorithms: ["HS256"],
      issuer: "hrms-api",
      audience: "hrms-client",
    });

    if (!payload.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Access token expired"
          : "Invalid access token",
    });
  }
};

export default authenticateToken;