export default function(allowedDepartment) {
  return function(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // If the user is a superAdmin, grant access regardless of department
    if (req.user.role === 'superAdmin') {
      return next();
    }

    if (req.user.department !== allowedDepartment) {
      return res.status(403).json({ error: 'Forbidden: insufficient department' });
    }

    next();
  };
};
