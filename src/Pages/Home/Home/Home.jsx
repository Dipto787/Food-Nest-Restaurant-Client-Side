import Fetured from "../../../Components/Fetured/Fetured";
import PopularMenu from "../../../Components/PopularMenu";
import CategorySlider from "../CategorySlider/CategorySlider";
import Slider from "../Slider/Slider";


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <CategorySlider></CategorySlider>
            <PopularMenu></PopularMenu>
            <Fetured></Fetured>
        </div>
    );
};

export default Home;