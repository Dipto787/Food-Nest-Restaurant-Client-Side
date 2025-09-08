import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthProvider } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleSignIn from '../SocialSignIn/GoogleSignIn';


const Login = () => {
  let { signInUser,googleLogin } = useContext(AuthProvider);
  let handleGoogleSignIn=()=>{
    googleLogin()
    .then(res=>{
      console.log(res.user)
    })
  }
  let [valid, setValid] = useState(true);
  let location = useLocation();
  let navigate = useNavigate();
  let from = location?.state?.from.pathname || '/';
  console.log(from)
  useEffect(() => {
    loadCaptchaEnginge(6)
  }, [])

  let handleLogin = e => {
    e.preventDefault();
    let form = e.target;
    let email = form.email.value;
    let password = form.password.value;
    console.log(email, password)
    signInUser(email, password)
      .then(res => {
        let result = res.user;
        navigate(from, { replace: true })
        Swal.fire({
          title: "SuccessFull To Login!!",
          icon: "success",
          draggable: true
        });
        console.log(result);
      })
  }
  let handleValidCaptcha = e => {
    let user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setValid(false);
    } else {
      setValid(true);
    }
  }
  return (
    <div className="">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="      w-full max-w-md  shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" name="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" name="password" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate></LoadCanvasTemplate>
              </label>
              <input type="text" onBlur={handleValidCaptcha} placeholder="Write the Captcha" name="captcha" className="input input-bordered" required />
            </div>

            <div className="form-control mt-2">
              <button
  disabled={valid}
className="px-6 py-2 rounded-lg bg-[#198754] text-white font-semibold shadow-md hover:bg-[#157347] hover:shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
>
  Login
</button>

            </div>
          </form>
          <p className='text-center'>Don't have an Account? Please <Link className='text-blue-500' to='/signup'>SignUp</Link></p>
          <div className=' text-center'>
            <GoogleSignIn></GoogleSignIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;