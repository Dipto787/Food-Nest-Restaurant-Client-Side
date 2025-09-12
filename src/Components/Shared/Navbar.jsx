import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthProvider } from "../../Provider/AuthContext";
import UseCart from "../hooks/UseCart";
import UseAdmin from "../hooks/UseAdmin";
import { PiShoppingCartLight } from "react-icons/pi";

const Navbar = () => {
    let { user, logout } = useContext(AuthProvider);
    let [cart] = UseCart();
    let [isAdmin] = UseAdmin();
    let options = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/menu'>Our Menu</NavLink></li>
        <li><NavLink to='/order?category=burger'>Shop Now</NavLink></li>
        {/* <li>
            <NavLink className="btn border-none" to={'/dashboard/cart'}>
            <FaCartShopping />
            <div className="badge badge-secondary">+{cart.length}</div>
            </NavLink>
            </li> */}

        {
            user ? < >
                {
                    user && isAdmin && <li><NavLink to={'/dashboard/adminHome'}>DashBoard</NavLink></li>
                }
                {
                    user && !isAdmin && <li><NavLink to={'/dashboard/userHome'}>DashBoard</NavLink></li>
                }
                {
                    <div className="relative">
                            <p className="absolute px-2 py-0.5 rounded-full font-bold -top-2 left-7 bg-red-600">{cart.length}</p>
                        <li className="">
                            <NavLink to={'/dashboard/cart'}>  <PiShoppingCartLight size={30} className="
                             font-bold " /></NavLink>

                        </li>


                    </div>
                }


            </>
                : undefined
        }

    </>
    return (
        <div>
            <div className="navbar w-full fixed bg-opacity-65 text-white   z-10 bg-gray-500">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm text-black text-xs dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {options}
                        </ul>
                    </div>
                    <Link className="btn text-red-500 font-bold btn-ghost text-xs">FOOD NEST</Link>
                </div>
                <div className="navbar-center   hidden lg:flex">
                    <ul className="menu  menu-horizontal px-1">
                        {options}
                    </ul>
                </div>
                <div className="navbar-end text-black">
                    {
                        user ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="profile picture"
                                        src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li onClick={logout}><Link>Logout</Link></li>
                                <li><Link>Settings</Link></li>
                                <li><Link>Profile</Link></li>
                            </ul>
                        </div> : <Link to={'/login'} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-500 transition-colors">
                            Login
                        </Link>

                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;