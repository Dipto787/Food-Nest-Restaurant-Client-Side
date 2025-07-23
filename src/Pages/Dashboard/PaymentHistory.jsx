import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import UseAuth from "../../Components/hooks/UseAuth";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";

const PaymentHistory = () => {
    let axiosSecure = UseAxiosSecure();
    let { user } = UseAuth();
    const { data: payment = [] } = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            let res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
            <SectionTitle heading={'PAYMENT HISTORY'} subHeading={'At a Glance!'}></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment.map((pay, index) => <tr>
                                <th>{index + 1}</th>
                                <td>${pay.price}</td>
                                <td>{pay.transaction}</td>
                                <td>Pending</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;