// AUTHENTICATION MIDDLEWARE 

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Load environment variables from .env file
dotenv.config();

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  // Read token from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next(); 
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };
