import toast from "react-hot-toast";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import usePayment from "../../../Hooks/usePayment";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import LoadingSpinner from "../../../components/Shared/LoadinSpinner";
import { FaCheck } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const PaymentManagement = () => {
  const [payment, loading, refetch] = usePayment();
  const axiosSecure = UseAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAcceptPayment = (paymentId) => {
    const status = "paid";

    axiosSecure
      .patch(`/payment/${paymentId}`, { status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success("Payment accepted");
        }
      })
      .catch((error) => {
        console.error("Error accepting payment:", error);
        toast.error("Failed to accept payment");
      });
  };

  // Filter payments based on status
  const filteredPayments = payment.filter((paymentData) => {
    if (statusFilter === "all") return true;
    return paymentData.status === statusFilter;
  });

  // Sort payments by date (latest first)
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (!a.date || !b.date) return 0;

    // Convert MM/DD/YYYY format to Date objects for comparison
    const [monthA, dayA, yearA] = a.date.split("/");
    const [monthB, dayB, yearB] = b.date.split("/");

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateB - dateA; // Latest first
  });

  // Count payments by status
  const pendingCount = payment.filter((p) => p.status === "pending").length;
  const paidCount = payment.filter((p) => p.status === "paid").length;

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Payment Management</title>
      </Helmet>

      <div className="mt-10 mb-6">
        <div className="flex items-center justify-between">
          <SectionHeading heading="Manage Payments" />
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {payment.length}
              </div>
              <div className="text-sm text-gray-600">Total Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {pendingCount}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {paidCount}
              </div>
              <div className="text-sm text-gray-600">Paid</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Filter by status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
            <span className="text-sm text-gray-600">
              Showing {sortedPayments.length} of {payment.length} payments
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="table w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Price</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedPayments.map((paymentData, index) => (
                <tr
                  key={paymentData._id}
                  className={`hover:bg-gray-50 transition-colors ${
                    paymentData.status === "pending" ? "bg-yellow-50" : ""
                  }`}
                >
                  <td className="p-4 font-medium">{index + 1}</td>
                  <td className="p-4">${paymentData.price}</td>
                  <td className="p-4">{paymentData.date || "N/A"}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        paymentData.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {paymentData.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {paymentData.status === "pending" ? (
                      <button
                        onClick={() => handleAcceptPayment(paymentData._id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-md transition"
                      >
                        <FaCheck /> Accept
                      </button>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 text-sm font-semibold rounded-md cursor-not-allowed"
                      >
                        <FaCheck /> Accepted
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {sortedPayments.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    {payment.length === 0
                      ? "No payment records found."
                      : `No ${statusFilter} payments found.`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
