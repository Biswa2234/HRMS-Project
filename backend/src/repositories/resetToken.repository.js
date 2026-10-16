import { prisma } from "../config/database.js";

const create = async ({ userId, token, expiresAt }) => {
  return await prisma.passwordResetToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
};

const findByToken = async (token) => {
  return await prisma.passwordResetToken.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
};

const markAsUsed = async (id) => {
  return await prisma.passwordResetToken.update({
    where: {
      id,
    },
    data: {
      usedAt: new Date(),
    },
  });
};

const deleteUserTokens = async (userId) => {
  return await prisma.passwordResetToken.deleteMany({
    where: {
      userId,
    },
  });
};

export default {
  create,
  findByToken,
  markAsUsed,
  deleteUserTokens,
};
