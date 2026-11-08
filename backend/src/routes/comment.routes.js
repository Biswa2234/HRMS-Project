import { Router } from "express";

import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

import {
  validateCreateComment,
  validateUpdateComment,
} from "../validators/comment.validator.js";

import authenticateToken from "../middleware/auth.middleware.js";

const router = Router({ mergeParams: true });

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management APIs
 */

/**
 * @swagger
 * /api/comments/createComment:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Comment details required by the create-comment validator
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid comment data
 *       401:
 *         description: Unauthorized
 */
router.post("/createComment", validateCreateComment, createComment);

/**
 * @swagger
 * /api/comments/getComments:
 *   get:
 *     summary: Get comments
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/getComments", getComments);

/**
 * @swagger
 * /api/comments/getCommentById/{commentId}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.get("/getCommentById/:commentId", getCommentById);

/**
 * @swagger
 * /api/comments/updateComment/{commentId}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Updated comment fields accepted by the update-comment validator
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid comment data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.patch("/updateComment/:commentId", validateUpdateComment, updateComment);

/**
 * @swagger
 * /api/comments/deleteComment/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.delete("/deleteComment/:commentId", deleteComment);

export default router;
