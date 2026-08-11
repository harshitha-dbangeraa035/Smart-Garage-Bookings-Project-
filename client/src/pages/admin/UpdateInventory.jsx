import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBoxes,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../../services/api";

import "./UpdateInventory.css";

function UpdateInventory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    partName: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await API.get("/inventory");

      const inventory = (res.data.data || []).find(
        (i) => i._id === id
      );

      if (inventory) {
        setItem({
          partName:
            inventory.partName ||
            inventory.name ||
            "",
          category: inventory.category || "",
          quantity: inventory.quantity ?? "",
          price: inventory.price ?? "",
          supplier: inventory.supplier || "",
        });
      } else {
        toast.error("Inventory item not found");
        navigate("/admin/inventory");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load inventory item"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      await API.put(`/inventory/${id}`, item);

      toast.success("Inventory updated successfully");

      navigate("/admin/inventory");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="inventory-loading">
        <div className="loading-spinner"></div>
        <p>Loading inventory item...</p>
      </div>
    );
  }

  return (
    <div className="update-inventory-page">

      <div className="update-inventory-container">

        {/* Back Button */}
        <Link
          to="/admin/inventory"
          className="back-btn"
        >
          <FaArrowLeft />
          Back to Inventory
        </Link>

        {/* Form Card */}
        <div className="update-form-card">

          {/* Icon */}
          <div className="update-form-icon">
            <FaBoxes />
          </div>

          {/* Header */}
          <div className="update-form-header">
            <h1>Update Inventory</h1>

            <p>
              Update the details of this inventory
              item.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="update-form"
          >

            {/* Item Name */}
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
                placeholder="Enter category"
                value={item.category}
                onChange={handleChange}
                required
              />
            </div>

            {/* Quantity + Price */}
            <div className="form-row">

              <div className="form-group">
                <label htmlFor="quantity">
                  Quantity
                </label>

                <input
                  id="quantity"
                  type="number"
                  name="quantity"
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
                className="update-btn"
                disabled={updating}
              >
                <FaSave />

                {updating
                  ? "Updating..."
                  : "Update Inventory"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  navigate("/admin/inventory")
                }
                disabled={updating}
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

export default UpdateInventory;