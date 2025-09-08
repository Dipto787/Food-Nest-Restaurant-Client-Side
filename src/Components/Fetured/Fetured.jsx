import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import featured from '../../assets/home/featured.jpg';
import featureBg from '../../assets/home/fetaured bg.jpg';

const Featured = () => {
    return (
        <div 
            style={{ backgroundImage: `url(${featureBg})` }} 
            className="w-full bg-center bg-cover bg-fixed my-20 relative"
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            <div className="relative z-10 text-white py-10 px-5 md:px-20">
                <SectionTitle 
                    subHeading="Check it out" 
                    heading="✨ Chef’s Specials Uncovered" 
                />

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 rounded-lg pt-6">
                    {/* Image */}
                    <img 
                        className="shadow-2xl rounded-xl w-full max-w-md md:max-w-lg object-cover transition-transform duration-500 hover:scale-105" 
                        src={featured} 
                        alt="Chef Specials" 
                    />

                    {/* Content */}
                    <div className="md:ml-0 space-y-4 max-w-lg text-center md:text-left">
                        <p className="text-sm text-gray-300">July 18, 2023</p>
                        <p className="uppercase text-orange-300 font-semibold tracking-wider text-sm">Craving Something Unforgettable?</p>
                        <p className="text-gray-100 text-sm md:text-base">
                            If your taste buds are searching for something extraordinary, you’re in the right place. 
                            Our kitchen is a destination for flavor lovers—where every dish is a celebration of passion, quality, and creativity.
                            So, if you’re craving something unforgettable, stop by and let us serve you more than just food—let us serve you happiness on a plate.
                        </p>
                        <button className="btn px-8 py-2 text-xs md:text-sm btn-outline text-orange-300 uppercase font-bold border-0 border-b-4 hover:bg-orange-600 hover:text-white transition-all">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
