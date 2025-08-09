import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthProvider } from "../../Provider/AuthContext";
import UseCart from "../hooks/UseCart";
import { FaCartShopping } from "react-icons/fa6";
import UseAdmin from "../hooks/UseAdmin";
const Navbar = () => {
    let { user, logout } = useContext(AuthProvider);
    let [cart] = UseCart();
    let [isAdmin] = UseAdmin();
    let options = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/menu'>Our Menu</NavLink></li>
        <li><NavLink to='/order?category=burger'>Shop Now</NavLink></li>
        {
            user && isAdmin && <li><NavLink to={'/dashboard/adminHome'}>DashBoard</NavLink></li>
        }
        {
            user && !isAdmin && <li><NavLink to={'/dashboard/userHome'}>DashBoard</NavLink></li>
        }
        {/* <li>
            <NavLink className="btn border-none" to={'/dashboard/cart'}>
                <FaCartShopping />
                <div className="badge badge-secondary">+{cart.length}</div>
            </NavLink>
        </li> */}

        {
            user ? <>

                <li onClick={logout}><NavLink className={'btn ml-3 bg-orange-600 font-bold text-white'}>   <span className="text-blue-700 font-bold">{user.displayName}</span> Logout</NavLink></li>
            </>
                : <>      <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/signup'>SignUp</NavLink></li></>
        }

    </>
    return (
        <div>
            <div className="navbar w-full fixed bg-opacity-30 text-white   z-10 bg-gray-500">
                <div className="navbar-start">
                    <div className="dropdown">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {options}
                        </ul>
                    </div>
                    <Link className="btn text-red-500 font-bold btn-ghost text-xl">FOOD NEST</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {options}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Get Started</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;