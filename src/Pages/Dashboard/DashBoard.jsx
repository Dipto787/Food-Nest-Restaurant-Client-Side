import { FaAd, FaHome, FaShoppingCart } from "react-icons/fa";
import { FaCalendar, FaShop, FaStreetView } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";

const DashBoard = () => {
    return (
        <div className="flex text-black">
            <div className="w-64 min-h-screen bg-orange-400 ">
                <ul className="menu p-4">
                    <li>
                        <Link className="" to={'/dashboard/userHome'}>
                            <FaHome></FaHome>
                            User Home
                        </Link>
                    </li>

                    <li>
                        <Link className="" to={'/dashboard/reservation'}>
                            <FaCalendar></FaCalendar>
                            Reservation
                        </Link>
                    </li>

                    <li>
                        <Link className="btn" to={'/dashboard/cart'}>
                            <FaShoppingCart></FaShoppingCart>
                            My Cart
                        </Link>
                    </li>

                    <li>
                        <Link className="" to={'/dashboard/review'}>
                            <FaAd></FaAd>
                            Add a Review
                        </Link>
                    </li>

                    <li>
                        <Link className="" to={'/dashboard/bookings'}>
                            <FaAd></FaAd>
                            My Bookings
                        </Link>
                    </li>

                        <div className="divider border-black border-b-2"></div>
                    <li>
                        <Link className="" to={'/'}>
                             <FaHome></FaHome>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link className="" to={'/menu'}>
                            <FaShop></FaShop>
                           menu
                        </Link>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;