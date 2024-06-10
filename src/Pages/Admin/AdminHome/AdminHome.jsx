import { FaDollarSign } from "react-icons/fa";
import useAuth from "../../../Hooks/UseAuth";
import usePayment from "../../../Hooks/usePayment";

const AdminHome = () => {
  const { user } = useAuth();
  const [payment] = usePayment()

  // Filter payments based on status
// Filter payments based on status
// Filter medicines based on status
const paidMedicines = payment.filter(medicine => medicine.status === 'paid');
const pendingMedicines = payment.filter(medicine => medicine.status === 'pending');

// Calculate total paid amount for medicines
const totalPaidAmount = paidMedicines.reduce((total, medicine) => total + parseFloat(medicine.price), 0);

// Calculate total pending amount for medicines
const totalPendingAmount = pendingMedicines.reduce((total, medicine) => total + parseFloat(medicine.price), 0);




  return (
    <div>
      <h3 className="text-3xl font-bold opacity-75">Dear Admin</h3>
      {user?.displayName ? user.displayName : "Annonymous"}

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
                ${totalPaidAmount}
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
                ${totalPendingAmount}
              </h4>
            </div>
          </div>
     </div>
    </div>
  );
};

export default AdminHome;
