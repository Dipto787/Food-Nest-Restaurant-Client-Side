import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthProvider } from "../Provider/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import UseAxiosPublic from "./hooks/UseAxiosPublic";
import Swal from "sweetalert2";
const SignUp = () => {
    let axiosPublic = UseAxiosPublic();
    let { createUser, updateLoginUserProfile } = useContext(AuthProvider);
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    let onSubmit = (e) => {
        console.log(e);
        createUser(e.email, e.password)
            .then(res => {
                let result = res.user;
                console.log(result);
                updateLoginUserProfile(e.name, e.PhotoUrl)
                    .then(res => {
                        let userInfo = {
                            name: e.name,
                            email: e.email
                        }
                        axiosPublic.post('/user', userInfo)
                            .then(res => {
                                reset();
                                Swal.fire({
                                    title: "Drag me!",
                                    icon: "success",
                                    draggable: true
                                });
                                navigate('/');

                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">SignUp now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
                            <input type="text" {...register("PhotoUrl", { required: true })}
                                name="PhotoUrl" placeholder="PhotoUrl" className="input input-bordered"
                            />
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
                            <button className="btn btn-primary">Signup</button>
                        </div>
                    </form>
                    <p>Already have an Account? Please <Link className='text-blue-500' to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;