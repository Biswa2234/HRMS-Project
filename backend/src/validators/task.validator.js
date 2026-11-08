const VALID_STATUSES = [
  "todo",
  "in_progress",
  "completed",
  "blocked",
];

const VALID_PRIORITIES = [
  "low",
  "medium",
  "high",
  "urgent",
];

const validateCreateTask = (req, res, next) => {
  const {
    projectId,
    title,
    description,
    assignedToId,
    priority,
    dueDate,
  } = req.body;

  const errors = [];

  if (
    projectId === undefined ||
    !/^[1-9]\d*$/.test(String(projectId))
  ) {
    errors.push("projectId must be a positive integer");
  }

  if (
    typeof title !== "string" ||
    !title.trim() ||
    title.trim().length > 200
  ) {
    errors.push("title is required and must not exceed 200 characters");
  }

  if (
    description !== undefined &&
    description !== null &&
    typeof description !== "string"
  ) {
    errors.push("description must be a string");
  }

  if (
    assignedToId !== undefined &&
    assignedToId !== null &&
    !/^[1-9]\d*$/.test(String(assignedToId))
  ) {
    errors.push("assignedToId must be a positive integer");
  }

  if (
    priority !== undefined &&
    !VALID_PRIORITIES.includes(priority)
  ) {
    errors.push(
      `priority must be one of: ${VALID_PRIORITIES.join(", ")}`
    );
  }

  if (dueDate !== undefined && dueDate !== null) {
    if (
      typeof dueDate !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dueDate) ||
      !Number.isFinite(Date.parse(`${dueDate}T00:00:00Z`)) ||
      new Date(`${dueDate}T00:00:00Z`).toISOString().slice(0, 10) !== dueDate
    ) {
      errors.push("dueDate must be a valid YYYY-MM-DD date");
    }
  }

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

const validateUpdateTask = (req, res, next) => {
  const allowedFields = [
    "title",
    "description",
    "assignedToId",
    "priority",
    "dueDate",
  ];

  const keys = Object.keys(req.body);

  if (
    keys.length === 0 ||
    keys.some((key) => !allowedFields.includes(key))
  ) {
    return res.status(400).json({
      success: false,
      message: "Provide valid task fields to update",
    });
  }

  if (
    "title" in req.body &&
    (
      typeof req.body.title !== "string" ||
      !req.body.title.trim() ||
      req.body.title.trim().length > 200
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Title is required and must not exceed 200 characters",
    });
  }

  if (
    "priority" in req.body &&
    !VALID_PRIORITIES.includes(req.body.priority)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid priority",
    });
  }

  if (
    "description" in req.body &&
    req.body.description !== null &&
    typeof req.body.description !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Description must be a string or null",
    });
  }

  if (
    "assignedToId" in req.body &&
    req.body.assignedToId !== null &&
    !/^[1-9]\d*$/.test(String(req.body.assignedToId))
  ) {
    return res.status(400).json({
      success: false,
      message: "assignedToId must be a positive integer or null",
    });
  }

  if (
    "dueDate" in req.body &&
    req.body.dueDate !== null
  ) {
    const value = req.body.dueDate;

    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      !Number.isFinite(Date.parse(`${value}T00:00:00Z`)) ||
      new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) !== value
    ) {
      return res.status(400).json({
        success: false,
        message: "dueDate must be a valid YYYY-MM-DD date",
      });
    }
  }

  next();
};

const validateTaskStatus = (req, res, next) => {
  if (!VALID_STATUSES.includes(req.body.status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${VALID_STATUSES.join(", ")}`,
    });
  }

  next();
};

export {
  validateCreateTask,
  validateUpdateTask,
  validateTaskStatus,
};