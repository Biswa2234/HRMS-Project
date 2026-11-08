import { prisma } from "../config/database.js";

const leaveInclude = {
  user: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  },
  reviewedBy: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
};

const createLeave = (data) =>
  prisma.leaveRequest.create({
    data,
    include: leaveInclude,
  });

const findLeaveById = (id) =>
  prisma.leaveRequest.findUnique({
    where: { id },
    include: leaveInclude,
  });

const findLeaves = (where, skip, take) =>
  prisma.leaveRequest.findMany({
    where,
    skip,
    take,
    include: leaveInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

const countLeaves = (where) =>
  prisma.leaveRequest.count({ where });

const updateLeave = (id, data) =>
  prisma.leaveRequest.update({
    where: { id },
    data,
    include: leaveInclude,
  });

export {
  createLeave,
  findLeaveById,
  findLeaves,
  countLeaves,
  updateLeave,
};