import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Components/hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateItems = () => {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // store uploaded file
    const params = useParams();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();

    const { data: menu = {}, refetch } = useQuery({
        queryKey: ['menu', params?.id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/order/${params?.id}`);
            return data;
        }
    });

    const { register, handleSubmit, reset, setValue } = useForm();

    // Pre-fill form when menu data loads
    useEffect(() => {
        if (menu) {
            setValue("name", menu.name);
            setValue("category", menu.category);
            setValue("price", menu.price);
            setValue("recipe", menu.recipe);
        }
    }, [menu, setValue]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            let imageUrl = menu.img; // default to existing image

            // Upload new file if user selected
            if (selectedFile) {
                const imgData = new FormData();
                imgData.append("image", selectedFile);

                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    imgData
                );

                if (res.data.success) {
                    imageUrl = res.data.data.display_url;
                }
            }

            const itemInfo = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: imageUrl
            };

            const menuRes = await axiosSecure.patch(`/menu/${params.id}`, itemInfo);

            if (menuRes.data.modifiedCount > 0) {
                reset();
                setSelectedFile(null);
                Swal.fire({
                    icon: "success",
                    title: `${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/manageItems');
                refetch();
            }

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Something Went Wrong',
                text: err.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 md:p-10 bg-gradient-to-br from-indigo-50 via-white to-blue-50 shadow-xl rounded-2xl">
            <SectionTitle heading="Update Item" subHeading="Refresh Info" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Recipe Name */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Recipe Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        {...register("name")}
                        className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 rounded-xl"
                    />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("category")}
                            className="select select-bordered w-full rounded-xl focus:ring-2 focus:ring-indigo-400"
                        >
                            <option disabled value="default">Select a category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drink">Drink</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Price <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            {...register("price")}
                            className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                </div>

                {/* Recipe Details */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Recipe Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        {...register("recipe")}
                        className="textarea textarea-bordered w-full h-32 rounded-xl focus:ring-2 focus:ring-indigo-400"
                        placeholder="Write recipe details here..."
                    ></textarea>
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Upload Image
                    </label>

                    {menu.img && (
                        <div className="mb-3">
                            <img
                                src={menu.img}
                                alt="Current"
                                className="w-32 h-32 object-cover rounded-xl border"
                            />
                            <p className="text-sm text-gray-500 mt-1">Current Image</p>
                        </div>
                    )}

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full max-w-md rounded-xl"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4 text-center">
                    <button
                        disabled={loading}
                        type="submit"
                        className="btn w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-lg transition-transform transform hover:scale-105"
                    >
                        {loading ? 'Wait...' : 'Update Recipe Details'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateItems;
