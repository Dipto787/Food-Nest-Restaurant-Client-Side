import UseAuth from "../../Components/hooks/UseAuth";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiSolidFoodMenu, BiSolidCreditCardFront } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
import CountUp from "react-countup";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseCart from "../../Components/hooks/UseCart";

const UserHome = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [cart] = UseCart();

  const { data: payment = [] } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  const totalPrice = payment.reduce((total, item) => total + item.price, 0);

  return (
    <div className="px-5 md:px-10 py-8 space-y-8">
      {/* Welcome */}
      <h1 className="text-2xl md:text-3xl font-semibold">
        Hi, Welcome{" "}
        {user?.displayName ? (
          <span className="text-orange-400">{user.displayName}</span>
        ) : (
          "back"
        )}
      </h1>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6 md:gap-8 justify-between">
        <div className="flex-1 min-w-[250px] flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 shadow-lg transition-transform transform hover:scale-105">
          <LiaMoneyBillWaveAltSolid size={50} className="text-white" />
          <div className="text-white text-center">
            <h2 className="text-xl md:text-2xl font-bold">
              $<CountUp end={totalPrice} duration={3} />+
            </h2>
            <p className="text-sm md:text-xs">Total Cost</p>
          </div>
        </div>

        <div className="flex-1 min-w-[250px] flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-200 shadow-lg transition-transform transform hover:scale-105">
          <MdOutlineShoppingCart size={50} className="text-white" />
          <div className="text-center text-white">
            <h2 className="text-xl md:text-2xl font-bold">
              <CountUp end={cart.length + payment.length} duration={3} />+
            </h2>
            <p className="text-sm md:text-xs">Orders</p>
          </div>
        </div>

        <div className="flex-1 min-w-[250px] flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-300 shadow-lg transition-transform transform hover:scale-105">
          <BiSolidFoodMenu size={50} className="text-white" />
          <div className="text-center text-white">
            <h2 className="text-xl md:text-2xl font-bold">
              <CountUp end={7} duration={3} />+
            </h2>
            <p className="text-sm md:text-xs">Total Bookings</p>
          </div>
        </div>
      </div>

      {/* Profile & Activities */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Card */}
        <div className="flex-1 bg-orange-100 rounded-2xl p-8 flex flex-col items-center shadow-lg transition-transform transform hover:scale-105">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="rounded-full h-24 w-24 border-4 border-orange-400 object-cover"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{user?.displayName}</h2>
        </div>

        {/* Activities Card */}
        <div className="flex-1 bg-yellow-100 rounded-2xl p-8 shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-6">Your Activities</h2>
          <div className="space-y-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-orange-500 uppercase">
              <BiSolidCreditCardFront /> Payments: {payment.length}
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold text-green-600 uppercase">
              <FaStar /> Reviews: 6
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold text-yellow-600 uppercase">
              <IoMdBookmark /> Wishlist: 12
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
