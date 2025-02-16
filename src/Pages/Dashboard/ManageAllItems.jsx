import { FaEdit } from "react-icons/fa";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import UseMenu from "../../Components/Shared/ItemMenu/hooks/UseMenu";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageAllItems = () => {
    let [menu, refetch] = UseMenu();
    console.log(menu) 
    let axiosSecure = UseAxiosSecure();
    let handleDeleteItem = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await axiosSecure.delete(`/menu/${_id}`);
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }
    return (
        <div>
            <SectionTitle heading={'manage all items'} subHeading={'hurry up!'}></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>name</th>
                            <th>price</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) => <tr>
                                <th>
                                    {index + 1}
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
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>

                                    <Link to={`/dashboard/updateItem/${item._id}`}>   <button className="btn btn-md btn-ghost bg-orange-500" onClick={() => handleMakeAdmin(user)}><FaEdit className="text-white"></FaEdit></button>
                                    </Link>

                                </td>

                                <td>
                                    <button className="btn btn-ghost btn-lg " onClick={() => handleDeleteItem(item._id)}>
                                        <AiFillDelete className="text-red-600"></AiFillDelete>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageAllItems;