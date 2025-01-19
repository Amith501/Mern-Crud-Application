const express = require("express");
const route = express.Router();
const {
  create,
  deleteUser,
  getAllUsers,
  getUserById,
  update,
} = require("../controller/Student.Controller.js");

// Route definitions
route.post("/users", create); // Create a new user
route.get("/users", getAllUsers); // Get all users
route.get("/users/:id", getUserById); // Get a user by ID
route.put("/users/:id", update); // Update a user by ID
route.delete("/users/:id", deleteUser); // Delete a user by ID

// Export the route
module.exports = route;
