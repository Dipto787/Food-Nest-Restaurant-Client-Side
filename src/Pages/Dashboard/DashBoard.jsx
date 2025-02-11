import { FaAd, FaBook, FaHome, FaList, FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import { FaCalendar, FaShop, FaStreetView } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../../Components/hooks/UseAdmin";

const DashBoard = () => {
    let [isAdmin] = UseAdmin();
    return (
        <div className="flex text-black">
            <div className="w-64 min-h-screen bg-orange-400 ">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink className="" to={'/dashboard/adminHome'}>
                                        <FaHome size={22}></FaHome>
                                        ADMIN HOME
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="" to={'/dashboard/addItems'}>
                                        <FaUtensils size={22}></FaUtensils>
                                        ADD ITEMS
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="" to={'/dashboard/manageItems'}>
                                        <FaList size={22}></FaList>
                                        Manage Items
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="" to={'/dashboard/manageBookings'}>
                                        <FaBook size={22}></FaBook>
                                        Manage Bookings
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="" to={'/dashboard/allUser'}>
                                        <FaUser size={22}></FaUser>
                                        All Users
                                    </NavLink>
                                </li>
                            </> :
                            <>
                                <li>
                                    <NavLink className="" to={'/dashboard/userHome'}>
                                        <FaHome></FaHome>
                                        User Home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="" to={'/dashboard/reservation'}>
                                        <FaCalendar></FaCalendar>
                                        Reservation
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="btn" to={'/dashboard/cart'}>
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="" to={'/dashboard/review'}>
                                        <FaAd></FaAd>
                                        Add a Review
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="" to={'/dashboard/bookings'}>
                                        <FaAd></FaAd>
                                        My Bookings
                                    </NavLink>
                                </li>
                            </>
                    }

                    <div className="divider border-black border-b-2"></div>
                    <li>
                        <NavLink className="" to={'/'}>
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="" to={'/order/salads'}>
                            <FaShoppingCart></FaShoppingCart>
                            Shop now
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="" to={'/contact'}>
                            <MdEmail></MdEmail>
                            Contact
                        </NavLink>
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