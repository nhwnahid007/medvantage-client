import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp')
  return (
    <div className="flex flex-col min-h-screen">
       <div className="sticky top-0 z-50"> 
        {noHeaderFooter || <Navbar></Navbar>}
        </div>
      <div className="flex-1">
        <Outlet />
      </div>
      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default Main;
