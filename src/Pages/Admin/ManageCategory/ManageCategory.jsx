import { FaEdit } from "react-icons/fa";
import UseMedicine from "../../../Hooks/UseMedicine";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import useCategory from "../../../Hooks/useCategory";
import toast from "react-hot-toast";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import LoadingSpinner from "../../../components/Shared/LoadinSpinner";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageCategory = () => {
  const [medicines, loading, refetch] = UseMedicine();
  const [categories] = useCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = UseAxiosSecure();
  const axiosPublic = UseAxiosPublic();

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

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const medicineItem = {
          name: data.name,
          short_description: data.short_description,
          generic_name: data.generic_name,
          image: res.data.data.display_url,
          company: data.company,
          mg: data.mg,
          unit_price: data.unit_price,
          discount: data.discount,
          categoryName: data.categoryName,
          sellerEmail: data.email,
        };

        console.log(medicineItem)

        const medicineRes = await axiosSecure.patch("/medicines", medicineItem);
        if (medicineRes.data.insertedId) {
          const modal = document.getElementById(`modal_${data.id}`);
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
        }
      }

      toast.success("Updated successfully");
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Error during Update. Please try again later.");
    }
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
                  <button
                    onClick={() =>
                      document
                        .getElementById(`modal_${medicine._id}`)
                        .showModal()
                    }
                  >
                    <FaEdit /> {medicine._id}
                  </button>

                  <dialog
                    id={`modal_${medicine._id}`}
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-center text-lg">
                        Update Medicine
                      </h3>

                      <div className="flex items-center justify-center text-center dark:text-gray-800">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          noValidate=""
                          action=""
                          className="flex bg-purple-200 flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800"
                        >
                          <input
                            {...register("id")}
                            type="hidden"
                            defaultValue={medicine._id}
                          />
                          <label
                            htmlFor="name"
                            className="self-start text-xs font-semibold"
                          >
                            Medicine Name
                          </label>
                          <input
                            {...register("name", {
                              required: "Medicine Name is required",
                            })}
                            placeholder={medicine.name}
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
                            htmlFor="generic_name"
                            className="self-start text-xs font-semibold"
                          >
                            Generic Name
                          </label>
                          <input
                            {...register("generic_name", {
                              required: "Generic Name is required",
                            })}
                            placeholder={medicine.generic_name}
                            id="generic_name"
                            type="text"
                            className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
                              errors.generic_name && "border-red-500"
                            }`}
                          />
                          {errors.generic_name && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.generic_name.message}
                            </p>
                          )}

                          <label
                            htmlFor="short_description"
                            className="self-start text-xs font-semibold"
                          >
                            Short Description
                          </label>
                          <input
                            {...register("short_description", {
                              required: "Short Description is required",
                            })}
                            placeholder={medicine.short_description}
                            id="short_description"
                            type="text"
                            className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
                              errors.short_description && "border-red-500"
                            }`}
                          />
                          {errors.short_description && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.short_description.message}
                            </p>
                          )}

                          <label
                            htmlFor="image"
                            className="self-start mt-3 text-xs font-semibold"
                          >
                            Change Photo
                          </label>
                          <input
                            {...register("image", {
                              required: "Image is required",
                            })}
                            accept="image/*"
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

                          <label
                            htmlFor="company"
                            className="self-start text-xs font-semibold"
                          >
                            Company
                          </label>
                          <input
                            {...register("company", {
                              required: "Company is required",
                            })}
                            placeholder={medicine.company}
                            id="company"
                            type="text"
                            className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
                              errors.company && "border-red-500"
                            }`}
                          />
                          {errors.company && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.company.message}
                            </p>
                          )}

                          <label
                            htmlFor="mg"
                            className="self-start text-xs font-semibold"
                          >
                            Mg
                          </label>
                          <input
                            {...register("mg", {
                              required: "Mg is required",
                              min: {
                                value: 0,
                                message: "Mg cannot be less than 0",
                              },
                            })}
                            id="mg"
                           placeholder={medicine.mg}
                            type="number"
                            className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
                              errors.mg && "border-red-500"
                            }`}
                          />
                          {errors.mg && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.mg.message}
                            </p>
                          )}

                          <label
                            htmlFor="unit_price"
                            className="self-start text-xs font-semibold"
                          >
                            Unit Price
                          </label>
                          <input
                            {...register("unit_price", {
                              required: "Price is required",
                              min: {
                                value: 0,
                                message: "Price cannot be less than 0",
                              },
                            })}
                            placeholder={medicine.unit_price}
                            id="unit_price"
                            type="number"
                            className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
                              errors.unit_price && "border-red-500"
                            }`}
                          />
                          {errors.unit_price && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.unit_price.message}
                            </p>
                          )}

                          <label
                            htmlFor="discount"
                            className="self-start text-xs font-semibold"
                          >
                            Discount
                          </label>
                          <select
                            {...register("discount", {
                              required: "Discount is required",
                              min: {
                                value: 0,
                                message: "Discount cannot be less than 0",
                              },
                            })}
                            placeholder={medicine.discount}
                            id="discount"
                            className={`block w-full p-2 mt-1 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                              errors.discount && "border-red-500"
                            }`}
                          >
                            <option value={0}>No Discount</option>
                            <option value={5}>5% Discount</option>
                            <option value={10}>10% Discount</option>
                            <option value={25}>25% Discount</option>
                            <option value={50}>50% Discount</option>
                          </select>
                          {errors.discount && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.discount.message}
                            </p>
                          )}

                          <label
                            htmlFor="categoryName"
                            className="self-start text-xs font-semibold"
                          >
                            Category Name
                          </label>
                          <select
                            {...register("categoryName", {
                              required: "Category Name is required",
                            })}
                            id="categoryName"
                            placeholder={medicine.categoryName}
                            className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
                              errors.categoryName && "border-red-500"
                            }`}
                          >
                            <option value="" disabled>
                              Select Category Name
                            </option>
                            {categories.map((category, index) => (
                              <option key={index} value={category.categoryName}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                          {errors.categoryName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.categoryName.message}
                            </p>
                          )}

                          <label
                            htmlFor="email"
                            className="self-start text-xs font-semibold"
                          >
                            Email
                          </label>
                          <input
                            {...register("email")}
                            placeholder={medicine.sellerEmail}
                            id="email"
                            type="email"
                            className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600"
                          />

                          <button
                            type="submit"
                            
                            className="flex items-center justify-center h-12 px-6 mt-8 text-sm  rounded btn font-bold "
                          >
                            Update Info
                          </button>
                        </form>
                      </div>

                      <div className="modal-action"></div>
                    </div>
                  </dialog>
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
