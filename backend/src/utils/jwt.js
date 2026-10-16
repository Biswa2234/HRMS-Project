
import jwt from "jsonwebtoken";
import env from "../config/env.js";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id.toString(),
      email: user.email,
      role:
        typeof user.role === "string"
          ? user.role
          : user.role.name,
    },
    env.JWT_ACCESS_SECRET,
    {
      algorithm: "HS256",
      expiresIn: env.JWT_ACCESS_EXPIRES_IN,
      issuer: "hrms-api",
      audience: "hrms-client",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id.toString(),
    },
    env.JWT_REFRESH_SECRET,
    {
      algorithm: "HS256",
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, {
    algorithms: ["HS256"],
    issuer: "hrms-api",
    audience: "hrms-client",
  });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET, {
    algorithms: ["HS256"],
  });
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
