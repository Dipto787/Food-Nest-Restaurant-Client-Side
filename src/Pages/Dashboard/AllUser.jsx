import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import { FaUser } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const AllUser = () => {
    let axiosSecure = UseAxiosSecure();
    let { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            let res = await axiosSecure.get('/user',{
                headers:{
                    authorization:`Bearer ${localStorage.getItem('access-token')}`
                }
            });
           
            return res.data;
        }
    })
    let handleMakeAdmin = (user) => {
        axiosSecure.patch(`/user/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `${user.email} is and Admin Now!`,
                        icon: "success",
                        timer: 1500,
                        draggable: true
                    });
                }
            })
    }



    let handleDeleteUser = user => {
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
                axiosSecure.delete(`/user/${user._id}`)
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
    }
    return (
        <div>
            <div className="flex justify-evenly">
                <h1 className="text-3xl font-bold">All User</h1>
                <h1 className="text-3xl font-bold"> Total User</h1>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                        user.role === 'admin' ? 'Admin' :
                                            <button className="btn btn-lg bg-orange-500" onClick={() => handleMakeAdmin(user)}><FaUser className="text-white"></FaUser></button>
                                        }
                                    </td>

                                    <td>
                                        <button className="btn btn-ghost btn-lg " onClick={() => handleDeleteUser(user)}>
                                            <AiFillDelete className="text-red-600"></AiFillDelete>
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUser;