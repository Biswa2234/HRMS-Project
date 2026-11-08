import { prisma } from "../config/database.js";

const commentInclude = {
  user: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      avatarUrl: true,
    },
  },
};

const createComment = (data) =>
  prisma.taskComment.create({
    data,
    include: commentInclude,
  });

const findCommentsByTaskId = (taskId, skip, take) =>
  prisma.taskComment.findMany({
    where: { taskId },
    skip,
    take,
    include: commentInclude,
    orderBy: {
      createdAt: "asc",
    },
  });

const countCommentsByTaskId = (taskId) =>
  prisma.taskComment.count({
    where: { taskId },
  });

const findCommentById = (id) =>
  prisma.taskComment.findUnique({
    where: { id },
    include: commentInclude,
  });

const updateComment = (id, comment) =>
  prisma.taskComment.update({
    where: { id },
    data: { comment },
    include: commentInclude,
  });

const deleteComment = (id) =>
  prisma.taskComment.delete({
    where: { id },
  });

const findTaskById = (id) =>
  prisma.task.findUnique({
    where: { id },
    select: {
      id: true,
      projectId: true,
    },
  });

const findProjectAccess = (projectId, userId) =>
  prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { createdById: userId },
        {
          members: {
            some: { userId },
          },
        },
      ],
    },
    select: { id: true },
  });

export {
  createComment,
  findCommentsByTaskId,
  countCommentsByTaskId,
  findCommentById,
  updateComment,
  deleteComment,
  findTaskById,
  findProjectAccess,
};