import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Components/hooks/UseAuth";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import { FaBox, FaDollarSign, FaShoppingCart, FaUser } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

const AdminHome = () => {
    let { user } = UseAuth();
    let axiosSecure = UseAxiosSecure();

    const { data: stats, isLoading, isError } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            let res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
    });

    const formattedRevenue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact", // 👈 K, M, B আকারে দেখাবে
        maximumFractionDigits: 1,
    }).format(stats?.revenue);

    if (isLoading) {
        return <p className="text-center mt-10 text-lg">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center mt-10 text-red-500">Failed to load stats!</p>;
    }

    // Pie chart data
    const chartData = [
        { name: "Users", value: stats.users || 0 },
        { name: "Menu Items", value: stats.menuItems || 0 },
        { name: "Orders", value: stats.orders || 0 },
        { name: "Revenue", value: stats.revenue || 0 },
    ];

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800">
                Hi, Welcome{" "}
                <span className="text-indigo-600">
                    {user.displayName ? user.displayName : "back"}
                </span>
                👋
            </h1>

            {/* Stats Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="stat bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center">
                    <FaUser className="text-4xl text-indigo-500 mb-3" />
                    <div className="stat-title text-gray-500">Users</div>
                    <div className="stat-value text-2xl font-bold">{stats.users}</div>
                    <div className="stat-desc text-sm text-gray-400">Total Registered</div>
                </div>

                <div className="stat bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center">
                    <FaBox className="text-4xl text-green-500 mb-3" />
                    <div className="stat-title text-gray-500">Menu Items</div>
                    <div className="stat-value text-2xl font-bold">{stats.menuItems}</div>
                    <div className="stat-desc text-sm text-gray-400">Available Dishes</div>
                </div>

                <div className="stat bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center">
                    <FaShoppingCart className="text-4xl text-yellow-500 mb-3" />
                    <div className="stat-title text-gray-500">Orders</div>
                    <div className="stat-value text-2xl font-bold">{stats.orders}</div>
                    <div className="stat-desc text-sm text-gray-400">Completed Orders</div>
                </div>

                <div className="stat bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center">
                    <FaDollarSign className="text-4xl text-red-500 mb-3" />
                    <div className="stat-title text-gray-500">Revenue</div>
                    <div className="stat-value text-2xl font-bold">{formattedRevenue}</div>
                    <div className="stat-desc text-sm text-gray-400">Total Income</div>
                </div>
            </div>

            {/* Pie Chart Section */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue & Stats Overview</h2>
                <div className="h-80 w-full">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
