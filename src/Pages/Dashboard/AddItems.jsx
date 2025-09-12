import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { FaSpinner, FaUtensils } from "react-icons/fa";
import UseAxiosPublic from "../../Components/hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddItems = () => {
    let axiosPublic = UseAxiosPublic();
    let axiosSecure = UseAxiosSecure();
    let [loading, setLoading] = useState(false)
    let { register, handleSubmit, reset } = useForm();
    let navigate = useNavigate()
    let onSubmit = async (data) => {
       

        let imgData = new FormData();
        imgData.append("image", file);
        try {
            setLoading(true)

            let res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, imgData);

            if (res.data.success) {
                let itemInfo = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    img: res.data.data.display_url,
                };

                let menuRes = await axiosSecure.post("/menu", itemInfo);
                if (menuRes.data.insertedId) {
                    reset();
                    setLoading(false)
                    navigate('/dashboard/manageItems')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} is added to the menu`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (err) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message
            })
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <SectionTitle heading={"ADD AN ITEM"} subHeading={"what's new"} />

            <div className="bg-white shadow-xl rounded-2xl p-8">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 text-gray-700"
                >
                    {/* Recipe Name */}
                    <div>
                        <label className="block mb-2 font-semibold">Recipe Name*</label>
                        <input
                            type="text"
                            placeholder="Recipe name"
                            {...register("name", { required: true })}
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Category + Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-semibold">Category*</label>
                            <select
                                defaultValue={"default"}
                                {...register("category", { required: true })}
                                className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                <option disabled value={"default"}>
                                    Select a category
                                </option>
                                <option value={"burger"}>burger</option>
                                <option value={"pizza"}>pizza</option>
                                <option value={"noodles"}>noodles</option>
                                <option value={"dessert"}>dessert</option>
                                <option value={"drink"}>drink</option>
                                <option value={"salad"}>salad</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Price*</label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register("price", { required: true })}
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div>
                        <label className="block mb-2 font-semibold">Recipe Details*</label>
                        <textarea
                            {...register("recipe")}
                            className="textarea textarea-bordered w-full h-28 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Write recipe details..."
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block mb-2 font-semibold">Upload Image*</label>
                        <input
                            {...register("image")}
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:scale-105 transform transition"
                        >
                            {loading ? <FaSpinner className="animate-spin text-white" ></FaSpinner> : <p className="flex items-center">Add Item <FaUtensils className="ml-2" /></p>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
