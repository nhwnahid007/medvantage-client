import { Outlet } from "react-router-dom";
import useRole from "../Hooks/useRole";
import Sidebar from "../components/SideBar/Sidebar";
import { Helmet } from "react-helmet-async";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Dashboard = () => {
  const [role] = useRole();
  console.log(role);
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-anchor-placement="top-center"
      className="relative h-screen md:flex bg-gray-50 overflow-hidden"
    >
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/*Dasboard SideBar */}
      <Sidebar></Sidebar>
      {/* Dashboard content*/}
      <div className="flex-1 md:ml-64 h-screen overflow-y-auto pl-5">
        <div className="p-4 min-h-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
