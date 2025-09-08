import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Shared/Footer";
import Navbar from "../Components/Shared/Navbar";

const Root = () => {
    let location = useLocation();
    let unable = (location.pathname === '/login') || (location.pathname === '/signup');
    console.log(location);
    return (
        <div className="bg-white text-black">
            {
                unable || <Navbar></Navbar>
            }
            <div className="pt-24   min-h-[calc(90vh-50px)]">
                <Outlet></Outlet>
            </div>

            {
                unable || <Footer></Footer>
            }
        </div>
    );
};

export default Root;