import { FaGoogle } from "react-icons/fa";
import { AuthProvider } from "../../Provider/AuthContext";
import { useContext } from "react";
import UseAxiosPublic from "../hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
    let { googleLogin } = useContext(AuthProvider);
    let publicAxiosSecure = UseAxiosPublic();
    let navigate=useNavigate();
    let handleGoogleSignIn = () => {
        googleLogin()
            .then(res => {
                let userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName
                };
                publicAxiosSecure.post('/user',userInfo)
                .then(res=>{
                    console.log(res.data)
                    navigate('/'); 

                })
            })
    }
    return (
        <div>
            <div className="p-8">
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle size={22}></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default GoogleSignIn;