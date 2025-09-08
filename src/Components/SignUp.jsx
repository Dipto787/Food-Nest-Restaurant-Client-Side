import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthProvider } from "../Provider/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import UseAxiosPublic from "./hooks/UseAxiosPublic";
import authenticationImage from '../assets/others/authentication.gif'
import Swal from "sweetalert2";
import axios from "axios";
import { FaSpinner } from "react-icons/fa6";
const SignUp = () => {
    let axiosPublic = UseAxiosPublic();
    let [loading, setLoading] = useState(false);
    let { createUser, updateLoginUserProfile } = useContext(AuthProvider);
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    let onSubmit = async (e) => {
        console.log(e);
        setLoading(true);
        let formData = new FormData();
        formData.append('image', e.PhotoUrl[0])
        try {
            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );
            await createUser(e.email, e.password)
            await updateLoginUserProfile(e.name, data.data.url);
            Swal.fire({
                title: 'Success To Sign Up, Welcome !!',
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

    }
    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-[#f8f8fc] rounded-xl   p-10">
                <div className="flex gap-9 items-center">
                    <div className="text-center  lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>

                        <img className="w-[2000px]" src={authenticationImage} alt="" />

                    </div>
                    <div className="w-full  shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })}
                                    name="name" placeholder="name" className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-500 font-bold p-2">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>


                                <input {...register("PhotoUrl", { required: true })} type="file" className="file-input" />
                                {errors.PhotoUrl && <span className="text-red-500 font-bold p-2">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500 font-bold p-2">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    maxLength: 20,
                                    minLength: 6,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/

                                })}
                                    name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className="text-red-500 font-bold p-2">This field is required</span>}

                                {errors.password?.type === 'minLength' && <span className="text-red-500 font-bold p-2">Password must 6 characters</span>}

                                {errors.password?.type === 'maxLength' && <span className="text-red-500 font-bold p-2">Password must be less than 20 characters</span>}

                                {errors.password?.type === 'pattern' && <span className="text-red-500 font-bold p-2">password must have one upperCase one lower case, one number and one special character </span>}


                            </div>
                            <div className="form-control mt-6">
                                <button disabled={loading}
                                    className="px-6 py-2 text-white bg-blue-600 rounded-md 
                 hover:bg-blue-700 focus:outline-none 
                 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
                 transition-all duration-200"
                                >
                                    {loading ? <div className="text-center flex justify-center"><FaSpinner size={22} className="animate-spin text-center" /></div> : 'Sign Up '}
                                </button>
                            </div>
                        </form>
                        <p className="ml-8 p-2">Already have an Account? Please <Link className='text-blue-500 ' to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;