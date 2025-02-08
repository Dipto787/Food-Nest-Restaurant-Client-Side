import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Shared/Footer";
import Navbar from "../Components/Shared/Navbar";

const Root = () => {
    let location = useLocation();
    let unable = (location.pathname === '/login') || (location.pathname === '/signup');
    console.log(location);
    return (
        <div>
            {
                unable || <Navbar></Navbar>
            }
            <Outlet></Outlet>
            {
                unable || <Footer></Footer>
            }
        </div>
    );
};

export default Root;