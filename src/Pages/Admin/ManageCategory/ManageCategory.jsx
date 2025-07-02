import { FaEdit } from "react-icons/fa";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useCategory from "../../../Hooks/useCategory";
import { useState } from "react";
import { Link } from "react-router-dom";

const ManageCategory = () => {
  const [categories, refetch] = useCategory();
  const axiosSecure = UseAxiosSecure();
  const [editingCategory, setEditingCategory] = useState(null);

  const handleDeleteCategory = (categoryId) => {
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
        axiosSecure.delete(`/categories/${categoryId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success("Category deleted successfully!");
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
        refetch();
        document.getElementById("category_modal").close();
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category.");
    }
  };

  const handleEditCategory = async (event) => {
    event.preventDefault();
    const form = event.target;
    const categoryName = form.name.value;
    const image = form.image.value;
    const categoryInfo = { categoryName, image };

    try {
      const response = await axiosSecure.patch(
        `/categories/${editingCategory._id}`,
        categoryInfo
      );
      if (response.data.modifiedCount > 0) {
        toast.success("Category updated successfully!");
        form.reset();
        refetch();
        setEditingCategory(null);
        document.getElementById("edit_category_modal").close();
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category.");
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    document.getElementById("edit_category_modal").showModal();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Manage Categories</title>
      </Helmet>

      <div className="my-10">
        <SectionHeading heading="Manage Categories" />

        {/* Responsive Statistics Section */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-xl border border-blue-200 max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm pr-1 font-semibold text-blue-700 uppercase tracking-wide">
                  Total Categories
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  {categories?.length || 0}
                </p>
                
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
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
            <div className="mt-4 pt-4 border-t border-blue-200">
              <div className="flex items-center justify-between text-xs text-blue-600">
                <span>Last updated</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button
            className="btn bg-purple-600 text-white hover:bg-purple-700 w-full sm:w-auto"
            onClick={() =>
              document.getElementById("category_modal").showModal()
            }
          >
            Add Category
          </button>
          <Link to="/dashboard/addMedicine">
            <button className="btn bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto">
              Add Medicine
            </button>
          </Link>
          <Link to="/dashboard/manageMedicines">
            <button className="btn bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
              Manage Medicines
            </button>
          </Link>
        </div>
      </div>

      {/* Add Category Modal */}
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
              <button
                type="submit"
                className="btn bg-purple-700 text-white w-full"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Edit Category Modal */}
      <dialog id="edit_category_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Edit Category</h3>
          {editingCategory && (
            <form onSubmit={handleEditCategory} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Category Name"
                  className="input input-bordered w-full"
                  defaultValue={editingCategory.categoryName}
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
                  defaultValue={editingCategory.image}
                  required
                />
              </div>
              <div className="form-control">
                <button
                  type="submit"
                  className="btn bg-purple-700 text-white w-full"
                >
                  Update Category
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>

      {/* Categories Table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="table w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Image</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 font-medium">{index + 1}</td>
                <td className="p-4">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={category.image} alt={category.categoryName} />
                    </div>
                  </div>
                </td>
                <td className="p-4 font-semibold">{category.categoryName}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
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

export default ManageCategory;
