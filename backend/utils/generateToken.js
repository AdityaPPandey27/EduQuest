// EduQuest/backend/utils/generateToken.js

const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  // Use a JWT_SECRET environment variable
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
