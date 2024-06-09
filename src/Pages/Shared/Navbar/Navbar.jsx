import { useState, useRef, useEffect } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/UseAuth";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa6";
import useCart from "../../../Hooks/useCart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const { user, logOut } = useAuth();

  const [cart] = useCart();

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="m-1"
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#545e6f",
            background: isActive ? "#7600dc" : "#f0f0f0",
          })}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className="m-1"
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#545e6f",
            background: isActive ? "#7600dc" : "#f0f0f0",
          })}
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/cart"
          className="m-1"
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#545e6f",
            background: isActive ? "#7600dc" : "#f0f0f0",
          })}
        >
          <button className="flex font-semibold items-center gap-1">
            <FaCartPlus className="text-xl"></FaCartPlus>
            <div className="badge">+{cart.length}</div>
          </button>
        </NavLink>
      </li>
      <li>
        <details className="dropdown">
          <summary className="btn btn-md">Language</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <a>English </a>
            </li>
            <li>
              <a>Spanish</a>
            </li>
          </ul>
        </details>
      </li>
    </>
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAvatarMenu = () => {
    setIsAvatarOpen(!isAvatarOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (avatarRef.current && !avatarRef.current.contains(event.target)) {
      setIsAvatarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    logOut().then(() => {
      console.log("logged out");
      toast.success("Good job! Successfully Logged Out!");
      navigate("/");
    });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div
          ref={dropdownRef}
          tabIndex={0}
          role="button"
          className="dropdown lg:hidden"
          onClick={toggleMenu}
        >
          <div className="btn btn-ghost">
            {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </div>
          <ul
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">MedVantage</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-end" ref={avatarRef}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                onClick={toggleAvatarMenu}
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile Picture"
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/FHfFTWX/User-Profile-PNG-Free-Download.png"
                    }
                  />
                </div>
              </div>
              <ul
                className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
                  isAvatarOpen ? "block" : "hidden"
                }`}
              >
                <li>
                  <NavLink
                    to="/updateProfile"
                    className="m-1"
                    style={({ isActive }) => ({
                      color: isActive ? "#fff" : "#545e6f",
                      background: isActive ? "#7600dc" : "#f0f0f0",
                    })}
                  >
                    Update Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="dashboard/" className="m-1">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleSignOut} className="font-bold">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <NavLink
            to="/login"
            className="m-2 font-bold text-white bg-[#7600dc] btn"
          >
            Join Us
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
