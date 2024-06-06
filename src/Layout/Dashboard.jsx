import { Outlet } from "react-router-dom";
import useRole from "../Hooks/useRole";
import Sidebar from "../components/SideBar/Sidebar";

const Dashboard = () => {
  const [role] = useRole();
  console.log(role);
  return (
    <div className=" relative min-h-screen md:flex">
      {/*Dasboard SideBar */}

      <Sidebar></Sidebar>
      {/* Dashboard content*/}
      <div className="flex-1 md:ml-64">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
