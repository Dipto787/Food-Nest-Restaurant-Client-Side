import { Helmet } from "react-helmet-async";
import CallUs from "../../../Components/CallUs";
import ChefService from "../../../Components/ChefService";
import Fetured from "../../../Components/Fetured/Fetured";
import PopularMenu from "../../../Components/PopularMenu";
import Testimonial from "../../../Components/Testimonial";
import CategorySlider from "../CategorySlider/CategorySlider";
import Slider from "../Slider/Slider";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Slider></Slider>
            <CategorySlider></CategorySlider>
            <ChefService></ChefService>
            <PopularMenu></PopularMenu>
            <CallUs></CallUs>
            <Fetured></Fetured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;