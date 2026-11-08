import { prisma } from "../config/database.js";

// Create user
export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

// Find user by email (include role for login)
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
    include: { role: true },
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: BigInt(id) },
    include: { role: true },
  });
};
// Find role by name
export const findRoleByName = async (name) => {
  return await prisma.role.findUnique({
    where: { name },
  });
};

// Get all users
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: { id: "desc" },
  });
};

// Get user by ID
export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { role: true },
  });
};

// Delete user
export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: Number(id) },
  });
};

// Update user
export const updateUser = async (id, userData) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data: userData,
  });
};

// Update password
export const updatePassword = async (userId, passwordHash) => {
  return await prisma.user.update({
    where: { id: Number(userId) },
    data: { passwordHash },
  });
};
