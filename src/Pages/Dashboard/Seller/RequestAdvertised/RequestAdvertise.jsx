import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/UseAuth";
import useAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const RequestAdvertise = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();
  
    const { refetch, data: ads = [] } = useQuery({
      queryKey: ["ads", user?.email],
      queryFn: async () => {
        try {
          const res = await axiosSecure.get(
            `/advertisementBySeller?email=${user.email}`
          );
          return res.data;
        } catch (error) {
          console.error("Error fetching advertisement:", error);
          throw new Error("Failed to fetch advertisement");
        }
      },
    });
  
    const onSubmit = async (data) => {
      try {
        const imageFile = new FormData();
        imageFile.append("image", data.image[0]);
  
        const res = await axiosPublic.post(image_hosting_api, imageFile);
  
        if (res.data.success) {
          const adItem = {
            name: data.name,
            description: data.description,
            image: res.data.data.display_url,
            email: user?.email,
            status: "requested",
          };
  
          const adRes = await axiosSecure.post("/advertisementBySeller", adItem);
          if (adRes.data.insertedId) {
            const modal = document.getElementById("my_modal_5");
            modal.close();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                container: "z-50",
              },
            });
  
            reset();
            refetch();
          }
        }
  
        toast.success("Added successfully");
      } catch (error) {
        console.error("Error during update:", error);
        toast.error("Error during Update. Please try again later.");
      }
    };

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          className="btn bg-purple-600 text-white my-10"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Add new Medicine
        </button>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-center text-lg">Add medicine Here</h3>

          <div className="flex items-center justify-center text-center dark:text-gray-800">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate=""
              action=""
              className="flex bg-purple-200 flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800"
            >
              <label
                htmlFor="description"
                className="self-start text-xs font-semibold"
              >
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Name"
                id="name"
                type="text"
                className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
                  errors.name && "border-red-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
              <label
                htmlFor="description"
                className="self-start text-xs font-semibold"
              >
                Ad Description
              </label>
              <input
                {...register("description", { required: "Description is required" })}
                placeholder="Ad Description"
                id="description"
                type="text"
                className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
                  errors.description && "border-red-500"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}

              <label
                htmlFor="image"
                className="self-start mt-3 text-xs font-semibold"
              >
                Add Photo
              </label>
              <input
                {...register("image", { required: "Image is required" })}
                accept="image/*"
                placeholder="Image"
                type="file"
                className={`file-input file-input-bordered w-full max-w-xs ${
                  errors.image && "border-red-500"
                }`}
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.image.message}
                </p>
              )}

              <button
                type="submit"
                className="flex items-center justify-center h-12 px-6 mt-8 text-sm rounded btn font-bold "
              >
                Request For advertisement
              </button>
            </form>
          </div>

          <div className="modal-action"></div>
        </div>
      </dialog>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, index) => (
              <tr key={index}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={ad.image} alt="Ad Image" />
                      </div>
                    </div>
                    
                  </div>
                </td>
                <td>{ad.name}</td>
                <td>{ad.description}</td>
               
                <td>{ad.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestAdvertise;
