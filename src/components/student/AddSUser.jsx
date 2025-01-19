import React, { useState } from "react";
import "./student/AddUser/AddUser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const initialUser = {
    studentname: "",
    studentemail: "",
    registrationno: "",
    studentphoneno: "",
    dateregistration: "",
    status: "",
    remarks: "",
  };
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users",
        user
      );
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user.", { position: "top-right" });
    }
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New Student</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="studentname">Student Name</label>
          <input
            type="text"
            id="studentname"
            name="studentname"
            onChange={inputHandler}
            placeholder="Enter student name"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="studentemail">Student Email</label>
          <input
            type="email"
            id="studentemail"
            name="studentemail"
            onChange={inputHandler}
            placeholder="Enter student email"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="registrationno">Registration No</label>
          <input
            type="text"
            id="registrationno"
            name="registrationno"
            onChange={inputHandler}
            placeholder="Enter registration number"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="studentphoneno">Student Phone No</label>
          <input
            type="text"
            id="studentphoneno"
            name="studentphoneno"
            value={user.studentphoneno}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="dateregistration">Date of Registration</label>
          <input
            type="date"
            id="dateregistration"
            name="dateregistration"
            onChange={inputHandler}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            onChange={inputHandler}
            placeholder="Enter status"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="remarks">Remarks</label>
          <input
            type="text"
            id="remarks"
            name="remarks"
            onChange={inputHandler}
            placeholder="Enter remarks"
            required
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
