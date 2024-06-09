import { BsGraphUp } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { LiaUsersCogSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";


const SellerLinks = () => {
    return (
        <div>
            <NavLink
                to=''
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-[#7600dc]' : 'text-gray-600'
                  }`
                }
              >
                <BsGraphUp className='w-5 h-5' />

                <span className='mx-4 font-medium'>Statistics</span>
              </NavLink>

              <NavLink
                to='manageMedicines'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'font-bold bg-gray-300  text-[#7600dc]' : 'text-gray-600'
                  }`
                }
              >
                
                <LiaUsersCogSolid className='w-5 h-5' />


                <span className='mx-4 font-medium'>Manage Medicines</span>
              </NavLink>
              <NavLink
                to='sellerPaymentHistory'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'font-bold bg-gray-300  text-[#7600dc]' : 'text-gray-600'
                  }`
                }
              >
                
                <FaHistory className='w-5 h-5' />


                <span className='mx-4 font-medium'>Payment History</span>
              </NavLink>
        </div>
    );
};

export default SellerLinks;