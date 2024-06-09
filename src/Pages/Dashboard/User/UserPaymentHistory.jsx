import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import useAuth from "../../../Hooks/UseAuth";

const UserPaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();
    console.log(user?.email);

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data;
        }
    });

    return (
        <div>
            <SectionHeading heading={'Payment History'}></SectionHeading>
            <h3>Total Payment: {payments.length}</h3>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className={payment.status === "paid" ? "bg-green-200" : "bg-red-200"}>
                                <th>{index + 1}</th>
                                <td>{payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.date}</td>
                                <td>{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPaymentHistory;
