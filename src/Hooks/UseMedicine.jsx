import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UseMedicine = () => {
    const axiosPublic= UseAxiosPublic()
  const {
    data: medicine = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["medicine"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicines");
      return res.data;
    },
  });

  return [medicine, loading, refetch];
};

export default UseMedicine;
