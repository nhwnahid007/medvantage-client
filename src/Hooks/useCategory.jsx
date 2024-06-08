import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const useCategory = () => {
    const axiosPublic= UseAxiosPublic()
    const {
        data: categories = [],
        
        refetch,
      } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
          const res = await axiosPublic.get("/categories");
          return res.data;
        },
      });
      return [categories, refetch]
};

export default useCategory;