
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../repositories/project.repository.js";

const createProjectService = async (data, userId) => {
  const { name, description, startDate, endDate, status } = data;

  if (typeof name !== "string" || !name.trim()) {
    const error = new Error("Project name is required");
    error.statusCode = 400;
    throw error;
  }

  if (name.trim().length > 150) {
    const error = new Error("Project name cannot exceed 150 characters");
    error.statusCode = 400;
    throw error;
  }

  const validStatuses = ["active", "on_hold", "completed", "cancelled"];

  if (status !== undefined && !validStatuses.includes(status)) {
    const error = new Error("Invalid project status");
    error.statusCode = 400;
    throw error;
  }

  const parsedStartDate =
    startDate ? new Date(startDate) : undefined;

  const parsedEndDate =
    endDate ? new Date(endDate) : undefined;

  if (parsedStartDate && Number.isNaN(parsedStartDate.getTime())) {
    const error = new Error("Invalid start date");
    error.statusCode = 400;
    throw error;
  }

  if (parsedEndDate && Number.isNaN(parsedEndDate.getTime())) {
    const error = new Error("Invalid end date");
    error.statusCode = 400;
    throw error;
  }

  if (
    parsedStartDate &&
    parsedEndDate &&
    parsedEndDate < parsedStartDate
  ) {
    const error = new Error("End date cannot be before start date");
    error.statusCode = 400;
    throw error;
  }

  return await createProject({
    name: name.trim(),
    description:
      typeof description === "string" && description.trim()
        ? description.trim()
        : null,
    ...(parsedStartDate && { startDate: parsedStartDate }),
    ...(parsedEndDate && { endDate: parsedEndDate }),
    status: status ?? "active",
    createdBy: {
      connect: {
        id: BigInt(userId),
      },
    },
  });
};

const getAllProjectsService = async () => {
  return await getAllProjects();
};

const getProjectByIdService = async (id) => {
  const project = await getProjectById(id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};

const updateProjectService = async (id, data) => {
  const existingProject = await getProjectById(id);

  if (!existingProject) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const updateData = {};
  const validStatuses = ["active", "on_hold", "completed", "cancelled"];

  if (data.name !== undefined) {
    if (
      typeof data.name !== "string" ||
      !data.name.trim() ||
      data.name.trim().length > 150
    ) {
      const error = new Error("Project name must be 1–150 characters");
      error.statusCode = 400;
      throw error;
    }

    updateData.name = data.name.trim();
  }

  if (data.description !== undefined) {
    if (
      data.description !== null &&
      typeof data.description !== "string"
    ) {
      const error = new Error("Description must be a string or null");
      error.statusCode = 400;
      throw error;
    }

    updateData.description =
      typeof data.description === "string" && data.description.trim()
        ? data.description.trim()
        : null;
  }

  if (data.status !== undefined) {
    if (!validStatuses.includes(data.status)) {
      const error = new Error("Invalid project status");
      error.statusCode = 400;
      throw error;
    }

    updateData.status = data.status;
  }

  for (const field of ["startDate", "endDate"]) {
    if (data[field] !== undefined) {
      if (data[field] === null || data[field] === "") {
        updateData[field] = null;
      } else {
        const date = new Date(data[field]);

        if (Number.isNaN(date.getTime())) {
          const error = new Error(`Invalid ${field}`);
          error.statusCode = 400;
          throw error;
        }

        updateData[field] = date;
      }
    }
  }

  const finalStartDate =
    updateData.startDate !== undefined
      ? updateData.startDate
      : existingProject.startDate;

  const finalEndDate =
    updateData.endDate !== undefined
      ? updateData.endDate
      : existingProject.endDate;

  if (
    finalStartDate &&
    finalEndDate &&
    finalEndDate < finalStartDate
  ) {
    const error = new Error("End date cannot be before start date");
    error.statusCode = 400;
    throw error;
  }

  if (Object.keys(updateData).length === 0) {
    const error = new Error("No valid project fields provided for update");
    error.statusCode = 400;
    throw error;
  }

  return await updateProject(id, updateData);
};

const deleteProjectService = async (id) => {
  const existingProject = await getProjectById(id);

  if (!existingProject) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return await deleteProject(id);
};

export {
  createProjectService,
  getAllProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
};
