import { useContext } from "react";
import { AuthProvider } from "../Provider/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
 return children

};

export default PrivateRoute;