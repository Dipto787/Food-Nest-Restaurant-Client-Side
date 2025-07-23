import axios from "axios";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth"; 


const UseCart = () => {
    let { user } = UseAuth();
    let axiosSecure = UseAxiosSecure();
    let {refetch, data: cart = [] } = useQuery({
        queryKey: ['cart',user?.email],
        queryFn: async () => {
            let res = await axiosSecure.get(`/cart?email=${user.email}`);
            return res.data;
        }
    })
    return [cart,refetch];
};

export default UseCart;