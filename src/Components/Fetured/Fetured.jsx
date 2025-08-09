import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import featured from '../../assets/home/featured.jpg'
import featureBg from '../../assets/home/fetaured bg.jpg'
const Fetured = () => {
    return (
        <div style={{ backgroundImage: `url(${featureBg})` }} className="featuredItem  w-full bg-no-repeat bg-opacity-80  bg-fixed bg-center my-20  ">
            <div className="bg-black pt-5 text-white bg-opacity-70">
                <SectionTitle subHeading={'Check it out'} heading={'✨ Chef’s Specials Uncovered'}>
                </SectionTitle>
                <div className="md:flex  justify-center      rounded-lg    pt-1 items-center pb-20 px-4">
              
                        <img className="shadow-2xl w-[600px] opacity-85" src={featured} alt="" />
                
                    <div className="md:ml-20 space-y-3">
                        <p>July 18, 2023</p>
                        <p className="uppercase text-lg">CRAVING SOMETHING UNFORGETTABLE?</p>
                        <p>If your taste buds are searching for something extraordinary, you’re in the right place. Our kitchen is a destination for flavor lovers—where every dish is a celebration of passion, quality, and creativity.
                            So, if you’re craving something unforgettable, stop by and let us serve you more than just food—let us serve you happiness on a plate.</p>
                        <button className="btn px-8 btn-outline text-orange-300 uppercase font-bold border-0 border-b-4 my-4">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fetured;