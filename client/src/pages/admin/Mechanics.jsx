import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCog, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../services/api";

import "./Mechanics.css";

function Mechanics() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const res = await API.get("/users/mechanics");

      console.log("Mechanics:", res.data);

      // Supports both ApiResponse and normal JSON response
      setMechanics(
        res.data.data ||
          res.data.mechanics ||
          []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch mechanics"
      );
    } finally {
      setLoading(false);
    }
  };

  /* Loading */
  if (loading) {
    return (
      <div className="mechanics-loading">
        <div className="loading-spinner"></div>
        <p>Loading mechanics...</p>
      </div>
    );
  }

  return (
    <div className="mechanics-page">

      <div className="mechanics-container">

        {/* Header */}
        <div className="mechanics-header">

          <div>
            <Link
              to="/admin/dashboard"
              className="back-btn"
            >
              <FaArrowLeft />
              Back to Dashboard
            </Link>

            <div className="mechanics-title">

              <div className="mechanics-title-icon">
                <FaUserCog />
              </div>

              <div>
                <h1>Mechanics</h1>

                <p>
                  View and manage registered garage
                  mechanics.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Table */}
        <div className="mechanics-table-wrapper">

          <table className="mechanics-table">

            <thead>
              <tr>
                <th>Mechanic</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>

              {mechanics.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="no-mechanics"
                  >
                    No mechanics found.
                  </td>
                </tr>

              ) : (

                mechanics.map((mechanic) => (

                  <tr key={mechanic._id}>

                    {/* Mechanic */}
                    <td>
                      <div className="mechanic-cell">

                        <div className="mechanic-avatar">
                          <FaUserCog />
                        </div>

                        <span>
                          {mechanic.name || "N/A"}
                        </span>

                      </div>
                    </td>

                    {/* Email */}
                    <td>
                      {mechanic.email || "-"}
                    </td>

                    {/* Phone */}
                    <td>
                      {mechanic.phone || "-"}
                    </td>

                    {/* Role */}
                    <td>
                      <span className="role-badge">
                        {mechanic.role || "Mechanic"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td>
                      {mechanic.createdAt
                        ? new Date(
                            mechanic.createdAt
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

export default Mechanics;