import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import UseAxiosPublic from "../../../Components/hooks/UseAxiosPublic";
import { FaCircleArrowLeft } from "react-icons/fa6";
import banner from '../../../assets/others/banner-bg.jpg';
import Spinner from "../../../Components/Shared/Sppiner";
import { useState } from "react";
import UseAuth from "../../../Components/hooks/UseAuth";
import Swal from "sweetalert2";
import UseCart from "../../../Components/hooks/UseCart";

const CardDetails = () => {
    const params = useParams();
    const location = useLocation();
    const [cart, refetch] = UseCart();
    const [quantity, setQuantity] = useState(1);
    const { user } = UseAuth();
    const axiosPublic = UseAxiosPublic();

    const { data: foodDetails, isLoading } = useQuery({
        queryKey: ['foodDetails', params.id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/order/${params.id}`);
            return data;
        }
    });

    if (isLoading) return <Spinner />;

    const handleAddToCart = (item) => {
        const myCart = {
            name: item.name,
            img: item.img,
            price: quantity * item.price,
            category: item.category,
            quantity,
            email: user.email,
        };
        axiosPublic.post('/cart', myCart)
            .then(res => {
                if (res.data.acknowledged) {
                    refetch();
                    Swal.fire({
                        title: "Added",
                        text: "Successfully added to cart!",
                        icon: "success"
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    title: "Oops!",
                    text: "Something went wrong",
                    icon: "error"
                });
            });
    };

    return (
        <div 
            style={{ backgroundImage: `url(${banner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
            className="w-full bg-center bg-fixed"
        >
            <div className="bg-black bg-opacity-70 py-10">
                <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                    <div className="flex flex-col lg:flex-row items-center gap-10">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2 flex flex-col items-center">
                            <FaCircleArrowLeft 
                                onClick={() => window.history.back()} 
                                title="Back" 
                                className="cursor-pointer text-orange-400 hover:text-orange-500 transition-colors mb-4" 
                                size={40} 
                            />
                            <img
                                src={foodDetails.img}
                                alt={foodDetails.name}
                                className="rounded-xl shadow-2xl w-full max-w-md md:max-w-lg object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="w-full lg:w-1/2 text-white space-y-4">
                            <h1 className="text-2xl md:text-3xl font-bold">{foodDetails.name}</h1>
                            <p className="text-sm md:text-base text-gray-300">{foodDetails.description}</p>

                            <div>
                                <h3 className="text-sm font-semibold text-orange-400 mb-2">Ingredients:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {foodDetails.details.ingredients.map((ingredient, index) => (
                                        <span 
                                            key={index} 
                                            className="bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-1 rounded-full text-xs font-semibold shadow-md"
                                        >
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-sm font-semibold text-orange-400 mt-4 mb-1">Recipe:</h3>
                                <p className="text-gray-200 text-sm md:text-base">{foodDetails.details.recipe}</p>

                                <p className="text-2xl text-orange-400 mt-3 font-bold">${foodDetails.price}</p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 mt-4">
                                <button 
                                    disabled={quantity === 1} 
                                    onClick={() => setQuantity(quantity - 1)} 
                                    className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                                >
                                    -
                                </button>
                                <span className="font-bold text-white text-lg">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(quantity + 1)} 
                                    className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                                >
                                    +
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                <button 
                                    onClick={() => handleAddToCart(foodDetails)}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold px-5 py-2 rounded shadow-lg transition-transform transform hover:scale-105"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                                        <circle cx="7" cy="21" r="1" />
                                        <circle cx="17" cy="21" r="1" />
                                    </svg>
                                    Add to Cart
                                </button>
                                <button className="bg-gradient-to-r from-pink-500 via-pink-600 to-orange-500 text-white px-5 py-2 rounded shadow-lg hover:from-orange-500 hover:via-pink-500 hover:to-pink-600 transition-transform transform hover:scale-105">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;
