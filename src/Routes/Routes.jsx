import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";

import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import PrivateRoute from "./PrivateRoute";
import CategoryDetails from "../Pages/CategoryDetails/CategoryDetails";
import Shop from "../Pages/Shop/Shop";
import MyCart from "../Pages/MyCart/MyCart";
import AdminRoute from "./AdminRoutes";
import ManageMedicines from "../Pages/Dashboard/Seller/ManageMedicines/ManageMedicines";
import SellerRoute from "./SellerRoute";
import ManageCategory from "../Pages/Admin/ManageCategory/ManageCategory";
import Payment from "../Pages/Payment/Payment";
import Invoice from "../Pages/Payment/Invoice";
import UserPaymentHistory from "../Pages/Dashboard/User/UserPaymentHistory";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error></Error> ,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signUp',
          element: <SignUp></SignUp>
        },
        {
          path: '/shop',
          element: <Shop></Shop>
        },
        {
          path: '/cart',
          element: <PrivateRoute><MyCart></MyCart></PrivateRoute>
        },
        {
          path: '/payment',
          element: <PrivateRoute><Payment></Payment></PrivateRoute>
        },
        {
          path: '/invoice/:transactionId',
          element: <Invoice></Invoice>
        },
        {
          path: '/category/:categoryName',
          element: <CategoryDetails></CategoryDetails>
        },
        {
          path: '/updateProfile',
          element:<PrivateRoute> <UpdateProfile></UpdateProfile></PrivateRoute>
        },
      ]
    },
    //Dashboard 

    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children:[
        {
          index: true,
          element: <DashboardHome></DashboardHome>

        },

        //user routes 

        {
          path: 'paymentHistory',
          element: <PrivateRoute><UserPaymentHistory></UserPaymentHistory></PrivateRoute>
        },

        //admin routes
        {
          path: 'manageAllUsers',
          element: <AdminRoute>
            <AllUser></AllUser>
            </AdminRoute>
        },
        {
          path: 'manageCategory',
         element: <ManageCategory></ManageCategory>
        },

        //seller routes
        {
          path: 'manageMedicines',
          element: <SellerRoute><ManageMedicines></ManageMedicines></SellerRoute>
          
        },
        

      ]
    }
  ]);

  export default router;