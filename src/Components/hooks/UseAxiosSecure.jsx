import axios from "axios";
import { useContext } from "react";
import { AuthProvider } from "../../Provider/AuthContext";
import { useNavigate } from "react-router-dom";

export let axiosSecure = axios.create({
    baseURL: 'https://food-nest-website-server.vercel.app',
    withCredentials:true
})
const UseAxiosSecure = () => {
    // let { logout } = useContext(AuthProvider);
    // let navigate = useNavigate();
    // axiosSecure.interceptors.request.use(function (config) {
    //     let token = localStorage.getItem('access-token');
    //     // console.log('use secure')
    //     config.headers.authorization = `Bearer ${token}`;
    //     return config;
    // }, function (error) {
    //     return Promise.reject(error);
    // });
    // axiosSecure.interceptors.response.use(function (response) {
    //     return response;
    // }, async (error) => {
    //     let status = error.response.status;
    //     if (status === 401 || status === 403) {
    //         await logout();
    //         navigate('/login');
    //     }
    //     // console.log('status error',error);
    //     return Promise.reject(error);
    // })
    return axiosSecure;
};

export default UseAxiosSecure;