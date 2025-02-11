import { useContext } from "react";
import { AuthProvider } from "../../Provider/AuthContext";

const UseAuth = () => {
    let provider = useContext(AuthProvider);
    return provider;
};

export default UseAuth;