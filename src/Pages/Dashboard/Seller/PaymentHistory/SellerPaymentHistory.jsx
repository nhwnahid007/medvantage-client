
import { Helmet } from "react-helmet-async";
import SectionHeading from "../../../../components/SectionHeading/SectionHeading";
import useAuth from "../../../../Hooks/UseAuth";
import usePayment from "../../../../Hooks/usePayment";

const SellerPaymentHistory = () => {
    const { user } = useAuth();
    const [payment] = usePayment();


    const userPayments = payment.filter(paymentData => paymentData.sellerEmails && paymentData.sellerEmails.includes(user.email));

    console.log(userPayments)

    return (
        <div>
            <Helmet>
        <title>Payment History</title>
      </Helmet>
            <SectionHeading heading={'Payment History'} />
            <h3>Total Payment: {userPayments.length}</h3>

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
                        {userPayments.map((payment, index) => (
                            <tr key={payment._id} className={payment.status === "paid" ? "bg-green-200" : "bg-red-200"}>
                                <td>{index + 1}</td>
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

export default SellerPaymentHistory;
