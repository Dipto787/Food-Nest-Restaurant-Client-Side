import { IoCall, IoLocationSharp, IoTimeSharp } from "react-icons/io5";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";

const BookTable = () => {
  return (
    <div className="px-5 md:px-10 py-10 space-y-12">
      {/* Reservation Section */}
      <SectionTitle heading={"Book a table"} subHeading={"Reservation"} />

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
              type="email"
              name="email"
              placeholder="Your Email..."
              className="input bg-white text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </fieldset>
        </div>

        <div className="text-center">
          <button className="btn text-white font-semibold rounded-lg px-14 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 transition-transform transform hover:scale-105">
            Book Table
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
