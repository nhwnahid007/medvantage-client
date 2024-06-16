import { FaDollarSign } from "react-icons/fa";
import useAuth from "../../../../Hooks/UseAuth";
import usePayment from "../../../../Hooks/usePayment";

const SellerHome = () => {
  const { user } = useAuth();

  const [payment] = usePayment();

  // Filter payments based on user's email
  const userPayments = payment.filter(
    (paymentData) =>
      paymentData.sellerEmails && paymentData.sellerEmails.includes(user.email)
  );

  // Filter paid payments
  const paidUserPayments = userPayments.filter(
    (paymentData) => paymentData.status === "paid"
  );

  // Filter pending payments
  const pendingUserPayments = userPayments.filter(
    (paymentData) => paymentData.status === "pending"
  );

  // Calculate total paid price
  const totalPaidPrice = paidUserPayments.reduce(
    (total, paymentData) => total + parseFloat(paymentData.price),
    0
  );

  // Calculate total pending price
  const totalPendingPrice = pendingUserPayments.reduce(
    (total, paymentData) => total + parseFloat(paymentData.price),
    0
  );

  console.log(userPayments);

  return (
    <div>
      <h3 className="text-3xl font-semibold">
        <span className="">Welcome Seller: </span>
        {user?.displayName ? user.displayName : "Annonymous"}
      </h3>
      <div className="mt-20 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Paid Total
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                ${totalPaidPrice}
              </h4>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Pending Total
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                ${totalPendingPrice}
              </h4>
            </div>
          </div>
     </div>
    </div>
  );
};

export default SellerHome;
