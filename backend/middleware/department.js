export default function(allowedDepartment) {
  return function(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.user.department !== allowedDepartment) {
      return res.status(403).json({ error: 'Forbidden: insufficient department' });
    }

    next();
  };
};
