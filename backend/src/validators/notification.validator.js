const validateNotificationQuery = (req, res, next) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const { isRead } = req.query;

  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({
      success: false,
      message: "Page must be a positive integer",
    });
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({
      success: false,
      message: "Limit must be between 1 and 100",
    });
  }

  if (isRead !== undefined && !["true", "false"].includes(isRead)) {
    return res.status(400).json({
      success: false,
      message: "isRead must be true or false",
    });
  }

  next();
};

export { validateNotificationQuery };