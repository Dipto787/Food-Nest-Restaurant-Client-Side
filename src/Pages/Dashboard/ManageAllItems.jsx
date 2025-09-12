import { FaEdit } from "react-icons/fa";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import UseMenu from "../../Components/Shared/ItemMenu/hooks/UseMenu";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageAllItems = () => {
  let [menu, , refetch] = UseMenu();
  let axiosSecure = UseAxiosSecure();

  let handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await axiosSecure.delete(`/menu/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Item has been removed.", "success");
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-8">
      <SectionTitle heading="Manage All Items" subHeading="Hurry up!" />

      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-indigo-600 text-white text-sm uppercase tracking-wide">
            <tr>
              <th className="py-3 text-center">#</th>
              <th className="py-3">Image</th>
              <th className="py-3">Name</th>
              <th className="py-3">Price</th>
              <th className="py-3 text-center">Update</th>
              <th className="py-3 text-center">Delete</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
            {menu.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-indigo-50 transition-colors"
              >
                <td className="text-center font-semibold text-gray-600">
                  {index + 1}
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 ring-2 ring-indigo-200">
                        <img src={item.img} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">{item.name}</td>
                <td className="font-semibold text-indigo-600">
                  ${item.price}
                </td>

                {/* Update Button */}
                <td className="text-center">
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md transition-transform transform hover:scale-110">
                      <FaEdit />
                    </button>
                  </Link>
                </td>

                {/* Delete Button */}
                <td className="text-center">
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-transform transform hover:scale-110"
                  >
                    <AiFillDelete />
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

export default ManageAllItems;
