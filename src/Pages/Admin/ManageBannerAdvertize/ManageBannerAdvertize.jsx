import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const ManageBannerAdvertize = () => {
  const axiosSecure = UseAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {refetch, data: ads = [] } = useQuery({
    queryKey: ["ad"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisedment");
      return res.data;
    },
  });

  console.log(ads);

  const toggleSlide = async (_id, status) => {
    setLoading(true);
    try {
      if (status === 'requested') {
        await axiosSecure.patch(`/advertisement/${_id}`, { status: 'accepted' });
      } else if (status === 'accepted') {
        await axiosSecure.delete(`/advertisement/${_id}`);
      }
      // Refetch the advertisement data after toggling the slide
      await refetch();
    } catch (error) {
      console.error('Error toggling slide:', error);
    }
    setLoading(false);
  };



  return (
    <div>
      <div className="my-10">
        {" "}
        <Helmet>
        <title>Manage Banner
        </title>
      </Helmet>
        <SectionHeading heading={"Manage Ads"}></SectionHeading>
      </div>
      

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
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
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
                <td>
                <button 
    onClick={() => toggleSlide(ad._id, ad.status)} 
    disabled={loading}
    className={`${
        ad.status === 'requested' ? 'bg-orange-400 rounded-lg p-3 font-semibold' : 
        ad.status === 'accepted' ? 'bg-green-500 rounded-lg p-3 font-semibold' : 
        ''
    }`}
>
    {loading ? <FaSpinner className="animate-spin"></FaSpinner> : ad.status === 'requested' ? 'Add to Slide' : 'Remove from Slide'}
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
