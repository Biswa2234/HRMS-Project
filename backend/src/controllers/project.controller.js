
import {
  createProjectService,
  getAllProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
} from "../services/project.service.js";

const createProject = async (req, res, next) => {
  try {
    const project = await createProjectService(
      req.body,
      req.user.id
    );

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: {
        ...project,
        id: project.id.toString(),
        createdById: project.createdById.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await getAllProjectsService();

    return res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: projects.map((project) => ({
        ...project,
        id: project.id.toString(),
        createdById: project.createdById.toString(),
        createdBy: {
          ...project.createdBy,
          id: project.createdBy.id.toString(),
        },
      })),
    });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await getProjectByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      data: {
        ...project,
        id: project.id.toString(),
        createdById: project.createdById.toString(),
        createdBy: {
          ...project.createdBy,
          id: project.createdBy.id.toString(),
        },
        members: project.members.map((member) => ({
          ...member,
          id: member.id.toString(),
          projectId: member.projectId.toString(),
          userId: member.userId.toString(),
          user: {
            ...member.user,
            id: member.user.id.toString(),
          },
        })),
        _count: project._count,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await updateProjectService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: {
        ...project,
        id: project.id.toString(),
        createdById: project.createdById.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await deleteProjectService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
