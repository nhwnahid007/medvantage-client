import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadinSpinner";


const SellerRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [role,isLoading] = useRole()
    const location = useLocation();

    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && role==='seller') {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default SellerRoute;