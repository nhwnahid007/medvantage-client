import { useState } from "react";
import useAuth from "../../../Hooks/UseAuth";
import { useSellerRequest } from "../../../Hooks/useSellerRequest";
import useRole from "../../../Hooks/useRole";
import Swal from "sweetalert2";
import { FaStore } from "react-icons/fa";
import LoadingSpinner from "../../../components/Shared/LoadinSpinner";
import { Navigate } from "react-router-dom";

const UserHome = () => {
  const { user, loading } = useAuth();
  const [role] = useRole();
  const { userSellerRequest, submitSellerRequest } = useSellerRequest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  // Show loading while user data is being fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show message if no user
  if (!user) {
    return <Navigate to="/" />;
  }

  const handleBecomeSeller = () => {
    // If user is already a seller, show message
    if (role === "seller") {
      Swal.fire({
        title: "Already a Seller",
        text: "You are already a seller!",
        icon: "success",
        confirmButtonColor: "#7600dc",
      });
      return;
    }

    // If there's a pending request, show message
    if (userSellerRequest?.status === "pending") {
      Swal.fire({
        title: "Request Pending",
        text: "You already have a pending seller request. Please wait for admin approval.",
        icon: "info",
        confirmButtonColor: "#7600dc",
      });
      return;
    }

    setIsModalOpen(true);
  };

  const handleSubmitRequest = () => {
    if (!reason.trim()) {
      Swal.fire({
        title: "Error",
        text: "Please provide a reason for becoming a seller",
        icon: "error",
        confirmButtonColor: "#7600dc",
      });
      return;
    }

    const requestData = {
      userName: user?.displayName || "Anonymous",
      reason: reason.trim(),
    };

    submitSellerRequest.mutate(requestData, {
      onSuccess: () => {
        Swal.fire({
          title: "Request Submitted",
          text: "Your seller request has been submitted successfully. Please wait for admin approval.",
          icon: "success",
          confirmButtonColor: "#7600dc",
        });
        setIsModalOpen(false);
        setReason("");
      },
      onError: (error) => {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Failed to submit request",
          icon: "error",
          confirmButtonColor: "#7600dc",
        });
      },
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">
          <span>Welcome Dear: </span>
          {user?.displayName ? user.displayName : "Anonymous"}
        </h3>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
               Status
              </h4>
              <p className="text-gray-600">
                {role === "seller"
                  ? "You are currently a seller"
                  : userSellerRequest?.status === "pending"
                  ? "Your seller request is pending"
                  : "You are currently a regular user"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {userSellerRequest?.status === "pending" && (
                <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Pending
                </span>
              )}
              {role === "seller" && (
                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Seller
                </span>
              )}
              <button
                onClick={handleBecomeSeller}
                disabled={
                  role === "seller" || userSellerRequest?.status === "pending"
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  role === "seller" || userSellerRequest?.status === "pending"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                <FaStore className="w-5 h-5" />
                {role === "seller" && "Already a Seller"}
                {userSellerRequest?.status === "pending" && "Request Pending"}
                {role === "user" && !userSellerRequest && "Become a Seller"}
                {role === "user" &&
                  userSellerRequest?.status === "rejected" &&
                  "Submit New Request"}
              </button>
            </div>
          </div>
        </div>

        {/* Request Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Become a Seller
              </h3>
              <p className="text-gray-600 mb-4">
                Please provide a reason why you want to become a seller. This
                will help us review your request.
              </p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us why you want to become a seller..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="4"
              />
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setReason("");
                  }}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRequest}
                  disabled={submitSellerRequest.isPending}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {submitSellerRequest.isPending
                    ? "Submitting..."
                    : "Submit Request"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
