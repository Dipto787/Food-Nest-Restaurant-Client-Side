import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../../Components/hooks/UseAdmin";
import UseAuth from "../../Components/hooks/UseAuth";
import { useContext } from "react";
import { AuthProvider } from "../../Provider/AuthContext";


const AdminRoute = ({children}) => {
    let {user,loading} = UseAuth(); 
    let [isAdmin] = UseAdmin();
    let location = useLocation();
    if (loading) {
        return <h1>Loading.......</h1>
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate state={{ from: location }} replace to={'/login'}></Navigate>

};


export default AdminRoute;