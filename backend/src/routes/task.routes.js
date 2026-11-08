import { Router } from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  getMyTasks,
  deleteTask,
} from "../controllers/task.controller.js";

import {
  validateCreateTask,
  validateUpdateTask,
  validateTaskStatus,
} from "../validators/task.validator.js";

import authenticateToken from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /api/tasks/createtask:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.post("/createtask", validateCreateTask, createTask);

// Keep this route before "/:id".

/**
 * @swagger
 * /api/tasks/getmy-tasks:
 *   get:
 *     summary: Get tasks assigned to the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/getmy-tasks", getMyTasks);

/**
 * @swagger
 * /api/tasks/gettasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/gettasks", getTasks);

/**
 * @swagger
 * /api/tasks/gettask/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.get("/gettask/:id", getTaskById);

/**
 * @swagger
 * /api/tasks/updatetask/{id}:
 *   patch:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.patch("/updatetask/:id", validateUpdateTask, updateTask);

/**
 * @swagger
 * /api/tasks/updatetaskstatus/{id}:
 *   patch:
 *     summary: Update task status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.patch("/updatetaskstatus/:id", validateTaskStatus, updateTaskStatus);

/**
 * @swagger
 * /api/tasks/deletetask/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.delete("/deletetask/:id", deleteTask);

export default router;
