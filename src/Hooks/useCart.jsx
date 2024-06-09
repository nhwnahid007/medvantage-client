import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";





const useCart = () => {
    const axiosSecure = UseAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/carts?buyerEmail=${user.email}`);
            return res.data;
        }
    })

    return [cart, refetch]
};

export default useCart;