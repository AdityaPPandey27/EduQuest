// EduQuest/backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Protects routes: Checks for JWT, verifies it, and attaches user object to the request
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for 'Bearer' token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token payload (excluding password) and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Continue to the next middleware or controller
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware for role-based access control
const checkRole = (roles) => (req, res, next) => {
    // req.user is populated by the 'protect' middleware
    if (!req.user || !roles.includes(req.user.role)) {
        res.status(403);
        throw new Error('Not authorized for this role');
    }
    next();
};


module.exports = { protect, checkRole };
    