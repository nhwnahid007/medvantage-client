import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { Helmet } from "react-helmet-async";

const UpdateProfile = () => {
  const { user } = useAuth();
  console.log(user);

  const axiosSecure = UseAxiosSecure();
  const { data: userData = [],refetch } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  console.log(image_hosting_key);
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  console.log(image_hosting_api);

  const axiosPublic = UseAxiosPublic();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const name = data.name;
      // Upload image only if user creation is successful

      // Upload image to imgbb and get URL
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image upload response:", res.data);

      const photoUrl = res.data.data.display_url;

      // Update user profile with photo URL

      const userInfo = { name, photoUrl };
      console.log(userInfo);
      const userRes = await axiosPublic.patch(
        `/updateUser/${user?.email}`,
        userInfo
      );
      console.log(userRes);
      refetch()
      toast.success("Updated successfully");

    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Error during Update. Please try again later.");
    }
  };

  return (
    <div className="">
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <div className="max-w-md mt-20 mx-auto p-8 sm:flex sm:space-x-6 dark:bg-gray-50 dark:text-gray-800">
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src={
              userData.photoUrl ||
              "https://i.ibb.co/FHfFTWX/User-Profile-PNG-Free-Download.png"
            }
            alt=""
            className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{userData?.name}</h2>
            <span className="text-sm dark:text-gray-600">{userData?.role}</span>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                ></path>
              </svg>
              <span className="dark:text-gray-600">{userData.email}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-center  dark:text-gray-800">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="flex bg-purple-200 flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800"
        >
          <label
            htmlFor="username"
            className="self-start text-xs font-semibold"
          >
            Change Name
          </label>
          <input
            {...register("name", { required: true })}
            defaultValue={userData.name}
            id="username"
            type="text"
            className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600"
          />
          <label
            htmlFor="password"
            className="self-start mt-3 text-xs font-semibold"
          >
            Change Photo
          </label>
          <input
            {...register("photo", { required: true })}
            accept="image/*"
            placeholder="photo"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <button
            type="submit"
            className="flex items-center justify-center h-12 px-6 mt-8 text-sm  rounded btn font-bold "
          >
            Update Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
