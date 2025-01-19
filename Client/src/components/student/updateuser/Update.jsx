import React, { useEffect, useState } from "react";
import "./Update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {
  // Initial state for the user form
  const initialUserState = {
    studentname: "",
    studentemail: "",
    registrationno: "",
    studentphoneno: "",
    dateregistration: "",
    status: "",
    remarks: "",
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();
  const { id } = useParams();

  // Handle input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Fetch user data on component mount or when the ID changes
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/users/${id}`)
      .then((response) => {
        setUser(response.data); // Assumes the API returns the correct user object
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      });
  }, [id]);

  // Submit updated user data
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/${id}`,
        user
      );
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="update-user">
      {/* Back button */}
      <Link to="/" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      {/* Update user form */}
      <form className="addUserForm" onSubmit={submitForm}>
        {[
          {
            label: "Student Name",
            name: "studentname",
            type: "text",
            placeholder: "Enter student name",
          },
          {
            label: "Student Email",
            name: "studentemail",
            type: "email",
            placeholder: "Enter student email",
          },
          {
            label: "Registration No",
            name: "registrationno",
            type: "text",
            placeholder: "Enter registration number",
          },
          {
            label: "Student Phone No",
            name: "studentphoneno",
            type: "text",
            placeholder: "Enter phone number",
          },
          {
            label: "Date of Registration",
            name: "dateregistration",
            type: "date",
          },
          {
            label: "Status",
            name: "status",
            type: "text",
            placeholder: "Enter status",
          },
          {
            label: "Remarks",
            name: "remarks",
            type: "text",
            placeholder: "Enter remarks",
          },
        ].map(({ label, name, type, placeholder }, index) => (
          <div className="inputGroup" key={index}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              value={user[name] || ""}
              onChange={inputHandler}
              placeholder={placeholder}
              required
            />
          </div>
        ))}

        {/* Submit button */}
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
