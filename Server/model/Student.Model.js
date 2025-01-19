const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentname: {
      type: String,
      required: true,
    },
    studentemail: {
      type: String,
      required: true,
    },

    registrationno: {
      type: Number,
      required: true,
    },
    studentphoneno: {
      type: Number,
      required: true,
    },
    dateregistration: {
      type: Date,
      required: true,
    },
    status: {
      required: true,
      type: Number,
      enum: [0, 1],
    },
    remarks: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
