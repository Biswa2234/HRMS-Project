import { Router } from "express";

import {
  applyLeave,
  getLeaves,
  getLeaveById,
  cancelLeave,
  approveLeave,
  rejectLeave,
} from "../controllers/leave.controller.js";

import {
  validateApplyLeave,
  validateLeaveDecision,
} from "../validators/leave.validator.js";

import authenticateToken from "../middleware/auth.middleware.js";

const router = Router();

// Every leave API below requires a valid access token.
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Leaves
 *   description: Leave management APIs
 */

/**
 * @swagger
 * /api/leaves:
 *   post:
 *     summary: Apply for leave
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Leave application submitted
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.post("/", validateApplyLeave, applyLeave);

// Put fixed paths before "/:id".

/**
 * @swagger
 * /api/leaves/my-leaves:
 *   get:
 *     summary: Get my leave applications
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leave applications retrieved
 *       401:
 *         description: Unauthorized
 */
router.get("/my-leaves", getLeaves);

/**
 * @swagger
 * /api/leaves:
 *   get:
 *     summary: Get leave applications
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leave applications retrieved
 *       401:
 *         description: Unauthorized
 */
router.get("/", getLeaves);

/**
 * @swagger
 * /api/leaves/{id}:
 *   get:
 *     summary: Get a leave application by ID
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave application ID
 *     responses:
 *       200:
 *         description: Leave application retrieved
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Leave application not found
 */
router.get("/:id", getLeaveById);

/**
 * @swagger
 * /api/leaves/{id}/cancel:
 *   patch:
 *     summary: Cancel a leave application
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave application ID
 *     responses:
 *       200:
 *         description: Leave application cancelled
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Leave application not found
 */
router.patch("/:id/cancel", cancelLeave);

/**
 * @swagger
 * /api/leaves/{id}/approve:
 *   patch:
 *     summary: Approve a leave application
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave application ID
 *     responses:
 *       200:
 *         description: Leave application approved
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Leave application not found
 */
router.patch("/:id/approve", validateLeaveDecision, approveLeave);

/**
 * @swagger
 * /api/leaves/{id}/reject:
 *   patch:
 *     summary: Reject a leave application
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave application ID
 *     responses:
 *       200:
 *         description: Leave application rejected
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Leave application not found
 */
router.patch("/:id/reject", validateLeaveDecision, rejectLeave);

export default router;
