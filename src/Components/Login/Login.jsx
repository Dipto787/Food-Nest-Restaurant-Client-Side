import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthProvider } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
  let { signInUser } = useContext(AuthProvider);
  let [valid, setValid] = useState(true);
  let location = useLocation();
  let navigate = useNavigate();
  let from = location?.state || '/';
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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card  md:w-1/2  bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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

            <div className="form-control mt-6">
              <button disabled={valid} className="btn btn-primary">Login</button>
            </div>
          </form>
          <p>Don't have an Account? Please <Link className='text-blue-500' to='/signup'>SignUp</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;