import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaExclamationTriangle,
  FaBoxes,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../services/api";

import "./LowStock.css";

function LowStock() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLowStock();
  }, []);

  const fetchLowStock = async () => {
    try {
      const res = await API.get("/inventory/low-stock");

      console.log("Low Stock:", res.data);

      setItems(res.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch low stock items"
      );
    } finally {
      setLoading(false);
    }
  };

  /* Loading */
  if (loading) {
    return (
      <div className="low-stock-loading">
        <div className="loading-spinner"></div>
        <p>Loading low stock items...</p>
      </div>
    );
  }

  return (
    <div className="low-stock-page">

      <div className="low-stock-container">

        {/* Header */}
        <div className="low-stock-header">

          <Link
            to="/admin/dashboard"
            className="back-btn"
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          <div className="low-stock-title">

            <div className="low-stock-title-icon">
              <FaExclamationTriangle />
            </div>

            <div>
              <h1>Low Stock Items</h1>

              <p>
                Monitor inventory items that need
                replenishment.
              </p>
            </div>

          </div>

        </div>

        {/* Table */}
        <div className="low-stock-table-wrapper">

          <table className="low-stock-table">

            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Available</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>

              {items.length === 0 ? (

                <tr>
                  <td
                    colSpan="4"
                    className="no-low-stock"
                  >
                    <FaBoxes />

                    <span>
                      No low stock items found.
                    </span>
                  </td>
                </tr>

              ) : (

                items.map((item) => (

                  <tr key={item._id}>

                    {/* Item */}
                    <td>
                      <div className="item-cell">

                        <div className="item-icon">
                          <FaBoxes />
                        </div>

                        <span>
                          {item.partName ||
                            item.name ||
                            "N/A"}
                        </span>

                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="category-text">
                        {item.category || "N/A"}
                      </span>
                    </td>

                    {/* Available */}
                    <td>
                      <span className="quantity-badge">
                        {item.quantity}
                      </span>
                    </td>

                    {/* Price */}
                    <td>
                      <span className="price">
                        ₹ {item.price}
                      </span>
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

export default LowStock;