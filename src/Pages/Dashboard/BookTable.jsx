import { IoCall, IoLocationSharp, IoTimeSharp } from "react-icons/io5";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { fromJSON } from "postcss";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import UseAuth from "../../Components/hooks/UseAuth";
import { useNavigate } from "react-router-dom";
const BookTable = () => {
  let navigate = useNavigate();
  let axiosSecure = UseAxiosSecure();
  let [loading, setLoading] = useState(false);
  let { user } = UseAuth();
  let handleBookTable = async (e) => {
    e.preventDefault();
    setLoading(true);
    let form = e.target;
    let date = form.date.value;
    let time = form.time.value;
    let guest = form.person.value;
    let name = form.name.value;
    let phone = form.phone.value;
    let email = form.email.value;
    let bookingInfo = {
      date,
      time,
      guest,
      name,
      phone,
      email,
      bookingDate: new Date()
    };
    try {
      let { data } = await axiosSecure.post('/bookTable', bookingInfo);
      if (data.insertedId) {
        navigate('/dashboard/bookings');
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Table Booking SuccessFull !!'
        })
      } else {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Limit Error',
          text: 'you have cross our rules limit, you have already book 2 table first do complete this bookings !!',

        })
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      })
    }

  }
  return (
    <div className="px-5 md:px-10 py-10 space-y-12">
      {/* Reservation Section */}
      <SectionTitle heading={"Book a table"} subHeading={"Reservation"} />

      <form onSubmit={handleBookTable} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date */}
          <fieldset className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Date*</label>
            <input
              type="date"
              name="date"
              className="input bg-white text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </fieldset>

          {/* Time */}
          <fieldset className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Time*</label>
            <input
              type="time"
              name="time"
              className="input bg-white text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </fieldset>

          {/* Guest */}
          <fieldset className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Guest*</label>
            <select

              className="w-full border border-gray-300 p-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              name="person"
            >
              <option value="1 person">1 person</option>
              <option value="2 person">2 person</option>
              <option value="3 person">3 person</option>
              <option value="4 person">4 person</option>
              <option value="5 person">5 person</option>
            </select>
          </fieldset>

          {/* Name */}
          <fieldset className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name..."
              className="input bg-white text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </fieldset>

          {/* Phone */}
          <fieldset className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Phone*</label>
            <input
              type="tel"
              name="phone"
              placeholder="Your Number..."
              className="input bg-white text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </fieldset>

          {/* Email */}
          <fieldset className="flex flex-col">
            <label className="text-sm font-semibold mb-2">Email*</label>
            <input
              readOnly
              defaultValue={user?.email}
              type="email"
              name="email"
              className="input bg-white text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </fieldset>
        </div>

        <div className="text-center">
          <button disabled={loading} className="btn text-white font-semibold rounded-lg px-14 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 transition-transform transform hover:scale-105">
            {loading ? <FaSpinner className="animate-spin text-white font-bold"></FaSpinner> : 'Book Table'}
          </button>
        </div>
      </form>

      {/* Location Section */}
      <div className="space-y-6">
        <SectionTitle heading={"Location"} subHeading={"Our Location"} />

        <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden">
          {/* Icons Row */}
          <div className="flex flex-col md:flex-row text-white font-bold">
            <div className="flex-1 flex justify-center items-center bg-orange-400 py-6">
              <IoCall size={30} />
            </div>
            <div className="flex-1 flex justify-center items-center bg-orange-500 py-6">
              <IoLocationSharp size={30} />
            </div>
            <div className="flex-1 flex justify-center items-center bg-orange-600 py-6">
              <IoTimeSharp size={30} />
            </div>
          </div>

          {/* Info Row */}
          <div className="flex flex-col md:flex-row text-center md:text-left justify-around px-4 py-8 gap-6">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-semibold">PHONE</h3>
              <p className="text-xs">+8801608475287</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-semibold">ADDRESS</h3>
              <p className="text-xs">Dinajpur, College Mor</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-semibold">WORKING HOURS</h3>
              <p className="text-xs">Mon - Fri: 08:00 - 22:00</p>
              <p className="text-xs">Sat - Sun: 10:00 - 23:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
