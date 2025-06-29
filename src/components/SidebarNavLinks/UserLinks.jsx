import { BsFillPersonFill } from "react-icons/bs"; // example user icon
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";

const links = [
  { to: "", label: "User Dashboard", icon: BsFillPersonFill },
  { to: "profile", label: "Profile", icon: FaUserCircle },
  { to: "settings", label: "Settings", icon: MdOutlineSettings },
  // Add more user links here
];

const UserLinks = () => {
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

export default UserLinks;
