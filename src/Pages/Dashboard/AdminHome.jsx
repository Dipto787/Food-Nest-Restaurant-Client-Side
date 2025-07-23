import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Components/hooks/UseAuth";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import { FaBox, FaDollarSign, FaShoppingCart, FaUser } from "react-icons/fa";

const AdminHome = () => {
    let { user } = UseAuth();
    let axiosSecure = UseAxiosSecure();
    const { data: stats, isLoading, isError } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            let res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })
    if (isLoading) {
        return <p>Loading...</p>;
    }


   console.log(stats)
    return (
        <div>
            <h1 className="text-3xl">
                <span>Hi, Welcome </span>
                {
                    user.displayName ? user.displayName : 'back'
                }
            </h1>

            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                      <FaUser className="text-3xl"></FaUser>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value"> {stats.users}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBox size={25}></FaBox>
                    </div>
                    <div className="stat-title">MenuItems</div>
                    <div className="stat-value">{stats.menuItems}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                       <FaShoppingCart size={28}></FaShoppingCart>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                       <FaDollarSign size={28}></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">{stats.revenue}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;