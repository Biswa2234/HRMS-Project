import * as taskRepository from "../repositories/task.repository.js";
import { publishNotificationEvent } from "./notification-events.service.js";

const VALID_STATUSES = [
  "todo",
  "in_progress",
  "completed",
  "blocked",
];

const VALID_PRIORITIES = [
  "low",
  "medium",
  "high",
  "urgent",
];

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const toBigInt = (value, field = "id") => {
  if (
    !/^[1-9]\d*$/.test(String(value))
  ) {
    throw createError(`Invalid ${field}`, 400);
  }

  try {
    return BigInt(value);
  } catch {
    throw createError(`Invalid ${field}`, 400);
  }
};

const assertProjectAccess = async (projectId, user) => {
  const project = await taskRepository.findProjectById(projectId);

  if (!project) {
    throw createError("Project not found", 404);
  }

  const isCreator = project.createdById === BigInt(user.id);

  const membership = isCreator
    ? true
    : await taskRepository.findProjectMember(
        projectId,
        BigInt(user.id)
      );

  if (!membership) {
    throw createError(
      "You do not have access to this project",
      403
    );
  }

  return project;
};

const assertTaskAccess = async (task, user) => {
  await assertProjectAccess(task.projectId, user);
};

const validateAssignee = async (assignedToId, projectId) => {
  if (assignedToId === undefined || assignedToId === null) {
    return null;
  }

  const userId = toBigInt(assignedToId, "assignedToId");

  const user = await taskRepository.findUserById(userId);

  if (!user || !user.isActive) {
    throw createError("Assigned user not found or inactive", 404);
  }

  const membership = await taskRepository.findProjectMember(
    projectId,
    userId
  );

  const project = await taskRepository.findProjectById(projectId);

  if (
    !membership &&
    project?.createdById !== userId
  ) {
    throw createError(
      "Assignee must belong to the selected project",
      400
    );
  }

  return userId;
};

const createTask = async (input, currentUser) => {
  const projectId = toBigInt(input.projectId, "projectId");

  await assertProjectAccess(projectId, currentUser);

  const assignedToId = await validateAssignee(
    input.assignedToId,
    projectId
  );

  if (
    input.priority &&
    !VALID_PRIORITIES.includes(input.priority)
  ) {
    throw createError("Invalid task priority", 400);
  }

  const dueDate = input.dueDate
    ? new Date(`${input.dueDate}T00:00:00.000Z`)
    : null;

const task = await taskRepository.createTask({
  projectId,
  title: input.title.trim(),
  description: input.description ?? null,
  assignedToId,
  priority: input.priority ?? "medium",
  status: "todo",
  dueDate,
});

if (assignedToId && assignedToId !== BigInt(currentUser.id)) {
  try {
    await publishNotificationEvent({
      type: "TASK_ASSIGNED",
      userId: String(assignedToId),
      actorId: String(currentUser.id),
      entityType: "task",
      entityId: String(task.id),
      title: "New Task Assigned",
      message: `You have been assigned task: ${task.title}`,
    });
  } catch (error) {
    console.error("Failed to publish task notification:", error);
  }
}

return task;
};

const getTasks = async (query, currentUser) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number(query.limit) || 10)
  );

  const where = {
    project: {
      OR: [
        { createdById: BigInt(currentUser.id) },
        {
          members: {
            some: {
              userId: BigInt(currentUser.id),
            },
          },
        },
      ],
    },
  };

  if (query.projectId) {
    where.projectId = toBigInt(query.projectId, "projectId");
  }

  if (query.assignedToId) {
    where.assignedToId = toBigInt(
      query.assignedToId,
      "assignedToId"
    );
  }

  if (query.status) {
    if (!VALID_STATUSES.includes(query.status)) {
      throw createError("Invalid task status", 400);
    }

    where.status = query.status;
  }

  if (query.priority) {
    if (!VALID_PRIORITIES.includes(query.priority)) {
      throw createError("Invalid task priority", 400);
    }

    where.priority = query.priority;
  }

  const [tasks, total] = await Promise.all([
    taskRepository.findManyTasks({
      where,
      skip: (page - 1) * limit,
      take: limit,
    }),
    taskRepository.countTasks(where),
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getTaskById = async (id, currentUser) => {
  const taskId = toBigInt(id, "taskId");

  const task = await taskRepository.findTaskById(taskId);

  if (!task) {
    throw createError("Task not found", 404);
  }

  await assertTaskAccess(task, currentUser);

  return task;
};

const updateTask = async (id, input, currentUser) => {
  const taskId = toBigInt(id, "taskId");

  const task = await taskRepository.findTaskById(taskId);

  if (!task) {
    throw createError("Task not found", 404);
  }

  await assertTaskAccess(task, currentUser);

  const data = {};

  if (input.title !== undefined) {
    data.title = input.title.trim();
  }

  if (input.description !== undefined) {
    data.description = input.description;
  }

  if (input.priority !== undefined) {
    if (!VALID_PRIORITIES.includes(input.priority)) {
      throw createError("Invalid task priority", 400);
    }

    data.priority = input.priority;
  }

  if (input.assignedToId !== undefined) {
    data.assignedToId = await validateAssignee(
      input.assignedToId,
      task.projectId
    );
  }

  if (input.dueDate !== undefined) {
    data.dueDate = input.dueDate
      ? new Date(`${input.dueDate}T00:00:00.000Z`)
      : null;
  }

  return taskRepository.updateTask(taskId, data);
};

const updateTaskStatus = async (id, status, currentUser) => {
  if (!VALID_STATUSES.includes(status)) {
    throw createError("Invalid task status", 400);
  }

  const taskId = toBigInt(id, "taskId");

  const task = await taskRepository.findTaskById(taskId);

  if (!task) {
    throw createError("Task not found", 404);
  }

  await assertTaskAccess(task, currentUser);

  const isAssignee = task.assignedToId === BigInt(currentUser.id);

  if (!isAssignee) {
    throw createError(
      "Only the assigned employee can update task status",
      403
    );
  }

  return taskRepository.updateTask(taskId, { status });
};

const getMyTasks = async (query, currentUser) => {
  return getTasks(
    {
      ...query,
      assignedToId: String(currentUser.id),
    },
    currentUser
  );
};

const deleteTask = async (id, currentUser) => {
  const taskId = toBigInt(id, "taskId");

  const task = await taskRepository.findTaskById(taskId);

  if (!task) {
    throw createError("Task not found", 404);
  }

  const project = await taskRepository.findProjectById(
    task.projectId
  );

  if (project.createdById !== BigInt(currentUser.id)) {
    throw createError(
      "Only the project creator can delete tasks",
      403
    );
  }

  await taskRepository.deleteTask(taskId);

  return { id: String(taskId) };
};

export {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  getMyTasks,
  deleteTask,
};