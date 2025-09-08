import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Pagination } from 'swiper/modules';   
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination'; 
import img3 from '../../../assets/home/slide2.jpg';
import img2 from '../../../assets/home/slide3.jpg';
import img4 from '../../../assets/home/slide4.jpg';
import img5 from '../../../assets/home/slide5.png'; 
import img6 from '../../../assets/home/slide6.jpg'; 
import img7 from '../../../assets/home/slide7.jpg'; 
import SectionTitle from '../../../Components/Shared/SectionTitle/SectionTitle';

const CategorySlider = () => {
    const slides = [
        { img: img2, title: 'Burger' },
        { img: img3, title: 'Pizzas' },
        { img: img4, title: 'Desserts' },
        { img: img5, title: 'Salads' },
        { img: img6, title: 'Drinks' },
        { img: img7, title: 'Noodles' },
    ];

    return (
        <div className="px-3 py-10 bg-gradient-to-r from-indigo-50 via-white to-blue-50 rounded-xl shadow-lg">
            <SectionTitle 
                subHeading="From 11:00am to 10:00pm" 
                heading="ORDER NOW"
            />

            <Swiper
                spaceBetween={20}
                freeMode={true}
                pagination={{ clickable: true }}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
                modules={[Pagination]}
                className="mySwiper py-5"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative group overflow-hidden rounded-xl shadow-md">
                        <img 
                            src={slide.img} 
                            alt={slide.title} 
                            className="w-full h-64 object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded-xl"></div>
                        <h1 className="absolute bottom-4 w-full text-center text-white text-xl font-semibold drop-shadow-lg">
                            {slide.title}
                        </h1>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategorySlider;
