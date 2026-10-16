import express from "express";

import {
  register,
  login,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
} from "../controllers/auth.controller.js";

import {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/forgot-password", validateForgotPassword, forgotPassword);
router.post("/reset-password", validateResetPassword, resetPassword);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);
export default router;
