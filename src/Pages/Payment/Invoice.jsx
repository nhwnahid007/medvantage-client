import { useParams } from 'react-router-dom';
import useAuth from '../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const Invoice = () => {
    const { transactionId } = useParams();
    const axiosSecure = UseAxiosSecure();

    const { user } = useAuth();

    const { data: invoice = [] } = useQuery({
        queryKey: ['payments', transactionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/invoice/${transactionId}`);
            return res.data;
        }
    });

    return (
        <div className="bg-gray-100 w-4/6 mx-auto min-h-screen flex flex-col justify-center items-center">
           <img className='w-20 rounded-full' src="https://i.ibb.co/sH3vMxD/medvantage.jpg" alt="" />
           <p className='text-4xl my-5'>Medvantage</p>
            <div className="bg-white shadow-md rounded px-8 py-6">
                <p className="text-3xl font-bold text-center mb-4 text-purple-600">Invoice Page: {user?.displayName}</p>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Item</th>
                            <th className="px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2 font-semibold">Total Price</td>
                            <td className="border px-4 py-2">{invoice.price}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 font-semibold">Medicine Name</td>
                            <td className="border px-4 py-2">
                                {invoice.medicineName && invoice.medicineName.map((medicine, index) => (
                                    <p key={index} className="text-gray-900">{medicine}</p>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 font-semibold">Buyer Email</td>
                            <td className="border px-4 py-2">{invoice.buyerEmail}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 font-semibold">Seller Email(s)</td>
                            <td className="border px-4 py-2">
                                {invoice.sellerEmails && invoice.sellerEmails.map((seller, index) => (
                                    <p key={index} className="text-gray-900">{seller}</p>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Invoice;
