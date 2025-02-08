import { useContext } from "react";
import { AuthProvider } from "../Provider/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    let { user, loading } = useContext(AuthProvider);
    let location = useLocation();
    if (loading) {
        return <h1>Loading.......</h1>
    }
    if (user) {
        return children;
    }

    return <Navigate state={location?.pathname} replace to={'/login'}></Navigate>

};

export default PrivateRoute;