import { FaHome } from "react-icons/fa";

import { RiUserSettingsFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../Hooks/useRole";

const Dashboard = () => {
  const [role] = useRole()
  console.log(role)
  return (
    <div className="flex">
        {/*Dasboard SideBar */}
      <div className="flex flex-col justify-between w-64 min-h-screen bg-purple-600">
      <ul className="menu p-4">

      <li>
      <NavLink >
        <span className="flex items-center gap-1 text-gray-200 text-center font-bold">  
          <RiUserSettingsFill />
         Dashboad
        </span>
      </NavLink>
    </li>
      
      {role === 'admin' && (
  <>
    <li>
      <NavLink to="/dashboard/manageAllUsers" >
        <span className="flex items-center gap-1 text-gray-200 text-center font-bold">  
          <RiUserSettingsFill />
          Manage All Users
        </span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/manageSpecific" >
        <span className="flex items-center gap-1 text-gray-200 text-center font-bold">  
          <RiUserSettingsFill />
          Manage Specific Users
        </span>
      </NavLink>
    </li>
  </>
)}

      {/* Shared Navlinks*/}
      <div className="divider"></div>
    </ul>

           <ul className="p-6">
               <li>
                <NavLink to="/">
                    <span className="flex items-center text-gray-200 font-bold gap-2"><FaHome></FaHome> Home</span>
                    
                    </NavLink>
              </li>

           </ul>
        

      </div>

      {/* Dashboard content*/}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
