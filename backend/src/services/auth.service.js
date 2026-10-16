import {
  createUser,
  findUserByEmail,
  findUserById,
  findRoleByName,
  updatePassword,
} from "../repositories/user.repository.js";

import { hashPassword, comparePassword } from "../utils/password.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

import refreshTokenRepository from "../repositories/refreshToken.repository.js";
import resetTokenRepository from "../repositories/resetToken.repository.js";
import generateResetToken from "../utils/resetToken.js";
import emailService from "./email.service.js";

// ==================== REGISTER ====================

const register = async ({ username, firstName, lastName, email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Check whether email already exists
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  // Assign EMPLOYEE role to public registrations
  const defaultRole = await findRoleByName("EMPLOYEE");

  if (!defaultRole) {
    const error = new Error("Default employee role not configured");
    error.statusCode = 500;
    throw error;
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await createUser({
    username,
    firstName,
    lastName,
    email: normalizedEmail,
    passwordHash: hashedPassword,
    role: {
      connect: {
        id: defaultRole.id,
      },
    },
  });

  // Registration does not generate tokens
  return {
    user: {
      id: user.id.toString(),
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: defaultRole.name,
    },
  };
};

// ==================== LOGIN ====================

const login = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Find user by email
  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Check whether account is active
  if (!user.isActive) {
    const error = new Error("Your account is inactive");
    error.statusCode = 403;
    throw error;
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Generate tokens after successful authentication
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set refresh-token expiry to 7 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // Save refresh token
  await refreshTokenRepository.create({
    userId: user.id,
    token: refreshToken,
    expiresAt,
  });

  return {
    user: {
      id: user.id.toString(),
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role.name,
    },
    accessToken,
    refreshToken,
  };
};

// ==================== FORGOT PASSWORD ====================

const forgotPassword = async ({ email }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    const error = new Error("User with this email does not exist");
    error.statusCode = 404;
    throw error;
  }

  // Remove previous reset tokens
  await resetTokenRepository.deleteUserTokens(user.id);

  // Generate a new reset token
  const resetToken = generateResetToken();

  // Token expires after 15 minutes
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 15);

  // Save reset token
  await resetTokenRepository.create({
    userId: user.id,
    token: resetToken,
    expiresAt,
  });

  // Send password-reset email
  await emailService.sendPasswordResetEmail(user.email, resetToken);

  return {
    message: "Password reset email sent",
  };
};

// ==================== RESET PASSWORD ====================

const resetPassword = async ({ token, password }) => {
  const resetToken = await resetTokenRepository.findByToken(token);

  if (!resetToken) {
    const error = new Error("Invalid or expired password reset token");
    error.statusCode = 400;
    throw error;
  }

  if (resetToken.usedAt) {
    const error = new Error("Password reset token has already been used");
    error.statusCode = 400;
    throw error;
  }

  if (new Date() > resetToken.expiresAt) {
    const error = new Error("Password reset token has expired");
    error.statusCode = 400;
    throw error;
  }

  // Hash the new password
  const hashedPassword = await hashPassword(password);

  // Update user's password
  await updatePassword(resetToken.userId, hashedPassword);

  // Mark reset token as used
  await resetTokenRepository.markAsUsed(resetToken.id);

  return {
    message: "Password reset successful",
  };
};

// ==================== REFRESH TOKEN ====================

const refreshAccessToken = async ({ refreshToken }) => {
  if (!refreshToken) {
    const error = new Error("Refresh token required");
    error.statusCode = 400;
    throw error;
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    const error = new Error("Invalid or expired refresh token");
    error.statusCode = 401;
    throw error;
  }

  const savedToken = await refreshTokenRepository.findByToken(refreshToken);

  if (
    !savedToken ||
    savedToken.revokedAt ||
    savedToken.expiresAt <= new Date() ||
    savedToken.userId.toString() !== String(payload.userId)
  ) {
    const error = new Error("Invalid or expired refresh token");
    error.statusCode = 401;
    throw error;
  }

  const user = await findUserById(payload.userId);

  if (!user || !user.isActive) {
    const error = new Error("User account is unavailable");
    error.statusCode = 401;
    throw error;
  }

  // Rotate refresh token: invalidate the old token first.
  await refreshTokenRepository.revoke(refreshToken);

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await refreshTokenRepository.create({
    userId: user.id,
    token: newRefreshToken,
    expiresAt,
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

// ==================== LOGOUT ====================

const logout = async ({ refreshToken }) => {
  if (!refreshToken) {
    const error = new Error("Refresh token required");
    error.statusCode = 400;
    throw error;
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    const error = new Error("Invalid or expired refresh token");
    error.statusCode = 401;
    throw error;
  }

  const savedToken = await refreshTokenRepository.findByToken(refreshToken);

  if (
    !savedToken ||
    savedToken.revokedAt ||
    savedToken.expiresAt <= new Date() ||
    savedToken.userId.toString() !== String(payload.userId)
  ) {
    const error = new Error("Invalid or expired refresh token");
    error.statusCode = 401;
    throw error;
  }

  await refreshTokenRepository.revoke(refreshToken);

  return { message: "Logout successful" };
};

// ==================== EXPORT SERVICES ====================

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
};
