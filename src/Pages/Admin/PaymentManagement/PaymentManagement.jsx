import toast from "react-hot-toast";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import usePayment from "../../../Hooks/usePayment";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import LoadingSpinner from "../../../components/Shared/LoadinSpinner";
import { FaCheck } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const PaymentManagement = () => {
  const [payment, loading, refetch] = usePayment();
  const axiosSecure = UseAxiosSecure();

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

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Payment Management</title>
      </Helmet>

      <div className="mt-10 mb-6">
        <SectionHeading heading="Manage Payments" />
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
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {payment.map((paymentData, index) => (
                <tr
                  key={paymentData._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium">{index + 1}</td>
                  <td className="p-4">${paymentData.price}</td>
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
              {payment.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No payment records found.
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
