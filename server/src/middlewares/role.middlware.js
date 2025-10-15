import { ApiError } from "../utils/ApiError.js";

const roleGuard = (roles) => {
  // Always treat roles as an array
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      throw ApiError.forbidden("Access denied.");
    }

    next();
  };
};

export default roleGuard;
