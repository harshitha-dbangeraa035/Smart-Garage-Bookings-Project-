import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBoxes,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../services/api";

import "./AddInventory.css";

function AddInventory() {
  const navigate = useNavigate();

  const [item, setItem] = useState({
    partName: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/inventory", item);

      toast.success(
        "Inventory item added successfully"
      );

      navigate("/admin/inventory");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add inventory"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-inventory-page">

      <div className="add-inventory-container">

        {/* Back Button */}
        <Link
          to="/admin/inventory"
          className="back-btn"
        >
          <FaArrowLeft />
          Back to Inventory
        </Link>

        {/* Form Card */}
        <div className="inventory-form-card">

          {/* Icon */}
          <div className="inventory-form-icon">
            <FaBoxes />
          </div>

          {/* Header */}
          <div className="inventory-form-header">
            <h1>Add Inventory Item</h1>

            <p>
              Add a new spare part or item to your
              garage inventory.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="inventory-form"
          >

            {/* Part Name */}
            <div className="form-group">
              <label htmlFor="partName">
                Item Name
              </label>

              <input
                id="partName"
                type="text"
                name="partName"
                placeholder="Enter item name"
                value={item.partName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">
                Category
              </label>

              <input
                id="category"
                type="text"
                name="category"
                placeholder="e.g. Engine Parts"
                value={item.category}
                onChange={handleChange}
                required
              />
            </div>

            {/* Quantity & Price */}
            <div className="form-row">

              <div className="form-group">
                <label htmlFor="quantity">
                  Quantity
                </label>

                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  placeholder="0"
                  min="0"
                  value={item.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">
                  Price
                </label>

                <input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="0"
                  min="0"
                  value={item.price}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* Supplier */}
            <div className="form-group">
              <label htmlFor="supplier">
                Supplier
              </label>

              <input
                id="supplier"
                type="text"
                name="supplier"
                placeholder="Enter supplier name"
                value={item.supplier}
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="form-actions">

              <button
                type="submit"
                className="add-btn"
                disabled={loading}
              >
                <FaPlus />

                {loading
                  ? "Adding..."
                  : "Add Item"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  navigate("/admin/inventory")
                }
                disabled={loading}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddInventory;