import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: role = "", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;
