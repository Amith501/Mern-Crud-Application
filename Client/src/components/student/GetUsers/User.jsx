import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:4000/api/users/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="userTable">
      <Link to="/add" type="button" class="btn btn-primary">
        Add User <i class="fa-solid fa-user-plus"></i>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">StudentName</th>
            <th scope="col">StudentEmail</th>
            <th scope="col">Registrationno</th>
            <th scope="col">Studentphoneno</th>
            {/* <th scope="col">dateRegistration</th> */}
            <th scope="col">Status</th> <th scope="col">Remarks</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.studentname}</td>
                <td>{user.studentemail}</td>
                <td>{user.registrationno}</td>
                <td>{user.studentphoneno}</td>
                {/* <td>{user.dateregistration}</td> */}
                <td>{user.status}</td>
                <td>{user.remarks}</td>
                <td className="actionButtons">
                  <Link
                    to={`/update/` + user._id}
                    type="button"
                    class="btn-danger"
                  >
                    <i class="fa-pen-to-square">Edit</i>
                  </Link>

                  <button
                    onClick={() => deleteUser(user._id)}
                    type="button"
                    class="btn-danger"
                  >
                    <i class="delete">Delete</i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
