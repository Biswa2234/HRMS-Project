import * as commentRepository from "../repositories/comment.repository.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const toBigInt = (value, field) => {
  if (!/^[1-9]\d*$/.test(String(value))) {
    throw createError(`Invalid ${field}`, 400);
  }

  return BigInt(value);
};

const assertTaskAccess = async (taskId, userId) => {
  const task = await commentRepository.findTaskById(taskId);

  if (!task) {
    throw createError("Task not found", 404);
  }

  const project = await commentRepository.findProjectAccess(
    task.projectId,
    userId
  );

  if (!project) {
    throw createError(
      "You do not have access to this task",
      403
    );
  }

  return task;
};

const createComment = async (taskId, comment, currentUser) => {
  const taskIdBigInt = toBigInt(taskId, "task ID");
  const userId = toBigInt(currentUser.id, "user ID");

  await assertTaskAccess(taskIdBigInt, userId);

  return commentRepository.createComment({
    taskId: taskIdBigInt,
    userId,
    comment: comment.trim(),
  });
};

const getComments = async (taskId, query, currentUser) => {
  const taskIdBigInt = toBigInt(taskId, "task ID");
  const userId = toBigInt(currentUser.id, "user ID");

  await assertTaskAccess(taskIdBigInt, userId);

  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number(query.limit) || 20)
  );

  const [comments, total] = await Promise.all([
    commentRepository.findCommentsByTaskId(
      taskIdBigInt,
      (page - 1) * limit,
      limit
    ),
    commentRepository.countCommentsByTaskId(taskIdBigInt),
  ]);

  return {
    comments,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getCommentById = async (
  taskId,
  commentId,
  currentUser
) => {
  const taskIdBigInt = toBigInt(taskId, "task ID");
  const commentIdBigInt = toBigInt(commentId, "comment ID");
  const userId = toBigInt(currentUser.id, "user ID");

  await assertTaskAccess(taskIdBigInt, userId);

  const comment = await commentRepository.findCommentById(
    commentIdBigInt
  );

  if (!comment || comment.taskId !== taskIdBigInt) {
    throw createError("Comment not found", 404);
  }

  return comment;
};

const updateComment = async (
  taskId,
  commentId,
  text,
  currentUser
) => {
  const comment = await getCommentById(
    taskId,
    commentId,
    currentUser
  );

  if (comment.userId !== BigInt(currentUser.id)) {
    throw createError(
      "You can only edit your own comments",
      403
    );
  }

  return commentRepository.updateComment(
    comment.id,
    text.trim()
  );
};

const deleteComment = async (
  taskId,
  commentId,
  currentUser
) => {
  const comment = await getCommentById(
    taskId,
    commentId,
    currentUser
  );

  if (comment.userId !== BigInt(currentUser.id)) {
    throw createError(
      "You can only delete your own comments",
      403
    );
  }

  await commentRepository.deleteComment(comment.id);

  return {
    id: comment.id.toString(),
  };
};

export {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
};