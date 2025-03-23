// Validate user creation and update input
function validateUserInput(req, res, next) {
  const { name, email, age } = req.body;
  const errors = [];

  // Validate for user creation (all fields required)
  if (req.method === 'POST') {
    if (!name) errors.push('Name is required');
    if (!email) errors.push('Email is required');
    if (!age) errors.push('Age is required');
  }

  // Validate email format if provided
  if (email && !isValidEmail(email)) {
    errors.push('Invalid email format');
  }

  // Validate age if provided
  if (age !== undefined) {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 0) {
      errors.push('Age must be a positive number');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
}

// Simple email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  validateUserInput
};
