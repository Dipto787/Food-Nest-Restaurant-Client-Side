import Swal from "sweetalert2";
import UseAuth from "../../../Components/hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../../Components/hooks/UseAxiosSecure";
import UseCart from "../../../Components/hooks/UseCart";

const FoodCard = ({ item }) => {
    const { image, recipe, name, price, _id } = item;
    const { user } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = UseAxiosSecure();
    const [, refetch] = UseCart();

    const handleAddToCart = (item) => {
        const cartItem = {
            menuId: _id,
            email: user?.email,
            name,
            image,
            price
        };

        if (user && user.email) {
            axiosSecure.post('/cart', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Item added successfully!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                });
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
                {/* Image */}
                <figure className="overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold px-3 py-1 rounded-full shadow-lg">
                        ${price}
                    </span>
                </figure>

                {/* Card Content */}
                <div className="p-5 flex flex-col gap-3">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">{name}</h2>
                    <p className="text-gray-600 text-sm md:text-base line-clamp-3">{recipe}</p>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="mt-3 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold py-2 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
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
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
