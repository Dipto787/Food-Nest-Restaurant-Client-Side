import axios from "axios";


let instance = axios.create({
    baseURL: 'https://food-nest-website-server.vercel.app',
    withCredentials:true
})
const UseAxiosPublic = () => {
    return instance;
};

export default UseAxiosPublic;