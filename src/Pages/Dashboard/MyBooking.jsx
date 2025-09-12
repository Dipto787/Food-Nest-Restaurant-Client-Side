import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Components/hooks/UseAuth";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa6";
const CANCEL_WINDOW_HOURS = 5;
import { IoCall, IoTimeSharp, IoCalendarSharp, IoPersonSharp, IoMail } from "react-icons/io5"; 
const MyBooking = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["tableBooked", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookTable/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const isCancelable = (bookingDate) => {
    if (!bookingDate) return false;
    const bookedAt = new Date(bookingDate);
    const now = new Date();
    const diffHours = (now - bookedAt) / 1000 / 60 / 60;
    return diffHours <= CANCEL_WINDOW_HOURS;
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <FaSpinner className="animate-spin w-12 h-12 text-indigo-600" />
      </div>
    );
  }

  return (


    <div className="p-5 md:p-10 bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
        🌟 My Bookings ({bookings.length})
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookings found yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative bg-white/90 backdrop-blur-lg border border-gray-200 
                     shadow-lg hover:shadow-2xl transition-all rounded-2xl p-6 
                     hover:-translate-y-1 duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{booking.name}</h3>

              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <IoPersonSharp className="text-indigo-500 text-lg" />
                <span>Guests: <span className="font-medium">{booking.guest}</span></span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <IoCalendarSharp className="text-green-500 text-lg" />
                <span>Booking Date: <span className="font-medium">{new Date(booking.bookingDate).toLocaleString()}</span></span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <IoCalendarSharp className="text-purple-500 text-lg" />
                <span>Table Date: <span className="font-medium">{booking.date}</span></span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <IoTimeSharp className="text-yellow-500 text-lg" />
                <span>Time: <span className="font-medium">{booking.time}</span></span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <IoCall className="text-red-500 text-lg" />
                <span>{booking.phone}</span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-gray-600">
                <IoMail className="text-blue-500 text-lg" />
                <span>{booking.email}</span>
              </div>

              <button
                disabled={!isCancelable(booking.bookingDate)}
                className={`w-full px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
              ${isCancelable(booking.bookingDate)
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:scale-105"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
              >
                {isCancelable(booking.bookingDate)
                  ? "Cancel Booking"
                  : "Not Cancellable (Over 5h)"}
              </button>

            
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default MyBooking;
