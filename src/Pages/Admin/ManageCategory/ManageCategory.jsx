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

const ManageCategory = () => {
  const [medicines, loading, refetch] = UseMedicine();
  const axiosSecure = UseAxiosSecure();

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
            Swal.fire("Deleted!", "The medicine has been deleted.", "success");
          }
        });
      }
    });
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();
    const form = event.target;
    const categoryName = form.name.value;
    const image = form.image.value;
    const categoryInfo = { categoryName, image };

    try {
      const response = await axiosSecure.post("categories", categoryInfo);
      if (response.data.insertedId) {
        toast.success("Category added successfully!");
        form.reset();
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Manage Medicines</title>
      </Helmet>

      <div className="my-10">
        <SectionHeading heading="Manage Categories" />
      </div>

      {/* Add Category Button */}
      <div className="flex justify-center mb-6">
        <button
          className="btn bg-purple-600 text-white hover:bg-purple-700"
          onClick={() => document.getElementById("category_modal").showModal()}
        >
          Add Category
        </button>
      </div>

      {/* Modal */}
      <dialog id="category_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Add New Category</h3>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Category Name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                name="image"
                type="text"
                placeholder="Image URL"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <button type="submit" className="btn bg-purple-700 text-white w-full">
                Add Category
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="table w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Mg</th>
              <th className="p-4">Update</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
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
                <td className="p-4">{medicine.mg} <small>mg</small></td>
                <td className="p-4 text-blue-600 hover:text-blue-800">
                  <Link to={`/dashboard/updateMedicine/${medicine._id}`}>
                    <FaEdit />
                  </Link>
                </td>
                <td className="p-4 text-red-600 hover:text-red-800">
                  <button onClick={() => handleDeleteMedicine(medicine._id)}>
                    <MdDeleteForever size={22} />
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

export default ManageCategory;
