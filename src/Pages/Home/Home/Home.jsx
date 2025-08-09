import { Helmet } from "react-helmet-async";
import CallUs from "../../../Components/CallUs";
import ChefService from "../../../Components/ChefService";
import Fetured from "../../../Components/Fetured/Fetured";
import PopularMenu from "../../../Components/PopularMenu";
import Testimonial from "../../../Components/Testimonial";
import CategorySlider from "../CategorySlider/CategorySlider";
import Slider from "../Slider/Slider";
import MeetOurChefs from "../MeetOurChefs";


const Home = () => {
    return (
        <div className="max-w-screen-2xl mx-auto">
            <Helmet>
                <title>Food Nest | Home</title>
            </Helmet>
            <Slider></Slider>
            <CategorySlider></CategorySlider>
            <ChefService></ChefService>
            <PopularMenu></PopularMenu>
            <MeetOurChefs></MeetOurChefs>
            <CallUs></CallUs>
            <Fetured></Fetured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;