const student = require("../model/Student.Model.js");

const create = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const {
      studentname,
      studentemail,
      registrationno,
      studentphoneno,
      dateregistration,
      status,
      remarks,
    } = req.body;

    // Validate request body for required fields
    if (
      !studentname ||
      !studentemail ||
      !registrationno ||
      !studentphoneno ||
      !dateregistration ||
      !status ||
      !remarks
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // // Validate email format using regex (simple check)
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(studentemail)) {
    //   return res.status(400).json({ message: "Invalid email format." });
    // }

    // Check if email already exists
    const userExist = await student.findOne({ email: studentemail });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // Create and save the new student
    const newUser = new student({
      studentname,
      studentemail,
      registrationno,
      studentphoneno,
      dateregistration,
      status,
      remarks,
    });
    const savedData = await newUser.save();

    // Respond with success
    res.status(201).json({
      message: "User created successfully.",
      data: savedData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errorMessage: "Server error, please try again later." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userData = await student.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await student.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists
    const user = await student.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user
    const updatedData = await student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "User updated successfully.", data: updatedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists
    const user = await student.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user
    await student.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = { create, getAllUsers, getUserById, update, deleteUser };
