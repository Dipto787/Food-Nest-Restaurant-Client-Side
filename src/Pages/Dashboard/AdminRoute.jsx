import { Navigate, useLocation } from "react-router-dom"; 
import UseAuth from "../../Components/hooks/UseAuth";
import { useContext } from "react";
import { AuthProvider } from "../../Provider/AuthContext";
import useRole from "../../Components/hooks/UseAdmin";


const AdminRoute = ({ children }) => {
    let { user, loading } = UseAuth();
    let [role, isLoading] = useRole();
    let location = useLocation();
    if (  isLoading) {
        return <h1>Loading.......</h1>
    }
    if (user && role === 'admin') {
        return children;
    }

    return <Navigate state={{ from: location }} replace to={'/login'}></Navigate>

};


export default AdminRoute;