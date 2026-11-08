
import { prisma } from "../config/database.js";

export const createProject = async (projectData) => {
  return await prisma.project.create({
    data: projectData,
  });
};

export const getAllProjects = async () => {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      createdBy: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      _count: {
        select: {
          members: true,
          tasks: true,
        },
      },
    },
  });
};

export const getProjectById = async (id) => {
  return await prisma.project.findUnique({
    where: {
      id: BigInt(id),
    },
    include: {
      createdBy: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
      _count: {
        select: {
          tasks: true,
        },
      },
    },
  });
};

export const updateProject = async (id, projectData) => {
  return await prisma.project.update({
    where: {
      id: BigInt(id),
    },
    data: projectData,
  });
};

export const deleteProject = async (id) => {
  return await prisma.project.delete({
    where: {
      id: BigInt(id),
    },
  });
};
