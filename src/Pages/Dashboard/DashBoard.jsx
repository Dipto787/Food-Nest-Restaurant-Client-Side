import { FaAd, FaBook, FaHome, FaList, FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../../Components/hooks/UseAdmin";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const DashBoard = () => {
  const [isAdmin] = UseAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = isAdmin ? (
    <>
      <li>
        <NavLink to={'/dashboard/adminHome'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaHome size={20} /> ADMIN HOME
        </NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard/addItems'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaUtensils size={20} /> ADD ITEMS
        </NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard/manageItems'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaList size={20} /> MANAGE ITEMS
        </NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard/manageBookings'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaBook size={20} /> MANAGE BOOKINGS
        </NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard/allUser'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaUser size={20} /> ALL USERS
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to={'/dashboard/userHome'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaHome size={20} /> USER HOME
        </NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard/reservation'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaCalendar size={20} /> RESERVATION
        </NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard/cart'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaShoppingCart size={20} /> MY CART
        </NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard/paymentHistory'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaShoppingCart size={20} /> PAYMENT HISTORY
        </NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard/bookings'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaAd size={20} /> MY BOOKINGS
        </NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard/review'} className="flex items-center gap-2 py-2 hover:text-orange-400">
          <FaAd size={20} /> ADD A REVIEW
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white text-black max-w-screen-2xl mx-auto">
      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#d1a054] text-white">
        <h2 className="font-bold text-lg">Dashboard</h2>
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed md:relative top-0 left-0 w-64 min-h-screen bg-[#d1a054] p-4 text-xs z-50 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <ul className="menu space-y-2">
            {menuItems}
            <div className="divider border-black border-b-2 my-2"></div>
            <li>
              <NavLink to={'/'} className="flex items-center gap-2 py-2 hover:text-orange-400">
                <FaHome size={20} /> HOME
              </NavLink>
            </li>
            <li>
              <NavLink to={'/order?category=burger'} className="flex items-center gap-2 py-2 hover:text-orange-400">
                <FaShoppingCart size={20} /> SHOP NOW
              </NavLink>
            </li>
            <li>
              <NavLink to={'/contact'} className="flex items-center gap-2 py-2 hover:text-orange-400">
                <MdEmail size={20} /> CONTACT
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Dashboard Content */}
        <div className="flex-1 p-8 lg:ml-0 md:ml-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
