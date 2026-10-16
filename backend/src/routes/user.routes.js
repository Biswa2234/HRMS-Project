import express from "express";

import {
  addUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

import { validateUser } from "../validators/user.validator.js";
import authenticateToken from "../middleware/auth.middleware.js";

const router = express.Router();

// Add user
router.post("/add-user", authenticateToken, validateUser, addUser);

// Get all users
router.get("/get-all-users", authenticateToken, getAllUsers);

// Delete user
router.delete("/delete-user/:id", authenticateToken, deleteUser);

// Update user
router.put("/update-user/:id", authenticateToken, validateUser, updateUser);

export default router;