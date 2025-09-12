import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const useRole = () => {
    let { user } = UseAuth(); 
    let axiosSecure = UseAxiosSecure();
    let { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            let res = await axiosSecure.get(`/role/${user?.email}`);
            return res.data;
        }
    })

    return [role, isLoading];
};

export default useRole;