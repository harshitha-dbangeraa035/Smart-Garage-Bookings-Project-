import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../services/api";

import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");

      console.log("Users:", res.data);

      setUsers(
        res.data.data ||
          res.data.users ||
          []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="users-loading">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="users-page">

      <div className="users-container">

        {/* Header */}
        <div className="users-header">

          <Link
            to="/admin/dashboard"
            className="back-btn"
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          <div className="users-title">

            <div className="users-title-icon">
              <FaUserCircle />
            </div>

            <div>
              <h1>Registered Users</h1>

              <p>
                View and manage all registered users.
              </p>
            </div>

          </div>

        </div>

        {/* Users Table */}
        <div className="users-table-wrapper">

          <table className="users-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="no-users"
                  >
                    No users found.
                  </td>
                </tr>

              ) : (

                users.map((user) => (

                  <tr key={user._id}>

                    {/* User */}
                    <td>
                      <div className="user-cell">

                        <div className="user-avatar">
                          <FaUserCircle />
                        </div>

                        <span>
                          {user.name || "N/A"}
                        </span>

                      </div>
                    </td>

                    {/* Email */}
                    <td>
                      {user.email || "-"}
                    </td>

                    {/* Phone */}
                    <td>
                      {user.phone || "-"}
                    </td>

                    {/* Role */}
                    <td>
                      <span
                        className={`role-badge ${
                          user.role === "admin"
                            ? "admin-role"
                            : user.role === "mechanic"
                            ? "mechanic-role"
                            : "user-role"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td>
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Users;