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

        //admin routes
        {
          path: 'manageAllUsers',
          element: <AllUser></AllUser>
        },
        {
          path: 'manageCategory',
          
        },
      ]
    }
  ]);

  export default router;