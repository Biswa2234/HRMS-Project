import {
  getEmployeeStats,
  getProjectStats,
  getTaskStats,
  getLeaveStats,
  getRecentTasks,
  getRecentLeaves,
  getRecentProjects,
} from "../repositories/dashboard.repository.js";

const ADMIN_ROLES = ["ADMIN", "HR"];

const getDashboardSummary = async (currentUser) => {
  const role = currentUser.role?.toUpperCase();

  const isAdminOrHR = ADMIN_ROLES.includes(role);

  const userId = isAdminOrHR
    ? null
    : currentUser.userId ?? currentUser.id;

  const [tasks, leaves, recentTasks, recentLeaves] =
    await Promise.all([
      getTaskStats(userId),
      getLeaveStats(userId),
      getRecentTasks(userId),
      getRecentLeaves(userId),
    ]);

  const result = {
    role,
    tasks,
    leaves,
    recentTasks,
    recentLeaves,
  };

  if (isAdminOrHR) {
    const [employees, projects, recentProjects] =
      await Promise.all([
        getEmployeeStats(),
        getProjectStats(),
        getRecentProjects(),
      ]);

    result.employees = employees;
    result.projects = projects;
    result.recentProjects = recentProjects;
  }

  return result;
};

const getDashboardTasks = async (currentUser) => {
  const role = currentUser.role?.toUpperCase();

  const isAdminOrHR = ADMIN_ROLES.includes(role);

  const userId = isAdminOrHR
    ? null
    : currentUser.userId ?? currentUser.id;

  return getRecentTasks(userId, 10);
};

const getDashboardLeaves = async (currentUser) => {
  const role = currentUser.role?.toUpperCase();

  const isAdminOrHR = ADMIN_ROLES.includes(role);

  const userId = isAdminOrHR
    ? null
    : currentUser.userId ?? currentUser.id;

  return getRecentLeaves(userId, 10);
};

export {
  getDashboardSummary,
  getDashboardTasks,
  getDashboardLeaves,
};