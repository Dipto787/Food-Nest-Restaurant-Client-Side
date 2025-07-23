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
            <div className="max-w-screen-xl mx-auto">
                <Outlet></Outlet>
            </div>

            {
                unable || <Footer></Footer>
            }
        </div>
    );
};

export default Root;