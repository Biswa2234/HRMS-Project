import { prisma } from "../config/database.js";

const create = async (data) => {
  return await prisma.refreshToken.create({
    data,
  });
};

const findByToken = async (token) => {
  return await prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

const revoke = async (token) => {
  return await prisma.refreshToken.update({
    where: {
      token,
    },
    data: {
      revokedAt: new Date(),
    },
  });
};

export default {
  create,
  findByToken,
  revoke,
};
