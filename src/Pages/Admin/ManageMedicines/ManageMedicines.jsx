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

  // Calculate statistics
  const totalMedicines = medicines?.length || 0;
  const uniqueCategories = new Set(
    medicines?.map((medicine) => medicine.categoryName)
  ).size;
  const uniqueSellers = new Set(
    medicines?.map((medicine) => medicine.sellerEmail)
  ).size;

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Manage Medicines</title>
      </Helmet>

      <div className="my-10">
        <SectionHeading heading="Manage All Medicines" />

        {/* Responsive Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Medicines
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalMedicines}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-green-600">
                  {uniqueCategories}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Sellers
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {uniqueSellers}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link to="/dashboard/addMedicine">
            <button className="btn bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto">
              Add New Medicine
            </button>
          </Link>
          <Link to="/dashboard/manageCategory">
            <button className="btn bg-purple-600 text-white hover:bg-purple-700 w-full sm:w-auto">
              Manage Categories
            </button>
          </Link>
        </div>
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
