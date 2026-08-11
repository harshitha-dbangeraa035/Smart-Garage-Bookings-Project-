import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaSync,
  FaDownload,
  FaReceipt,
  FaCar,
  FaCalendarAlt,
  FaCreditCard,
  FaSpinner,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import API from "../../services/api";
import "./PaymentHistory.css";

function PaymentHistory() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  // Fetch Payment History
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await API.get("/payments/my-payments");
      setPayments(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch payment history"
      );
    } finally {
      setLoading(false);
    }
  };

  // Download Invoice
  const downloadInvoice = async (paymentId) => {
    try {
      setDownloadingId(paymentId);
      const response = await API.get(`/payments/${paymentId}/invoice`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice-${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to download invoice"
      );
    } finally {
      setDownloadingId(null);
    }
  };

  // Status Badge Class Mapper
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
      case "Success":
        return "status-badge status-completed";
      case "Pending":
        return "status-badge status-pending";
      default:
        return "status-badge status-failed";
    }
  };

  // Initial Loading Screen
  if (loading && payments.length === 0) {
    return (
      <div className="payment-history-container">
        <div className="history-loading-card">
          <FaSpinner className="spinner-icon" />
          <span>Loading Payment History...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-history-container">
      <div className="payment-history-card">
        
        {/* Header Section */}
        <div className="history-header">
          <div className="header-left">
            {/* Top-Left Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="btn-back-top-left"
              aria-label="Go Back"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <h1 className="history-title">Payment History</h1>
          </div>

          <button
            onClick={fetchPayments}
            className="btn-refresh"
            disabled={loading}
          >
            <FaSync className={loading ? "spinner-icon" : ""} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Empty State */}
        {payments.length === 0 ? (
          <div className="empty-history-state">
            <FaReceipt className="empty-icon" />
            <h2>No Payments Found</h2>
            <p>You haven't made any payment transactions yet.</p>
          </div>
        ) : (
          /* Payments List */
          <div className="payments-list">
            {payments.map((payment) => (
              <div key={payment._id} className="payment-item-card">
                
                {/* Item Header */}
                <div className="payment-item-header">
                  <div className="payment-id-wrapper">
                    <FaFileInvoiceDollar className="invoice-icon" />
                    <div>
                      <span className="payment-id-label">Payment ID</span>
                      <span className="payment-id-value">{payment._id}</span>
                    </div>
                  </div>
                  <span className={getStatusClass(payment.status)}>
                    {payment.status}
                  </span>
                </div>

                {/* Item Body Grid */}
                <div className="payment-details-grid">
                  <div className="detail-group">
                    <span className="detail-label">Amount Paid</span>
                    <span className="detail-amount">₹{payment.amount}</span>
                  </div>

                  <div className="detail-group">
                    <span className="detail-label">Payment Method</span>
                    <span className="detail-value">
                      <FaCreditCard className="inline-icon" />
                      {payment.paymentMethod}
                    </span>
                  </div>

                  <div className="detail-group">
                    <span className="detail-label">Service Type</span>
                    <span className="detail-value">
                      {payment.booking?.serviceType || "N/A"}
                    </span>
                  </div>

                  <div className="detail-group">
                    <span className="detail-label">Vehicle Registration</span>
                    <span className="detail-value">
                      <FaCar className="inline-icon" />
                      {payment.booking?.vehicle?.registrationNumber || "N/A"}
                    </span>
                  </div>

                  <div className="detail-group full-width">
                    <span className="detail-label">Paid On</span>
                    <span className="detail-value">
                      <FaCalendarAlt className="inline-icon" />
                      {new Date(payment.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="payment-item-footer">
                  <button
                    onClick={() => downloadInvoice(payment._id)}
                    disabled={downloadingId === payment._id}
                    className="btn-download-invoice"
                  >
                    {downloadingId === payment._id ? (
                      <>
                        <FaSpinner className="spinner-icon" />
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <FaDownload />
                        <span>Download Invoice</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default PaymentHistory;