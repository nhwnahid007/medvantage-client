import useRole from "../../../Hooks/useRole";
import AdminHome from "../../Admin/AdminHome/AdminHome";
import SellerHome from "../Seller/SellerHome/SellerHome";
import UserHome from "../UserHome/UserHome";

const DashboardHome = () => {
    const [role] = useRole();

    return (
        <div className="p-4">
            {role === 'admin' && <AdminHome />}
            {role === 'seller' && <SellerHome />}
            {role === 'user' && <UserHome />}
        </div>
    );
};

export default DashboardHome;
