import toast from "react-hot-toast";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import usePayment from "../../../Hooks/usePayment";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import LoadingSpinner from "../../../components/Shared/LoadinSpinner";
import { FaCheck } from "react-icons/fa";

const PaymentManagement = () => {
  const [payment, loading, refetch] = usePayment();
  const axiosSecure = UseAxiosSecure();

  // Function to handle accepting payment
  const handleAcceptPayment = (paymentId) => {
    const status = 'paid';

    axiosSecure.patch(`/payment/${paymentId}`, { status: status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success('Payment accepted');
        } else {
          // Handle case where no payment was modified
          // Maybe show a message or handle accordingly
        }
      })
      .catch((error) => {
        console.error('Error accepting payment:', error);
        toast.error('Failed to accept payment');
      });
    
    console.log(`Payment accepted for payment ID: ${paymentId}`);
  };

  return (
    <div>
      <div className="mt-10">
        <SectionHeading heading={"Manage Payments"} />
      </div>

      <div className="font-bold">
        {loading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th> 
                </tr>
              </thead>
              <tbody>
                {payment.map((paymentData, index) => (
                  <tr key={paymentData._id} className={paymentData.status === "paid" ? "bg-green-200" : "bg-red-200"}>
                    <td>{index + 1}</td>
                    <td>{paymentData.price}</td>
                    <td>{paymentData.status}</td>
                    <td>
                      {paymentData.status === "pending" && (
                        <button className="btn btn-sm"
                          onClick={() => handleAcceptPayment(paymentData._id)}
                        >
                          <FaCheck />Accept
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;
