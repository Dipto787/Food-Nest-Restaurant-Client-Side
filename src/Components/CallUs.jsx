import { Phone, Mail, MapPin, Clock } from "lucide-react";

const CallUs = () => {
  return (
    <div className="my-16 px-4">
      <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 text-white py-12 px-6 rounded-3xl shadow-2xl">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 drop-shadow-lg">
          Contact <span className="text-yellow-300">FoodNest</span>
        </h2>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Phone */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white/20 p-4 rounded-full shadow-md">
              <Phone size={32} />
            </div>
            <h3 className="font-semibold text-lg">Call Us</h3>
            <p className="text-sm">+88 0192345678910</p>
            <p className="text-sm">+88 017987654321</p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white/20 p-4 rounded-full shadow-md">
              <Mail size={32} />
            </div>
            <h3 className="font-semibold text-lg">Email</h3>
            <p className="text-sm">foodnest.web@gmail.com</p>
            <p className="text-sm">support@foodnest.com</p>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white/20 p-4 rounded-full shadow-md">
              <MapPin size={32} />
            </div>
            <h3 className="font-semibold text-lg">Visit Us</h3>
            <p className="text-sm">House 12, Road 34</p>
            <p className="text-sm">Dhanmondi, Dhaka</p>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white/20 p-4 rounded-full shadow-md">
              <Clock size={32} />
            </div>
            <h3 className="font-semibold text-lg">Opening Hours</h3>
            <p className="text-sm">Mon - Fri: 10am - 10pm</p>
            <p className="text-sm">Sat - Sun: 11am - 11pm</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center mt-10 space-x-6">
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-yellow-300 hover:text-black transition"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-yellow-300 hover:text-black transition"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-yellow-300 hover:text-black transition"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallUs;
