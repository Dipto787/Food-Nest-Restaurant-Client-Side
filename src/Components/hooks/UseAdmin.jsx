import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const UseAdmin = () => {
    let { user } = UseAuth();
    let axiosSecure = UseAxiosSecure();

    let { data: isAdmin,isPending  } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            let res = await axiosSecure.get(`/user/admin/${user.email}`);
            return res.data?.admin;
        }
    })
    return [isAdmin,isPending];
};

export default UseAdmin;