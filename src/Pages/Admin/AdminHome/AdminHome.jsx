import { FaDollarSign } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiShoppingBag2Line } from "react-icons/ri";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import useAuth from "../../../Hooks/UseAuth";
import usePayment from "../../../Hooks/usePayment";

const AdminHome = () => {
  const { user } = useAuth();
  const [payment] = usePayment();

  const paidMedicines = payment.filter((p) => p.status === "paid");
  const pendingMedicines = payment.filter((p) => p.status === "pending");

  const totalPaidAmount = paidMedicines.reduce(
    (total, p) => total + parseFloat(p.price),
    0
  );
  const totalPendingAmount = pendingMedicines.reduce(
    (total, p) => total + parseFloat(p.price),
    0
  );

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <h3 className="text-3xl font-bold opacity-75 mb-2">Welcome,</h3>
      <div className="text-xl font-semibold text-purple-700 flex items-center gap-2 mb-10">
        <BsFillPersonBadgeFill /> {user?.displayName || "Anonymous Admin"}
      </div>

      <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Revenue */}
        <StatCard
          color="from-green-600 to-green-400"
          icon={<FaDollarSign className="w-6 h-6 text-white" />}
          title="Paid Revenue"
          value={`$${totalPaidAmount.toFixed(2)}`}
        />

        {/* Pending Amount */}
        <StatCard
          color="from-orange-600 to-orange-400"
          icon={<MdOutlinePendingActions className="w-6 h-6 text-white" />}
          title="Pending Amount"
          value={`$${totalPendingAmount.toFixed(2)}`}
        />

        {/* Total Orders */}
        <StatCard
          color="from-blue-600 to-blue-400"
          icon={<RiShoppingBag2Line className="w-6 h-6 text-white" />}
          title="Total Orders"
          value={payment.length}
        />

        {/* Paid Orders */}
        <StatCard
          color="from-purple-600 to-purple-400"
          icon={<FaDollarSign className="w-6 h-6 text-white" />}
          title="Paid Orders"
          value={paidMedicines.length}
        />

        {/* Pending Orders */}
        <StatCard
          color="from-yellow-600 to-yellow-400"
          icon={<MdOutlinePendingActions className="w-6 h-6 text-white" />}
          title="Pending Orders"
          value={pendingMedicines.length}
        />
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ color, icon, title, value }) => {
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <div
        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center ${color} text-white`}
      >
        {icon}
      </div>
      <div className="p-4 text-right mt-8">
        <p className="block text-sm text-gray-600">{title}</p>
        <h4 className="text-2xl font-semibold text-gray-900">{value}</h4>
      </div>
    </div>
  );
};

export default AdminHome;
