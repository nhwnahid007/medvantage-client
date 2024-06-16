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
confirmButtonColor: "#3085d6",
cancelButtonColor: "#d33",
confirmButtonText: "Yes, delete it!",
}).then((result) => {
if (result.isConfirmed) {
axiosSecure.delete(`/medicine/${_id}`).then((res) => {
if (res.data.deletedCount > 0) {
  refetch();
  Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success",
  });
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
console.log(categoryName, image);
const categoryInfo = { categoryName, image };

try {
const response = await axiosSecure.post("categories", categoryInfo);
console.log("Category added successfully:", response.data);
if (response.data.insertedId) {
toast.success("Added Category");
// Reset input fields
form.name.value = "";
form.image.value = "";
}
// Handle UI updates or other actions here
} catch (error) {
console.error("Error adding category:", error);
// Handle error UI or other actions here
}
};

if (loading) {
return <LoadingSpinner />;
}

return (
<div>
<div className="mt-10">
<Helmet>
        <title>Manage Medicines
        </title>
      </Helmet>
<SectionHeading heading={"Manage Categories"} />
</div>

{/* You can open the modal using document.getElementById('ID').showModal() method */}
<div className="flex items-center justify-center my-10">
<button
className="btn mx-auto text-white bg-purple-600"
onClick={() => document.getElementById("my_modal_3").showModal()}
>
Add Category
</button>
</div>
<dialog id="my_modal_3" className="modal">
<div className="modal-box">
<form method="dialog">
  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
    ✕
  </button>
</form>

<form className="card-body" onSubmit={handleAddCategory}>
  <div className="form-control">
    <label className="label">
      <span className="label-text">Category Name</span>
    </label>
    <input
      name="name"
      type="text"
      placeholder="Category Name"
      className="input input-bordered"
      required
    />
  </div>

  <div className="form-control">
    <label className="label">
      <span className="label-text">Image Url</span>
    </label>
    <input
      name="image"
      type="text"
      placeholder="Category Image"
      className="input input-bordered"
      required
    />
  </div>

  <div className="form-control mt-6">
    <button className="btn bg-purple-700">Add Category</button>
  </div>
</form>
</div>
</dialog>

<div className="overflow-x-auto">
<table className="table">
<thead>
  <tr>
    <th>
      <label>
        <input type="checkbox" className="checkbox" />
      </label>
    </th>
    <th>Name</th>
    <th>Category</th>
    <th>Mg</th>
    <th>Update</th>
    <th>Delete</th>
  </tr>
</thead>
<tbody>
  {medicines.map((medicine, index) => (
    <tr key={medicine._id}>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={medicine.image}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{medicine.name}</div>
          </div>
        </div>
      </td>
      <td>{medicine.categoryName}</td>
      <td>
        {medicine.mg}
        <small>mg</small>{" "}
      </td>
      <td>

        <Link to={`/dashboard/updateMedicine/${medicine._id}`}>
        <FaEdit />
        </Link>
        

      </td>
      <td>
        <button onClick={() => handleDeleteMedicine(medicine._id)}>
          <MdDeleteForever className="text-2xl text-red-600" />
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
