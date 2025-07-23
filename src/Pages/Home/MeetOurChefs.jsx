import axios from "axios";
import { useEffect, useState } from "react"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
const MeetOurChefs = () => {
    let [chefs, setChefs] = useState([]);
    useEffect(() => {
        axios.get('chefs.json')
            .then(res => {
                setChefs(res.data)
            })
    }, [])
    console.log('chefs',chefs)
    return (
        <div className="my-32">
            <SectionTitle heading={'meet our chefs'} subHeading={'check it out'}></SectionTitle>
          
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

                {
                    chefs.map(chef => 
                        <SwiperSlide>
                        
                            <div className="card relative p-2 bg-purple-200 h-[400px]">
                                <figure>
                                    <img
                                    className="h-80"
                                        src={chef.image}                                        alt="Shoes" />
                                </figure>
                                <span className="absolute bg-black py-1 px-4 bg-opacity-40 text-white font-bold left-5 top-5">{chef.experience} Experience</span>
                                <div className="card-body">
                                    <h2 className="card-title">{chef.name}</h2>
                                    <p>{chef.bio}</p>
                                    {/* <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Buy Now</button>
                                    </div> */}
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
};

export default MeetOurChefs;