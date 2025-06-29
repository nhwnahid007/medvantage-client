import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useSellerRequest } from "../../../Hooks/useSellerRequest";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { FaCheck, FaTimes, FaClock } from "react-icons/fa";
import UseAdmin from "../../../Hooks/useAdmin";
import LoadingSpinner from "../../../components/Shared/LoadinSpinner";
import { useState } from "react";

const ManageSellerRequests = () => {
  const [isAdmin, isAdminLoading] = UseAdmin();
  const { sellerRequests, updateSellerRequestStatus } = useSellerRequest();
  const [statusFilter, setStatusFilter] = useState("all");

  // Show loading while checking admin status
  if (isAdminLoading) {
    return <LoadingSpinner />;
  }

  // Redirect if not admin (this should be handled by AdminRoute, but just in case)
  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg">Access Denied</div>
        <p className="text-gray-400 mt-2">
          You don't have permission to view this page.
        </p>
      </div>
    );
  }

  // Filter and sort requests
  const filteredRequests = sellerRequests.filter((request) => {
    if (statusFilter === "all") return true;
    return request.status === statusFilter;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    return new Date(b.requestDate) - new Date(a.requestDate);
  });

  // Count pending requests
  const pendingCount = sellerRequests.filter(
    (request) => request.status === "pending"
  ).length;

  const handleStatusUpdate = (requestId, status) => {
    const statusText = status === "approved" ? "approve" : "reject";

    Swal.fire({
      title: "Confirm Action",
      text: `Are you sure you want to ${statusText} this seller request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${statusText}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateSellerRequestStatus.mutate(
          { id: requestId, status },
          {
            onSuccess: () => {
              Swal.fire({
                title: "Success!",
                text: `Seller request ${statusText}d successfully.`,
                icon: "success",
                confirmButtonColor: "#7600dc",
              });
            },
            onError: (error) => {
              Swal.fire({
                title: "Error!",
                text:
                  error.response?.data?.message ||
                  "Failed to update request status",
                icon: "error",
                confirmButtonColor: "#7600dc",
              });
            },
          }
        );
      }
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FaClock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheck className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FaTimes className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Manage Seller Requests</title>
      </Helmet>

      <div className="my-10">
        <div className="flex items-center justify-between">
          <SectionHeading heading="Manage Seller Requests" />
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{sellerRequests.length}</div>
              <div className="text-sm text-gray-600">Total Requests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>
        
        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <span className="text-sm text-gray-600">
              Showing {sortedRequests.length} of {sellerRequests.length} requests
            </span>
          </div>
        </div>
      </div>

      {sellerRequests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No seller requests found</div>
          <p className="text-gray-400 mt-2">
            All requests have been processed or no new requests yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="table w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Request Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map((request, index) => (
                <tr
                  key={request._id}
                  className={`border-b hover:bg-gray-50 transition-colors ${
                    request.status === "pending" ? "bg-yellow-50" : ""
                  }`}
                >
                  <td className="p-4 font-medium">{index + 1}</td>
                  <td className="p-4 font-medium">{request.userName}</td>
                  <td className="p-4">{request.userEmail}</td>
                  <td className="p-4 max-w-xs">
                    <div className="truncate" title={request.reason}>
                      {request.reason}
                    </div>
                  </td>
                  <td className="p-4">{formatDate(request.requestDate)}</td>
                  <td className="p-4">{getStatusBadge(request.status)}</td>
                  <td className="p-4">
                    {request.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(request._id, "approved")
                          }
                          disabled={updateSellerRequestStatus.isPending}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-xs"
                          title="Approve Request"
                        >
                          <FaCheck className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(request._id, "rejected")
                          }
                          disabled={updateSellerRequestStatus.isPending}
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-xs"
                          title="Reject Request"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <span className="text-gray-400 text-xs">
                          {request.status === "approved"
                            ? "Approved"
                            : "Rejected"}
                          {request.processedDate && (
                            <div className="text-gray-500 mt-1">
                              {formatDate(request.processedDate)}
                            </div>
                          )}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageSellerRequests;
