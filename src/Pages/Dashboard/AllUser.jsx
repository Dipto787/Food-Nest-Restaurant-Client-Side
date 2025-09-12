import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useState } from "react";

const AllUser = () => {
    let axiosSecure = UseAxiosSecure();
    let { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            let res = await axiosSecure.get("/user");
            return res.data;
        },
    });
    let [role, setRole] = useState('user')
    // Update Role
    let handleUpdateRole = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "to change this user role",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make Admin"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/role/${email}`, { role }).then((res) => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: `${email} is now ${role}!`,
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    }
                });

               
            }
        });

    };

    // Delete User
    // let handleDeleteUser = (user) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "This user will be permanently removed.",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosSecure.delete(`/user/${user._id}`).then((res) => {
    //                 if (res.data.deletedCount > 0) {
    //                     Swal.fire("Deleted!", "User has been removed.", "success");
    //                     refetch();
    //                 }
    //             });
    //         }
    //     });
    // };

    return (
        <div className="w-full p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-700">All Users</h1>
                <h1 className="text-lg font-semibold text-gray-600">
                    Total Users:{" "}
                    <span className="text-indigo-600 font-bold">{users.length}</span>
                </h1>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
                <table className="table w-full">
                    <thead className="bg-indigo-600 text-white uppercase text-sm tracking-wide">
                        <tr>
                            <th className="py-3 text-center">#</th>
                            <th className="py-3">Name</th>
                            <th className="py-3">Email</th>
                            <th className="py-3 text-center">Role</th>
                            <th className="py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className="hover:bg-indigo-50 transition-colors"
                            >
                                <td className="text-center font-semibold text-gray-600">
                                    {index + 1}
                                </td>
                                <td className="font-medium">{user.name}</td>
                                <td className="text-gray-600">{user.email}</td>

                                {/* Role Dropdown */}
                                <td className="text-center">
                                    <select
                                        value={user?.role && 'admin'}
                                        defaultValue={user.role || "user"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="select select-bordered select-sm rounded-lg focus:ring-2 focus:ring-indigo-400"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="editor">Editor</option>
                                    </select>
                                </td>

                                {/* Delete Button */}
                                <td className="text-center">
                                    <button
                                        disabled={user?.role === 'admin'}
                                        onClick={() => handleUpdateRole(user.email)}
                                        className="btn btn-sm bg-green-500 hover:bg-red-600 text-white rounded-full shadow-md transition-transform transform hover:scale-110"
                                    >
                                        Update Role
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;
