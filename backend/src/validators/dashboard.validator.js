const validateDashboardQuery = (req, res, next) => {
  const { limit } = req.query;

  if (limit === undefined) {
    return next();
  }

  const parsedLimit = Number(limit);

  if (
    !Number.isInteger(parsedLimit) ||
    parsedLimit < 1 ||
    parsedLimit > 50
  ) {
    return res.status(400).json({
      success: false,
      message: "Limit must be an integer between 1 and 50",
    });
  }

  req.query.limit = String(parsedLimit);

  next();
};

export { validateDashboardQuery };