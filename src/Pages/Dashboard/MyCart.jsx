import { FaTrashAlt } from "react-icons/fa";
import UseCart from "../../Components/hooks/UseCart";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const MyCart = () => {
    let [cart, refetch] = UseCart();
    let axiosSecure = UseAxiosSecure();
    let totalPrice = cart.reduce((total, item) => total + item.price, 0);
    let handleDelete = (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/cart/${e}`)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    })
            }
        });
    };
    return (
        <div>
            <div className="flex justify-evenly">
                <h1 className="text-4xl">Items : {cart.length}</h1>
                <h1 className="text-4xl">Total Price : {totalPrice}</h1>
                {cart.length ? <NavLink to={`/dashboard/payment`}>  <button className="btn btn-primary">Pay</button></NavLink> : <button disabled className="btn btn-primary">Pay</button>}
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #

                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="font-bold">{item.name}</td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost text-red-500 font-bold btn-xs"><FaTrashAlt></FaTrashAlt></button>
                                    </th>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default MyCart;