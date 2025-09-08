import { FaTrashAlt } from "react-icons/fa";
import UseCart from "../../Components/hooks/UseCart";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const MyCart = () => {
  let [cart, refetch] = UseCart();
  let axiosSecure = UseAxiosSecure();
  let totalPrice = cart.reduce((total, item) => total + item.price, 0);

  let handleDelete = (id) => {
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
        axiosSecure.delete(`/cart/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Item has been removed.", "success");
            refetch();
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Summary */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#f3f3f3] to-[#e2e2e2] p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Items: <span className="text-orange-500">{cart.length}</span></h2>
        <h2 className="text-lg font-bold">Total Price: <span className="text-orange-500">${totalPrice}</span></h2>
        <NavLink to={cart.length ? `/dashboard/payment` : "#"}>
          <button
            className={`btn px-6 py-2 rounded-sm text-white font-bold transition-transform transform hover:scale-105 ${
              cart.length ? "bg-gradient-to-r from-green-400 to-blue-500" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!cart.length}
          >
            Pay Now
          </button>
        </NavLink>
      </div>

      {/* Table / Cards */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-[#d1a054] text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td>{index + 1}</td>
                <td>
                  <img className="h-12 w-12 rounded-lg object-cover" src={item.img} alt={item.name} />
                </td>
                <td className="font-semibold">{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 transition-colors">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {cart.map((item, index) => (
          <div key={item._id} className="flex flex-col sm:flex-row justify-between items-center bg-white shadow-md p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="font-bold">{index + 1}</span>
              <img className="h-16 w-16 rounded-lg object-cover" src={item.img} alt={item.name} />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-orange-500 font-bold">${item.price}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="mt-2 sm:mt-0 text-red-500 hover:text-red-700 font-bold"
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCart;
