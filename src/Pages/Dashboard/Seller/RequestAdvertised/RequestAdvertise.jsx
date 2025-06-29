import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/UseAuth";
import useAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import SectionHeading from "../../../../components/SectionHeading/SectionHeading";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const RequestAdvertise = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { refetch, data: ads = [] } = useQuery({
    queryKey: ["ads", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/advertisementBySeller?email=${user.email}`
      );
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
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
          document.getElementById("my_modal_5").close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Advertisement requested!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          refetch();
        }
      }

      toast.success("Ad submitted successfully!");
    } catch (error) {
      console.error("Error during ad request:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10">
      <Helmet>
        <title>Ad Request</title>
      </Helmet>

      <div className="text-center">
        <button
          className="btn bg-purple-600 text-white my-10"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Request for Medicine Ads
        </button>
      </div>

      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_5").close()}
          >
            ✕
          </button>
          <h3 className="font-bold text-center text-lg mb-4">
            Request Advertisement
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 bg-purple-50 p-6 rounded"
          >
            <div>
              <label className="label text-sm font-semibold">
                Medicine Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="label text-sm font-semibold">Description</label>
              <input
                {...register("description", {
                  required: "Description is required",
                })}
                type="text"
                placeholder="Enter description"
                className="input input-bordered w-full"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="label text-sm font-semibold">Photo</label>
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
              {errors.image && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-purple-600 hover:bg-purple-700 text-white mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin text-lg" />
              ) : (
                "Submit Advertisement"
              )}
            </button>
          </form>
        </div>
      </dialog>

      {/* Advertisement List */}
      <SectionHeading heading="Your Ad Status" />

      <div className="overflow-x-auto shadow-sm mt-6 bg-white rounded-lg">
        <table className="table table-zebra">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, idx) => (
              <tr key={ad._id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={ad.image}
                    alt={ad.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td>{ad.name}</td>
                <td>{ad.description}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      ad.status === "requested"
                        ? "bg-yellow-100 text-yellow-700"
                        : ad.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No ad requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestAdvertise;
