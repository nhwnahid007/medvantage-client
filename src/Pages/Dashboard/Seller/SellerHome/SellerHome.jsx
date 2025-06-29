import { FaDollarSign } from "react-icons/fa";
import useAuth from "../../../../Hooks/UseAuth";
import usePayment from "../../../../Hooks/usePayment";

const SellerHome = () => {
  const { user } = useAuth();
  const [payment] = usePayment();

  // Filter relevant payment data
  const userPayments = payment.filter(
    (paymentData) =>
      paymentData.sellerEmails &&
      paymentData.sellerEmails.includes(user?.email)
  );

  const paidUserPayments = userPayments.filter(
    (paymentData) => paymentData.status === "paid"
  );
  const pendingUserPayments = userPayments.filter(
    (paymentData) => paymentData.status === "pending"
  );

  const totalPaidPrice = paidUserPayments.reduce(
    (total, paymentData) => total + parseFloat(paymentData.price),
    0
  );
  const totalPendingPrice = pendingUserPayments.reduce(
    (total, paymentData) => total + parseFloat(paymentData.price),
    0
  );

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10">
      <h3 className="text-3xl font-bold opacity-75 mb-4">
        Dear Seller,{" "}
        <span className="text-purple-700">
          {user?.displayName ? user.displayName : "Anonymous"}
        </span>
      </h3>

      <div className="mt-20 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Paid Total */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40">
            <FaDollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Paid Total
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ${totalPaidPrice.toFixed(2)}
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              {paidUserPayments.length} transaction
              {paidUserPayments.length !== 1 && "s"}
            </p>
          </div>
        </div>

        {/* Pending Total */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40">
            <FaDollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Pending Total
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ${totalPendingPrice.toFixed(2)}
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              {pendingUserPayments.length} transaction
              {pendingUserPayments.length !== 1 && "s"}
            </p>
          </div>
        </div>

        {/* All Transactions */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-purple-600 to-purple-400 text-white shadow-purple-500/40">
            <FaDollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Total Transactions
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {userPayments.length}
            </h4>
            <p className="text-xs text-gray-400 mt-1">All payments counted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
