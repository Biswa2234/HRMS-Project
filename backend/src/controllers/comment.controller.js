import * as commentService from "../services/comment.service.js";

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

const createComment = async (req, res, next) => {
  try {
    const comment = await commentService.createComment(
      req.params.taskId,
      req.body.comment,
      req.user
    );

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: serialize(comment),
    });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const result = await commentService.getComments(
      req.params.taskId,
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

const getCommentById = async (req, res, next) => {
  try {
    const comment = await commentService.getCommentById(
      req.params.taskId,
      req.params.commentId,
      req.user
    );

    return res.status(200).json({
      success: true,
      data: serialize(comment),
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const comment = await commentService.updateComment(
      req.params.taskId,
      req.params.commentId,
      req.body.comment,
      req.user
    );

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: serialize(comment),
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const result = await commentService.deleteComment(
      req.params.taskId,
      req.params.commentId,
      req.user
    );

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
};