import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaUserCog, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../services/api";

import "./AssignMechanic.css";

function AssignMechanic() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mechanics, setMechanics] = useState([]);
  const [mechanicId, setMechanicId] = useState("");

  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const res = await API.get("/users/mechanics");

      console.log("Mechanics:", res.data);

      setMechanics(res.data.mechanics || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load mechanics"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!mechanicId) {
      toast.warning("Please select a mechanic");
      return;
    }

    try {
      setAssigning(true);

      await API.put(`/bookings/${id}/assign-mechanic`, {
        mechanicId,
      });

      toast.success("Mechanic assigned successfully");

      navigate("/admin/bookings");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Assignment failed"
      );
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="assign-loading">
        <div className="loading-spinner"></div>
        <p>Loading mechanics...</p>
      </div>
    );
  }

  return (
    <div className="assign-page">

      <div className="assign-container">

        {/* Back Button */}
        <Link
          to="/admin/bookings"
          className="back-btn"
        >
          <FaArrowLeft />
          Back to Bookings
        </Link>

        {/* Card */}
        <div className="assign-card">

          {/* Icon */}
          <div className="assign-icon">
            <FaUserCog />
          </div>

          {/* Header */}
          <div className="assign-header">
            <h1>Assign Mechanic</h1>

            <p>
              Select a mechanic to assign to this
              service booking.
            </p>
          </div>

          {/* Form */}
          <div className="assign-form">

            <label htmlFor="mechanic">
              Select Mechanic
            </label>

            <select
              id="mechanic"
              value={mechanicId}
              onChange={(e) =>
                setMechanicId(e.target.value)
              }
            >
              <option value="">
                Choose a mechanic
              </option>

              {mechanics.map((mechanic) => (
                <option
                  key={mechanic._id}
                  value={mechanic._id}
                >
                  {mechanic.name}
                </option>
              ))}
            </select>

            {/* Assign Button */}
            <button
              type="button"
              className="assign-submit-btn"
              onClick={handleAssign}
              disabled={assigning || !mechanicId}
            >
              <FaCheck />

              {assigning
                ? "Assigning..."
                : "Assign Mechanic"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AssignMechanic;