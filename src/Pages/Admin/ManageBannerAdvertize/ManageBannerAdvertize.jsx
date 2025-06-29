import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const ManageBannerAdvertize = () => {
  const axiosSecure = UseAxiosSecure();
  const [loading, setLoading] = useState(false);

  const { refetch, data: ads = [] } = useQuery({
    queryKey: ["ad"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisedment");
      return res.data;
    },
  });

  const toggleSlide = async (_id, status) => {
    setLoading(true);
    try {
      if (status === "requested") {
        await axiosSecure.patch(`/advertisement/${_id}`, {
          status: "accepted",
        });
      } else if (status === "accepted") {
        await axiosSecure.delete(`/advertisement/${_id}`);
      }
      await refetch();
    } catch (error) {
      console.error("Error toggling slide:", error);
    }
    setLoading(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 ">
      <Helmet>
        <title>Manage Banner</title>
      </Helmet>

      <div className="my-10">
        <SectionHeading heading={"Manage Ads"} />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="table w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-4">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={ad.image} alt="Ad Image" />
                    </div>
                  </div>
                </td>
                <td className="p-4 font-medium">{ad.name}</td>
                <td className="p-4">{ad.description}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      ad.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => toggleSlide(ad._id, ad.status)}
                    disabled={loading}
                    className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-md transition duration-300 ${
                      ad.status === "requested"
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-red-600 hover:bg-red-700"
                    } ${loading ? "cursor-wait opacity-70" : ""}`}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" /> Processing
                      </>
                    ) : ad.status === "requested" ? (
                      "Add to Slide"
                    ) : (
                      "Remove from Slide"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBannerAdvertize;
