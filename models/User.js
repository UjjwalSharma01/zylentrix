const { v4: uuidv4 } = require('uuid');

// In-memory users array
let users = [];

class User {
  constructor(name, email, age) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.age = age;
    this.createdAt = new Date();
  }

  // Create a new user
  static create(userData) {
    const { name, email, age } = userData;
    const user = new User(name, email, parseInt(age));
    users.push(user);
    return user;
  }

  // Get all users
  static findAll() {
    return users;
  }

  // Get user by ID
  static findById(id) {
    return users.find(user => user.id === id);
  }

  // Update user
  static update(id, userData) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    const { name, email, age } = userData;
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
      age: age ? parseInt(age) : users[userIndex].age,
      updatedAt: new Date()
    };

    return users[userIndex];
  }

  // Delete user
  static delete(id) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    return true;
  }
}

module.exports = User;
