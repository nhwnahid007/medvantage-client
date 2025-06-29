import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const axiosPublic = UseAxiosPublic();

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const { register, handleSubmit } = useForm();

  console.log("userData", userData.photoUrl);

  const onSubmit = async (data) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update your profile information?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#9333ea", // Purple color to match your theme
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "Cancel",
      });

      // If user cancels, return early
      if (!result.isConfirmed) {
        return;
      }

      let photoUrl = userData.photoUrl; // Use existing image if no new one

      if (data.photo && data.photo.length > 0) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        photoUrl = res.data.data.display_url;
      }

      const userInfo = {
        name: data.name,
        photoUrl,
      };

      const userRes = await axiosPublic.patch(
        `/updateUser/${user?.email}`,
        userInfo
      );

      console.log(userRes);
      refetch();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Update failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Update Profile</title>
      </Helmet>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex flex-col items-center text-center">
            <img
              src={
                userData.photoUrl ||
                "https://i.ibb.co/FHfFTWX/User-Profile-PNG-Free-Download.png"
              }
              alt="User"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-600 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {userData?.name}
            </h2>
            <p className="text-sm text-gray-500 mb-1">{userData?.role}</p>
            <p className="text-sm text-gray-600">{userData?.email}</p>
          </div>
        </div>

        {/* Update Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Update Your Information
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Change Name
              </label>
              <input
                {...register("name", { required: true })}
                defaultValue={userData.name}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Change Photo (Optional)
              </label>
              <input
                {...register("photo")}
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Update Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
