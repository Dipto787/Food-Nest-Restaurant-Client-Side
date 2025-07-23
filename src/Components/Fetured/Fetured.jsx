import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import featured from '../../assets/home/featured.png'
import './Featured.css'
const Fetured = () => {
    return (
        <div className="featuredItem bg-fixed my-20  ">
            <SectionTitle subHeading={'Check it out'} heading={'FROM OUR MENU'}>
            </SectionTitle>
            <div className="md:flex justify-center bg-green-300  rounded-lg bg-opacity-70 pt-12 items-center pb-20 px-36">
                <div>
                    <img src={featured} alt="" />
                </div>
                <div className="md:ml-20">
                    <p>March 20, 2023</p>
                    <p className="uppercase">WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-primary px-10 font-bold border-0 border-b-4 my-7">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Fetured;