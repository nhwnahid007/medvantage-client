import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import UseAxiosPublic from "./UseAxiosPublic";
import useAuth from "./UseAuth";
import UseAdmin from "./useAdmin";

export const useSellerRequest = () => {
  const axiosSecure = UseAxiosSecure();
  const axiosPublic = UseAxiosPublic();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isAdmin] = UseAdmin();

  // Get all seller requests (admin only)
  const { data: sellerRequests = [], refetch: refetchSellerRequests } =
    useQuery({
      queryKey: ["sellerRequests"],
      queryFn: async () => {
        const res = await axiosSecure.get("/seller-requests");
        return res.data;
      },
      enabled: !!isAdmin, // Only run if user is admin
    });

  // Get current user's seller request
  const { data: userSellerRequest, refetch: refetchUserRequest } = useQuery({
    queryKey: ["userSellerRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/seller-requests/user");
      return res.data;
    },
    enabled: !!user?.email, // Only run if user is logged in
  });

  // Submit seller request
  const submitSellerRequest = useMutation({
    mutationFn: async (requestData) => {
      const res = await axiosSecure.post("/seller-requests", requestData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userSellerRequest"]);
    },
  });

  // Update seller request status (admin only)
  const updateSellerRequestStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/seller-requests/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sellerRequests"]);
      queryClient.invalidateQueries(["users"]);
    },
  });

  return {
    sellerRequests,
    userSellerRequest,
    refetchSellerRequests,
    refetchUserRequest,
    submitSellerRequest,
    updateSellerRequestStatus,
  };
};
