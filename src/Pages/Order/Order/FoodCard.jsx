import Swal from "sweetalert2";
import UseAuth from "../../../Components/hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UseAxiosSecure from "../../../Components/hooks/UseAxiosSecure";
import UseCart from "../../../Components/hooks/UseCart";

const FoodCard = ({ item }) => {
    let { image, recipe, name, price, _id } = item;
    let { user } = UseAuth();
    let navigate = useNavigate();
    let location = useLocation();
    let axiosSecure = UseAxiosSecure();
    let [, refetch] = UseCart();
    console.log(axiosSecure.baseUrl)
    console.log(location)
    let handleAddToCart = item => {
        console.log(item)
        let cartItem = {
            menuId: _id,
            email: user?.email,
            name,
            image,
            price
        }
        if (user && user.email) {
            axiosSecure.post('/cart', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Item added successfully!!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
        } else {
            Swal.fire({
                title: "Your are not logged in",
                text: "please login to add to the cart",
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
    }
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <p className="absolute right-0 mr-4 mt-4 text-white px-4 bg-slate-900">{price}</p>
                <div className="card-body flex items-center">
                    <h2 className="card-title">{name}</h2>
                    <p className="flex-grow">{recipe}</p>
                    <div className="card-actions justify-end">
                        <button onClick={handleAddToCart} className="btn border-0 border-orange-500  border-b-4 ">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;