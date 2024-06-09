
import { FaHistory } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const UserLinks = () => {
    return (
        <div>
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