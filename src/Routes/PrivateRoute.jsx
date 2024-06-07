

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import LoadingSpinner from "../components/Shared/LoadinSpinner";




// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation();
  console.log(location);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;
