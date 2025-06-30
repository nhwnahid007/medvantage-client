import { FaEdit } from "react-icons/fa";
import UseMedicine from "../../../Hooks/UseMedicine";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadinSpinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMemo } from "react";

const ManageMedicines = () => {
  const [medicines, loading, refetch] = UseMedicine();
  const axiosSecure = UseAxiosSecure();

  // Sort medicines by date (latest first)
  const sortedMedicines = useMemo(() => {
    if (!medicines || medicines.length === 0) return [];
    
    return [...medicines].sort((a, b) => {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // Descending order (latest first)
    });
  }, [medicines]);

  const handleDeleteMedicine = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7600dc",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/medicine/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success("Medicine deleted successfully!");
          }
        });
      }
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Manage Medicines</title>
      </Helmet>

      <div className="my-10">
        <SectionHeading heading="Manage All Medicines" />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <Link to="/dashboard/addMedicine">
          <button className="btn bg-green-600 text-white hover:bg-green-700">
            Add New Medicine
          </button>
        </Link>
        <Link to="/dashboard/manageCategory">
          <button className="btn bg-purple-600 text-white hover:bg-purple-700">
            Manage Categories
          </button>
        </Link>
      </div>

      {/* Medicines Table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="table w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Mg</th>
              <th className="p-4">Price</th>
              <th className="p-4">Seller</th>
              <th className="p-4">Date Added</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedMedicines.map((medicine, index) => (
              <tr
                key={medicine._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 font-medium">{index + 1}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={medicine.image} alt={medicine.name} />
                      </div>
                    </div>
                    <div className="font-semibold">{medicine.name}</div>
                  </div>
                </td>
                <td className="p-4">{medicine.categoryName}</td>
                <td className="p-4">
                  {medicine.mg} <small>mg</small>
                </td>
                <td className="p-4">${medicine.unit_price}</td>
                <td className="p-4 text-sm">{medicine.sellerEmail}</td>
                <td className="p-4 text-sm text-gray-600">
                  {medicine.date || "N/A"}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link to={`/dashboard/updateMedicine/${medicine._id}`}>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit size={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteMedicine(medicine._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDeleteForever size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMedicines;
