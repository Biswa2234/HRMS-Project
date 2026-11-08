import { Router } from "express";

import {
  getSummary,
  getTasks,
  getLeaves,
} from "../controllers/dashboard.controller.js";

import authenticateToken from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: HRMS dashboard APIs
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/summary", getSummary);

/**
 * @swagger
 * /api/dashboard/tasks:
 *   get:
 *     summary: Get dashboard task information
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard tasks retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/tasks", getTasks);

/**
 * @swagger
 * /api/dashboard/leaves:
 *   get:
 *     summary: Get dashboard leave information
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard leaves retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/leaves", getLeaves);

export default router;
