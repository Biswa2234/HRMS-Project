import { prisma } from "../config/database.js";

const taskInclude = {
  project: {
    select: {
      id: true,
      name: true,
    },
  },
  assignedTo: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  },
};

const createTask = (data) =>
  prisma.task.create({
    data,
    include: taskInclude,
  });

const findTaskById = (id) =>
  prisma.task.findUnique({
    where: { id },
    include: taskInclude,
  });

const findProjectById = (id) =>
  prisma.project.findUnique({
    where: { id },
    select: {
      id: true,
      createdById: true,
    },
  });

const findProjectMember = (projectId, userId) =>
  prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

const findUserById = (id) =>
  prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      isActive: true,
    },
  });

const findManyTasks = ({
  where,
  skip,
  take,
}) =>
  prisma.task.findMany({
    where,
    skip,
    take,
    include: taskInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

const countTasks = (where) =>
  prisma.task.count({ where });

const updateTask = (id, data) =>
  prisma.task.update({
    where: { id },
    data,
    include: taskInclude,
  });

const deleteTask = (id) =>
  prisma.task.delete({
    where: { id },
  });

export {
  createTask,
  findTaskById,
  findProjectById,
  findProjectMember,
  findUserById,
  findManyTasks,
  countTasks,
  updateTask,
  deleteTask,
};