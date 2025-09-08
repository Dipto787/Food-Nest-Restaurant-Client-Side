import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";

const MeetOurChefs = () => {
    let [chefs, setChefs] = useState([]);

    useEffect(() => {
        axios.get("/chefs.json").then((res) => {
            setChefs(res.data);
        });
    }, []);

    return (
        <div className="my-16 px-4">
            <SectionTitle heading={"Meet Our Chefs"} subHeading={"Check it out"} />

            <Swiper
                spaceBetween={20}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                breakpoints={{
                    0: { slidesPerView: 1 },      // Mobile
                    640: { slidesPerView: 2 },    // Tablet
                    1024: { slidesPerView: 3 },   // Laptop
                    1280: { slidesPerView: 4 },   // Desktop
                }}
                className="mySwiper"
            >

                {chefs.map((chef, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative group bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6 rounded-2xl shadow-lg h-[450px] flex flex-col items-center hover:scale-105 transition-transform duration-300">

                            {/* Chef Image */}
                            <div className="w-full flex justify-center">
                                <img
                                    className="h-40 w-40 md:h-48 md:w-48 object-cover rounded-full border-4 border-yellow-500 shadow-lg"
                                    src={chef.image}
                                    alt={chef.name}
                                />
                            </div>

                            {/* Experience Badge */}
                            <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs md:text-sm py-1 px-3 rounded-full font-semibold shadow-md">
                                {chef.experience} Exp
                            </span>

                            {/* Content */}
                            <div className="mt-6 text-center flex flex-col flex-grow">
                                <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide mb-2">
                                    {chef.name}
                                </h2>
                                <p className="text-sm md:text-base text-gray-300 line-clamp-3 px-2">
                                    {chef.bio}
                                </p>
                                <div className="mt-auto pt-4">
                                    <button className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full shadow-md hover:bg-yellow-600 transition-colors duration-300">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MeetOurChefs;
