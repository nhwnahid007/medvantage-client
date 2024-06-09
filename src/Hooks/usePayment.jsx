import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";

const usePayment = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: payment = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  return [payment, loading, refetch];
};

export default usePayment;
