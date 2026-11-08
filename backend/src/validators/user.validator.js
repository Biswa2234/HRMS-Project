export const validateUser = (req, res, next) => {
  const { name, email, position } = req.body;

  // Check required fields
  if (
    name === undefined ||
    email === undefined ||
    position === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Name, email and position are required",
    });
  }

  // Check field types
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof position !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields must be strings",
    });
  }

  // Check empty fields
  if (!name.trim() || !email.trim() || !position.trim()) {
    return res.status(400).json({
      success: false,
      message: "Fields cannot be empty",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  return next();
};