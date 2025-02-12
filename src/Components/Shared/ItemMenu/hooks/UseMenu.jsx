
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";

const UseMenu = ({ filter = '', perPage = 4, currentPage = 0 } = {}) => {
    let axiosPublic = UseAxiosPublic();


    let { data: menu = [], refetch } = useQuery({
        queryKey: ['menu', filter, perPage, currentPage],
        queryFn: async () => {
            let urls = '';
            if (filter) {
                urls = `http://localhost:5000/menu?page=${currentPage}&size=${perPage}&filter=${filter}`;
            } else {
                urls = `http://localhost:5000/menu`
            }
            let res = await axiosPublic.get(urls);
            console.log(res.data)
            return res.data;

        }
    })
    return [menu, refetch]
};

export default UseMenu;