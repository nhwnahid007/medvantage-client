import { FaDollarSign } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { LiaUsersCogSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { NavLink } from "react-router-dom";

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
    label: "Manage Medicines",
    icon: <TbCategoryPlus className="w-5 h-5" />,
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
  return (
    <div>
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === ""}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
              isActive ? "font-bold bg-gray-300 text-[#7600dc]" : "text-gray-600"
            }`
          }
        >
          {icon}
          <span className="mx-4 font-medium">{label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default AdminLinks;
