import {
  addUserService,
  getAllUsersService,
  deleteUserService,
  updateUserService,
} from "../services/user.service.js";

// Add user
export const addUser = async (req, res, next) => {
  try {
    const user = await addUserService(req.body);

    return res.status(201).json({
      success: true,
      message: "User added successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserService(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUserService(id, req.body);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
