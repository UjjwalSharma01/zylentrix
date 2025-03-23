const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validateUserInput } = require('../middlewares/validation');

// Log all requests for debugging
router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Create a new user
router.post('/', validateUserInput, (req, res) => {
  try {
    const user = User.create(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get all users
router.get('/', (req, res) => {
  const users = User.findAll();
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

// Get single user by ID
router.get('/:id', (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// Update user
router.put('/:id', validateUserInput, (req, res) => {
  const updatedUser = User.update(req.params.id, req.body);

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: updatedUser
  });
});

// Delete user
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  
  // Log the delete attempt
  console.log(`Attempting to delete user with ID: ${userId}`);
  
  if (!userId) {
    console.log('Delete failed: No user ID provided');
    return res.status(400).json({
      success: false,
      message: 'User ID is required'
    });
  }
  
  const success = User.delete(userId);

  if (!success) {
    console.log(`Delete failed: User with ID ${userId} not found`);
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  console.log(`User with ID ${userId} deleted successfully`);
  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
});

module.exports = router;
