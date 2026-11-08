import { prisma } from "../config/database.js";

const getEmployeeStats = async () => {
  const [total, active, inactive] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: { isActive: true },
    }),
    prisma.user.count({
      where: { isActive: false },
    }),
  ]);

  return {
    total,
    active,
    inactive,
  };
};

const getProjectStats = async () => {
  const [total, active, completed] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({
      where: { status: "active" },
    }),
    prisma.project.count({
      where: { status: "completed" },
    }),
  ]);

  return {
    total,
    active,
    completed,
  };
};

const getTaskStats = async (userId = null) => {
  const where = userId
    ? { assignedToId: BigInt(userId) }
    : {};

  const [total, todo, inProgress, completed] = await Promise.all([
    prisma.task.count({ where }),

    prisma.task.count({
      where: { ...where, status: "todo" },
    }),

    prisma.task.count({
      where: { ...where, status: "in_progress" },
    }),

    prisma.task.count({
      where: { ...where, status: "completed" },
    }),
  ]);

  return {
    total,
    todo,
    inProgress,
    completed,
  };
};

const getLeaveStats = async (userId = null) => {
  const where = userId
    ? { userId: BigInt(userId) }
    : {};

  const [total, pending, approved, rejected] = await Promise.all([
    prisma.leaveRequest.count({ where }),

    prisma.leaveRequest.count({
      where: { ...where, status: "pending" },
    }),

    prisma.leaveRequest.count({
      where: { ...where, status: "approved" },
    }),

    prisma.leaveRequest.count({
      where: { ...where, status: "rejected" },
    }),
  ]);

  return {
    total,
    pending,
    approved,
    rejected,
  };
};

const getRecentTasks = async (userId = null, limit = 5) => {
  const where = userId
    ? { assignedToId: BigInt(userId) }
    : {};

  return prisma.task.findMany({
    where,
    take: limit,
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      dueDate: true,
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const getRecentLeaves = async (userId = null, limit = 5) => {
  const where = userId
    ? { userId: BigInt(userId) }
    : {};

  return prisma.leaveRequest.findMany({
    where,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      leaveType: true,
      startDate: true,
      endDate: true,
      status: true,
      createdAt: true,
    },
  });
};

const getRecentProjects = async (limit = 5) => {
  return prisma.project.findMany({
    take: limit,
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      name: true,
      status: true,
      startDate: true,
      endDate: true,
    },
  });
};

export {
  getEmployeeStats,
  getProjectStats,
  getTaskStats,
  getLeaveStats,
  getRecentTasks,
  getRecentLeaves,
  getRecentProjects,
};