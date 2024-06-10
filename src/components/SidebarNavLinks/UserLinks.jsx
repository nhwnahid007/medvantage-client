
import { FaHistory, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const UserLinks = () => {
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
        <FaHome className="w-5 h-5" />

        <span className="mx-4 font-medium">User Dashboard</span>
      </NavLink>
            <NavLink
                to='paymentHistory'
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'font-bold bg-gray-300  text-[#7600dc]' : 'text-gray-600'
                    }`
                  }
              >
               
               <FaHistory />
                <span className='mx-4 font-medium'>Payment History</span>
              </NavLink>
        </div>
    );
};

export default UserLinks;