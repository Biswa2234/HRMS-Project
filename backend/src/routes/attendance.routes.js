import { Router } from "express";

import {
  checkIn,
  checkOut,
  getMyAttendance,
  getAttendanceRecords,
  getAttendanceById,
  updateAttendance,
} from "../controllers/attendance.controller.js";

import authenticateToken from "../middleware/auth.middleware.js";

import {
  validateCheckIn,
  validateAttendanceQuery,
  validateAttendanceUpdate,
} from "../validators/attendance.validator.js";

const router = Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Employee attendance management APIs
 */

/**
 * @swagger
 * /api/attendance/check-in:
 *   post:
 *     summary: Check in for attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Check-in details accepted by validateCheckIn
 *     responses:
 *       200:
 *         description: Check-in processed successfully
 *       400:
 *         description: Invalid check-in data
 *       401:
 *         description: Unauthorized
 */
router.post("/check-in", validateCheckIn, checkIn);

/**
 * @swagger
 * /api/attendance/check-out:
 *   patch:
 *     summary: Check out from attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Check-out processed successfully
 *       401:
 *         description: Unauthorized
 */
router.patch("/check-out", checkOut);

/**
 * @swagger
 * /api/attendance/my-attendance:
 *   get:
 *     summary: Get current employee attendance history
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number, if supported by the query validator
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page, if supported
 *     responses:
 *       200:
 *         description: Attendance history retrieved successfully
 *       400:
 *         description: Invalid query parameters
 *       401:
 *         description: Unauthorized
 */
router.get("/my-attendance", validateAttendanceQuery, getMyAttendance);

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Get attendance records
 *     description: Access to records may be restricted according to employee role.
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number, if supported by the query validator
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page, if supported
 *     responses:
 *       200:
 *         description: Attendance records retrieved successfully
 *       400:
 *         description: Invalid query parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 */
router.get("/", validateAttendanceQuery, getAttendanceRecords);

/**
 * @swagger
 * /api/attendance/{id}:
 *   get:
 *     summary: Get an attendance record by ID
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance record ID
 *     responses:
 *       200:
 *         description: Attendance record retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Attendance record not found
 */
router.get("/:id", getAttendanceById);

/**
 * @swagger
 * /api/attendance/{id}:
 *   patch:
 *     summary: Update an attendance record
 *     description: Intended for HR/Admin attendance corrections.
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Updated fields accepted by validateAttendanceUpdate
 *     responses:
 *       200:
 *         description: Attendance record updated successfully
 *       400:
 *         description: Invalid update data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Attendance record not found
 */
router.patch("/:id", validateAttendanceUpdate, updateAttendance);

export default router;
