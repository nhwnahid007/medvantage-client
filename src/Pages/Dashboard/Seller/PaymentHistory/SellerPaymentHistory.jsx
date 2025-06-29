import { Helmet } from "react-helmet-async";
import SectionHeading from "../../../../components/SectionHeading/SectionHeading";
import useAuth from "../../../../Hooks/UseAuth";
import usePayment from "../../../../Hooks/usePayment";

const SellerPaymentHistory = () => {
  const { user } = useAuth();
  const [payment] = usePayment();

  const userPayments = payment.filter(
    (paymentData) =>
      paymentData.sellerEmails &&
      paymentData.sellerEmails.includes(user.email)
  );

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10">
      <Helmet>
        <title>Payment History</title>
      </Helmet>

      <SectionHeading heading="Seller Payment History" />

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700">
          Total Payments:{" "}
          <span className="font-bold text-purple-700">{userPayments.length}</span>
        </h3>
      </div>

      <div className="overflow-x-auto shadow-sm bg-white rounded-lg">
        <table className="table w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Price</th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {userPayments.length > 0 ? (
              userPayments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium">{index + 1}</td>
                  <td className="p-4">${payment.price}</td>
                  <td className="p-4">{payment.transactionId || "N/A"}</td>
                  <td className="p-4">{payment.date || "N/A"}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        payment.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500 font-medium"
                >
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerPaymentHistory;
