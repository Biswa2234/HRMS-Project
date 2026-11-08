const validateCreateComment = (req, res, next) => {
  const { comment } = req.body;

  if (
    typeof comment !== "string" ||
    !comment.trim() ||
    comment.trim().length > 5000
  ) {
    return res.status(400).json({
      success: false,
      message: "Comment is required and must not exceed 5000 characters",
    });
  }

  req.body.comment = comment.trim();

  next();
};

const validateUpdateComment = (req, res, next) => {
  const { comment } = req.body;

  if (
    typeof comment !== "string" ||
    !comment.trim() ||
    comment.trim().length > 5000
  ) {
    return res.status(400).json({
      success: false,
      message: "Comment is required and must not exceed 5000 characters",
    });
  }

  req.body.comment = comment.trim();

  next();
};

export {
  validateCreateComment,
  validateUpdateComment,
};