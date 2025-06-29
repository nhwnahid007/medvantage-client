import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import useRole from "../../Hooks/useRole";
import toast from "react-hot-toast";
import AdminLinks from "../SidebarNavLinks/AdminLinks";
import UseAdmin from "../../Hooks/useAdmin";
import SellerLinks from "../SidebarNavLinks/SellerLinks";
import UserLinks from "../SidebarNavLinks/UserLinks";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = useRole();
  const [isAdmin] = UseAdmin();
  const navigate = useNavigate();

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleSignOut = () => {
    logOut().then(() => {
      toast.success("Good job! Successfully Logged Out!");
      navigate("/");
    });
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div className="block cursor-pointer p-4 font-bold">
          <Link to="/">
            <span className="text-3xl font-bold opacity-80">
              <span className="text-[#7600dc]">Med</span>vantage
            </span>
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-50 md:fixed top-0 left-0 h-screen w-72 bg-gray-100 transform ${
          isActive ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0 transition duration-200 ease-in-out flex flex-col shadow-lg`}
      >
        {/* Logo */}
        <div className="w-full hidden md:flex px-4 py-4 shadow-lg justify-center items-center bg-purple-100">
          <Link to="/">
            <span className="text-3xl font-bold opacity-75">
              <span className="text-purple-600">Med</span>vantage
            </span>
          </Link>
        </div>

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto px-4 mt-4 space-y-4">
          <nav>
            {isAdmin && <AdminLinks />}
            {role === "seller" && <SellerLinks />}
            {role === "user" && <UserLinks />}
          </nav>
        </div>

        {/* Sticky Logout at Bottom */}
        <div className="p-4 border-t bg-gray-100">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full gap-3 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded transition duration-200"
          >
            <GrLogout className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
