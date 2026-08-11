import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaBoxes,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../services/api";

import "./Inventory.css";

function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await API.get("/inventory");

      console.log("Inventory:", res.data);

      setItems(res.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch inventory"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this inventory item?")) {
      return;
    }

    try {
      await API.delete(`/inventory/${id}`);

      toast.success("Inventory item deleted");

      setItems((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  /* Loading */
  if (loading) {
    return (
      <div className="inventory-loading">
        <div className="loading-spinner"></div>
        <p>Loading inventory...</p>
      </div>
    );
  }

  return (
    <div className="inventory-page">

      <div className="inventory-container">

        {/* Header */}
        <div className="inventory-header">

          <div>
            <Link
              to="/admin/dashboard"
              className="back-btn"
            >
              <FaArrowLeft />
              Back to Dashboard
            </Link>

            <div className="inventory-title">
              <div className="inventory-title-icon">
                <FaBoxes />
              </div>

              <div>
                <h1>Inventory</h1>

                <p>
                  Manage spare parts and inventory
                  items.
                </p>
              </div>
            </div>
          </div>

          {/* Add Item */}
          <Link
            to="/admin/inventory/add"
            className="add-item-btn"
          >
            <FaPlus />
            Add Item
          </Link>

        </div>

        {/* Inventory Table */}
        <div className="inventory-table-wrapper">

          <table className="inventory-table">

            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {items.length > 0 ? (
                items.map((item) => (

                  <tr key={item._id}>

                    {/* Item */}
                    <td>
                      <div className="item-name">
                        {item.name || item.partName}
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="category-text">
                        {item.category || "N/A"}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td>
                      <span
                        className={`stock-badge ${
                          item.quantity <= 5
                            ? "low-stock"
                            : "available-stock"
                        }`}
                      >
                        {item.quantity}
                        {item.quantity <= 5 && (
                          <span> Low</span>
                        )}
                      </span>
                    </td>

                    {/* Price */}
                    <td>
                      <span className="price">
                        ₹ {item.price}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="inventory-actions">

                        <Link
                          to={`/admin/inventory/update/${item._id}`}
                          className="edit-btn"
                          title="Edit Item"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            deleteItem(item._id)
                          }
                          className="delete-btn"
                          title="Delete Item"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="5"
                    className="no-inventory"
                  >
                    No inventory items found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Inventory;