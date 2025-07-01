import { useState, useRef, useEffect } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
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
  const sidebarRef = useRef(null);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    if (!isActive) return;
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isActive]);

  // Trap focus inside sidebar when open (mobile)
  useEffect(() => {
    if (!isActive) return;
    const focusableEls = sidebarRef.current?.querySelectorAll(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableEls || focusableEls.length === 0) return;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isActive]);

  const handleToggle = () => {
    setActive((prev) => !prev);
  };

  const handleSignOut = () => {
    logOut().then(() => {
      toast.success("Good job! Successfully Logged Out!");
      navigate("/");
    });
  };

  // Close sidebar on link click (mobile only)
  const handleNavClick = () => {
    if (window.innerWidth < 768) setActive(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isActive && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity md:hidden"
          aria-label="Sidebar overlay"
          onClick={() => setActive(false)}
        ></div>
      )}
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden shadow-sm sticky top-0 z-50">
        <div className="block cursor-pointer p-4 font-bold">
          <Link to="/">
            <span className="text-3xl font-bold opacity-80">
              <span className="text-[#7600dc]">Med</span>vantage
            </span>
          </Link>
        </div>
        {!isActive && (
          <button
            onClick={handleToggle}
            className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 transition"
            aria-label="Open sidebar"
          >
            <AiOutlineBars className="h-6 w-6 transition-transform duration-200" />
          </button>
        )}
      </div>

      {/* Sidebar for mobile (overlay) */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-72 bg-gray-100 z-50 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } transition duration-200 ease-in-out flex flex-col shadow-lg rounded-r-xl border-r border-gray-200 md:hidden`}
        aria-label="Sidebar navigation"
        tabIndex={-1}
      >
        {/* Logo & Close Button (mobile) */}
        <div className="w-full flex items-center justify-between px-4 py-4 shadow-lg bg-purple-100">
          <Link to="/">
            <span className="text-3xl font-bold opacity-75">
              <span className="text-purple-600">Med</span>vantage
            </span>
          </Link>
          {/* Close button for mobile */}
          <button
            onClick={handleToggle}
            className="p-2 ml-2 rounded hover:bg-purple-200 focus:outline-none"
            aria-label="Close sidebar"
          >
            <AiOutlineClose className="h-6 w-6" />
          </button>
        </div>
        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto px-4 mt-4 space-y-4">
          <nav onClick={handleNavClick}>
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
      </aside>

      {/* Sidebar for desktop (static) */}
      <aside
        className="hidden md:flex md:fixed md:top-0 md:left-0 md:h-screen md:w-72 bg-gray-100 flex-col shadow-lg border-r border-gray-200 z-40"
        aria-label="Sidebar navigation desktop"
      >
        <div className="w-full flex justify-center items-center px-4 py-4 shadow-lg bg-purple-100">
          <Link to="/">
            <span className="text-3xl font-bold opacity-75">
              <span className="text-purple-600">Med</span>vantage
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto px-4 mt-4 space-y-4">
          <nav>
            {isAdmin && <AdminLinks />}
            {role === "seller" && <SellerLinks />}
            {role === "user" && <UserLinks />}
          </nav>
        </div>
        <div className="p-4 border-t bg-gray-100">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full gap-3 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded transition duration-200"
          >
            <GrLogout className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
