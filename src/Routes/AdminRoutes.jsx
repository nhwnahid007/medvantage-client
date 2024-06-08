import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import UseAdmin from "../Hooks/useAdmin";
import LoadingSpinner from "../components/Shared/LoadinSpinner";



const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;