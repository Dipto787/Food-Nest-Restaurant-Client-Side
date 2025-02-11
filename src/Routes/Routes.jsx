import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp";
import Secret from "../Components/Secret";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Pages/Dashboard/DashBoard";
import MyCart from "../Pages/Dashboard/MyCart";
import AllUser from "../Pages/Dashboard/AllUser";
import AdminRoute from "../Pages/Dashboard/AdminRoute";
import AddItems from "../Pages/Dashboard/AddItems";

let router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            }
        ]
    },

    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path: 'cart',
                element: <MyCart></MyCart>
            },
            {
                path: 'allUser',
                element: <AdminRoute> <AllUser></AllUser></AdminRoute>
            },
            {
                path:'addItems',
                element:<AdminRoute><AddItems></AddItems></AdminRoute>
            }
        ]
    }
])

export default router;