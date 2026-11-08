import * as taskService from "../services/task.service.js";

const serialize = (value) => {
  if (typeof value === "bigint") {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(serialize);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        serialize(item),
      ])
    );
  }

  return value;
};

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(
      req.body,
      req.user
    );

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: serialize(task),
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks(
      req.query,
      req.user
    );

    return res.status(200).json({
      success: true,
      data: serialize(result),
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(
      req.params.id,
      req.user
    );

    return res.status(200).json({
      success: true,
      data: serialize(task),
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: serialize(task),
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskStatus(
      req.params.id,
      req.body.status,
      req.user
    );

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: serialize(task),
    });
  } catch (error) {
    next(error);
  }
};

const getMyTasks = async (req, res, next) => {
  try {
    const result = await taskService.getMyTasks(
      req.query,
      req.user
    );

    return res.status(200).json({
      success: true,
      data: serialize(result),
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const result = await taskService.deleteTask(
      req.params.id,
      req.user
    );

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
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