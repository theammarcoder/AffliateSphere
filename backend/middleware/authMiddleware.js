// Middleware to protect admin routes
export const protect = (req, res, next) => {
  if (req.session && req.session.adminId) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized, please login' });
  }
};
