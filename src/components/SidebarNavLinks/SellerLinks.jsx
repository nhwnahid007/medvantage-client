import { BsGraphUp } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { LiaUsersCogSolid } from "react-icons/lia";
import { RiAdvertisementFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const links = [
  { to: "", label: "Statistics", icon: BsGraphUp },
  { to: "manageMedicines", label: "Add Medicines", icon: LiaUsersCogSolid },
  { to: "sellerPaymentHistory", label: "Payment History", icon: FaHistory },
  { to: "requestAdvertise", label: "Request Advertisement", icon: RiAdvertisementFill },
];

const SellerLinks = () => {
  return (
    <div>
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === ""}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 rounded-md ${
              isActive ? "font-bold bg-gray-300 text-[#7600dc]" : "text-gray-600 rounded-md"
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span className="mx-4 font-medium">{label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default SellerLinks;
