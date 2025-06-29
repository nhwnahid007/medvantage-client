import { FaDollarSign } from "react-icons/fa";
import useAuth from "../../../../Hooks/UseAuth";
import usePayment from "../../../../Hooks/usePayment";

const SellerHome = () => {
  const { user } = useAuth();
  const [payment] = usePayment();

  // Filter payments for the logged-in seller
  const userPayments = payment.filter(
    (paymentData) =>
      paymentData.sellerEmails &&
      paymentData.sellerEmails.includes(user?.email)
  );

  // Paid and pending payments
  const paidUserPayments = userPayments.filter(
    (paymentData) => paymentData.status === "paid"
  );
  const pendingUserPayments = userPayments.filter(
    (paymentData) => paymentData.status === "pending"
  );

  // Calculate totals
  const totalPaidPrice = paidUserPayments.reduce(
    (total, paymentData) => total + parseFloat(paymentData.price),
    0
  );
  const totalPendingPrice = pendingUserPayments.reduce(
    (total, paymentData) => total + parseFloat(paymentData.price),
    0
  );

  return (
    <div>
      <h3 className="text-3xl font-bold opacity-75">
        Dear Seller,{" "}
        <span className="text-blue-900">
          {user?.displayName ? user.displayName : "Anonymous"}
        </span>
      </h3>

      <div className="mt-20 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Paid Total */}
        <div className="relative flex flex-col bg-white rounded-xl text-gray-700 shadow-md bg-clip-border">
          <div className="absolute -mt-4 mx-4 grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 overflow-hidden">
            <FaDollarSign className="w-6 h-6" />
          </div>
          <div className="p-4 text-right">
            <p className="text-sm font-normal text-blue-gray-600 font-sans leading-normal antialiased">
              Paid Total
            </p>
            <h4 className="text-2xl font-semibold text-blue-gray-900 font-sans tracking-normal leading-snug antialiased">
              ${totalPaidPrice.toFixed(2)}
            </h4>
          </div>
        </div>

        {/* Pending Total */}
        <div className="relative flex flex-col bg-white rounded-xl text-gray-700 shadow-md bg-clip-border">
          <div className="absolute -mt-4 mx-4 grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 overflow-hidden">
            <FaDollarSign className="w-6 h-6" />
          </div>
          <div className="p-4 text-right">
            <p className="text-sm font-normal text-blue-gray-600 font-sans leading-normal antialiased">
              Pending Total
            </p>
            <h4 className="text-2xl font-semibold text-blue-gray-900 font-sans tracking-normal leading-snug antialiased">
              ${totalPendingPrice.toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
