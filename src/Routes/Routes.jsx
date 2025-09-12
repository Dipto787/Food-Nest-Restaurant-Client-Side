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
import ManageAllItems from "../Pages/Dashboard/ManageAllItems";
import UpdateItems from "../Pages/Dashboard/UpdateItems";
import PayMentGetWay from "../Pages/Dashboard/PayMentGetWay";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome";
import CardDetails from "../Pages/Order/Order/CardDetails";
import BookTable from "../Pages/Dashboard/BookTable";
import MyBooking from "../Pages/Dashboard/MyBooking";

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
                path: '/order',
                element: <Order></Order>
            },
            {
                path: '/order/:id',
                element: <CardDetails></CardDetails>
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
        element: <DashBoard></DashBoard>,
        children: [
            {
                path: 'cart',
                element: <MyCart></MyCart>
            },
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'payment',
                element: <PayMentGetWay></PayMentGetWay>
            }
            ,
            {
                path: 'allUser',
                element: <AdminRoute> <AllUser></AllUser></AdminRoute>
            },
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path: 'manageItems',
                element: <AdminRoute><ManageAllItems></ManageAllItems></AdminRoute>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoute><UpdateItems></UpdateItems></AdminRoute>,
            },
            {
                path:'reservation',
                element:<BookTable></BookTable>
            },
            {
                path:'bookings',
                element:<MyBooking></MyBooking>
            }
        ]
    }
])

export default router;