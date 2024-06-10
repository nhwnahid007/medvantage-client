import { BsGraphUp } from "react-icons/bs";
import { FcSalesPerformance } from "react-icons/fc";
import { LiaUsersCogSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const AdminLinks = () => {
  return (
    <div>
      <NavLink
        to=""
        end
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-[#7600dc]" : "text-gray-600"
          }`
        }
      >
        <BsGraphUp className="w-5 h-5" />

        <span className="mx-4 font-medium">Statistics</span>
      </NavLink>

      {/* Manage All Users */}
      <NavLink
        to="manageAllUsers"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "font-bold bg-gray-300  text-[#7600dc]" : "text-gray-600"
          }`
        }
      >
        <LiaUsersCogSolid className="w-5 h-5" />

        <span className="mx-4 font-medium">Manage All User</span>
      </NavLink>

      {/* Manage category */}
      <NavLink
        to="manageCategory"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "font-bold bg-gray-300  text-[#7600dc]" : "text-gray-600"
          }`
        }
      >
        <TbCategoryPlus className="w-5 h-5" />

        <span className="mx-4 font-medium">Manage Medicines</span>
      </NavLink>
      <NavLink
        to="paymentManagement"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "font-bold bg-gray-300  text-[#7600dc]" : "text-gray-600"
          }`
        }
      >
        <MdOutlinePayment className="w-5 h-5" />

        <span className="mx-4 font-medium">Manage Payment</span>
      </NavLink>
      <NavLink
        to="salesReport"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "font-bold bg-gray-300  text-[#7600dc]" : "text-gray-600"
          }`
        }
      >
       
        <FcSalesPerformance className="w-5 h-5"  />

        <span className="mx-4 font-medium">Sales Report</span>
      </NavLink>
      <NavLink
        to="manageBannerAdvertize"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "font-bold bg-gray-300  text-[#7600dc]" : "text-gray-600"
          }`
        }
      >
       
        <RiAdvertisementFill className="w-5 h-5"  />

        <span className="mx-4 font-medium">Manage Ads</span>
      </NavLink>
      {/* My Listing */}
    </div>
  );
};

export default AdminLinks;
