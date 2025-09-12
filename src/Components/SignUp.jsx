import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthProvider } from "../Provider/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import UseAxiosPublic from "./hooks/UseAxiosPublic";
import authenticationImage from '../assets/others/authentication.gif';
import Swal from "sweetalert2";
import axios from "axios";
import { FaSpinner } from "react-icons/fa6";

const SignUp = () => {
    const axiosPublic = UseAxiosPublic();
    const [loading, setLoading] = useState(false);
    const { createUser, updateLoginUserProfile } = useContext(AuthProvider);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);
        const formData = new FormData();
        formData.append('image', data.PhotoUrl[0]);

        try {
            const { data: imgData } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );

            await createUser(data.email, data.password);
            await updateLoginUserProfile(data.name, imgData.data.url);

            Swal.fire({
                title: 'Successfully Signed Up! Welcome 🎉',
                icon: "success",
                draggable: true
            });

            setLoading(false);
            navigate('/order?category=burger');
        } catch (error) {
            setLoading(false);
            Swal.fire({
                title: error.message,
                icon: "error",
                draggable: true
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-[#f8f8fc] rounded-xl p-6 md:p-10 shadow-lg">
                <div className="flex flex-col-reverse lg:flex-row gap-10 items-center">
                    {/* Left Section - Text + Image */}
                    <div className="text-center lg:text-left flex-1 space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-bold">Sign Up Now!</h1>
                        <p className="text-gray-600">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
                        </p>
                        <img
                            className="w-full max-w-md mx-auto lg:mx-0"
                            src={authenticationImage}
                            alt="Authentication Illustration"
                        />
                    </div>

                    {/* Right Section - Form */}
                    <div className="flex-1 bg-white shadow-2xl rounded-xl p-6 sm:p-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="input input-bordered w-full"
                                    {...register("name", { required: true })}
                                />
                                {errors.name && <p className="text-red-500 mt-1 text-sm">This field is required</p>}
                            </div>

                            {/* Profile Photo */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Profile Photo</span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input w-full"
                                    {...register("PhotoUrl", { required: true })}
                                />
                                {errors.PhotoUrl && <p className="text-red-500 mt-1 text-sm">This field is required</p>}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="input input-bordered w-full"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <p className="text-red-500 mt-1 text-sm">This field is required</p>}
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
                                    })}
                                />
                                {errors.password?.type === 'required' && <p className="text-red-500 mt-1 text-sm">This field is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-500 mt-1 text-sm">Password must be at least 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-500 mt-1 text-sm">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-500 mt-1 text-sm">Password must have one uppercase, one lowercase, one number, and one special character</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    {loading ? <FaSpinner className="animate-spin" /> : 'Sign Up'}
                                </button>
                            </div>

                            {/* Login Link */}
                            <p className="text-center mt-4 text-gray-600">
                                Already have an account? <Link to="/login" className="text-blue-500 font-semibold">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
