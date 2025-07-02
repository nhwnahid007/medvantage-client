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
        <SectionHeading heading="Manage Payments" />

        {/* Responsive Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Payments
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {payment.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {pendingCount}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-3xl font-bold text-green-600">{paidCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
