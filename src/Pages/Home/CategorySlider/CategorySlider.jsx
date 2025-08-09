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
    return (
        <div className='mb-4'>
            <SectionTitle subHeading={'From 11:00am to 10:00pm'} heading={'ORDER NOW'}></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
              
                <SwiperSlide>
                    <img className='' src={img2} alt="" />
                    <h1 className='text-4xl text-center -mt-16 text-white   '>burger</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='' src={img3} alt="" />
                    <h1 className='text-4xl text-center -mt-16 text-white   '>pizzas</h1> 
                </SwiperSlide>
                <SwiperSlide>
                    <img className='' src={img4} alt="" />
                    <h1 className='text-4xl text-center -mt-16 text-white   '>desserts</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='' src={img5} alt="" />
                    <h1 className='text-4xl text-center -mt-16 text-white   '>Salads</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='' src={img6} alt="" />
                    <h1 className='text-4xl text-center -mt-16 text-white   '>Drinks</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='' src={img7} alt="" />
                    <h1 className='text-4xl text-center -mt-16 text-white   '>Noodles</h1>
                </SwiperSlide>
            
            </Swiper>
        </div>
    );
};

export default CategorySlider;