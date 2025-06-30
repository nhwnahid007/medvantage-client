import { FaDollarSign } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { LiaUsersCogSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { FaStore } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { FaPills } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const links = [
  {
    to: "",
    label: "Total Revenue",
    icon: <FaDollarSign className="w-5 h-5" />,
  },
  {
    to: "manageAllUsers",
    label: "Manage All User",
    icon: <LiaUsersCogSolid className="w-5 h-5" />,
  },
  {
    to: "manageCategory",
    label: "Manage Categories",
    icon: <TbCategoryPlus className="w-5 h-5" />,
  },
  {
    to: "addMedicine",
    label: "Add Medicine",
    icon: <MdAddBox className="w-5 h-5" />,
  },
  {
    to: "manageMedicines",
    label: "Manage Medicines",
    icon: <FaPills className="w-5 h-5" />,
  },
  {
    to: "manageSellerRequests",
    label: "Seller Requests",
    icon: <FaStore className="w-5 h-5" />,
    hasNotification: true,
  },
  {
    to: "paymentManagement",
    label: "Manage Payment",
    icon: <MdOutlinePayment className="w-5 h-5" />,
  },
  {
    to: "salesReport",
    label: "Sales Report",
    icon: <FcSalesPerformance className="w-5 h-5" />,
  },
  {
    to: "manageBannerAdvertize",
    label: "Manage Ads",
    icon: <RiAdvertisementFill className="w-5 h-5" />,
  },
];

const AdminLinks = () => {
  const axiosSecure = UseAxiosSecure();

  // Get pending seller requests count
  const { data: sellerRequests = [] } = useQuery({
    queryKey: ["sellerRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/seller-requests");
      return res.data;
    },
  });

  const pendingCount = sellerRequests.filter(
    (request) => request.status === "pending"
  ).length;

  return (
    <div>
      {links.map(({ to, label, icon, hasNotification }) => (
        <NavLink
          key={to}
          to={to}
          end={to === ""}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 rounded-md relative ${
              isActive
                ? "font-bold bg-gray-300 text-[#7600dc]"
                : "text-gray-600 rounded-md"
            }`
          }
        >
          {icon}
          <span className="mx-4 font-medium">{label}</span>
          {hasNotification && pendingCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {pendingCount > 9 ? "9+" : pendingCount}
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default AdminLinks;
