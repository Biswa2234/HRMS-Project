import {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../repositories/user.repository.js";

// Add user
export const addUserService = async (userData) => {
  const { name, email, position } = userData;

  return await createUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    position: position.trim(),
  });
};

// Get all users
export const getAllUsersService = async () => {
  return await getAllUsers();
};

// Delete user
export const deleteUserService = async (id) => {
  const userId = Number(id);

  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("Invalid user ID");
  }

  return await deleteUser(userId);
};

// Update user
export const updateUserService = async (id, userData) => {
  const userId = Number(id);

  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("Invalid user ID");
  }

  const { name, email, position } = userData;
  const data = {};

  if (name !== undefined) {
    data.name = name.trim();
  }

  if (email !== undefined) {
    data.email = email.trim().toLowerCase();
  }

  if (position !== undefined) {
    data.position = position.trim();
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Provide at least one field to update");
  }

  return await updateUser(userId, data);
};