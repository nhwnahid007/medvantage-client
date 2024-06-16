import { useNavigate, useParams } from "react-router-dom";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useCategory from "../../../Hooks/useCategory";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMedicines = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const axiosPublic = UseAxiosPublic();
  const [categories]= useCategory()

  const axiosSecure = UseAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm();



  const { data: updateMedicine = {}, isLoading, isError, error } = useQuery({
    queryKey: ['updateMedicine', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/medicine/${id}`);
      return res.data;
    },
    enabled: !!id, // Ensure the query runs only if `id` exists
  });

  console.log(updateMedicine)


  const onSubmit = async (data) => {
    try {
      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res)

      if (res.data.success) {
        const medicineItem = {
          name: data.name,
          short_description: data.short_description,
          generic_name:data.generic_name,
          image: res.data.data.display_url,
          company: data.company,
          mg: data.mg,
          unit_price: data.unit_price,
          discount: data.discount,
          categoryName: data.categoryName,
          sellerEmail: data.email,
        };

        console.log(medicineItem)

        const medicineRes = await axiosSecure.patch(`/medicine/${id}`, medicineItem);
        console.log(medicineRes.data)
        if (medicineRes.data.modifiedCount>0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} updated successfully`,
            showConfirmButton: false,
            timer: 1500,
          });

          navigate('/dashboard/manageCategory')
          toast.success("Updated successfully");
        } else {
          throw new Error("Update failed");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Error during Update. Please try again later.");
    }
  };






  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>

<Helmet>
        <title>Update Medicine</title>
      </Helmet>


         <div>

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
            defaultValue={updateMedicine._id}
          />
          <label htmlFor="name" className="self-start text-xs font-semibold">
            Medicine Name
          </label>
          <input
            {...register("name", {
              required: "Medicine Name is required",
            })}
            defaultValue={updateMedicine.name}
            id="name"
            type="text"
            className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
              errors.name && "border-red-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
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
            defaultValue={updateMedicine.generic_name}
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
            defaultValue={updateMedicine.short_description}
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
            <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
          )}

          <label htmlFor="company" className="self-start text-xs font-semibold">
            Company
          </label>
          <input
            {...register("company", {
              required: "Company is required",
            })}
            defaultValue={updateMedicine.company}
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

          <label htmlFor="mg" className="self-start text-xs font-semibold">
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
            defaultValue={updateMedicine.mg}
            type="number"
            className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
              errors.mg && "border-red-500"
            }`}
          />
          {errors.mg && (
            <p className="text-red-500 text-xs mt-1">{errors.mg.message}</p>
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
            defaultValue={updateMedicine.unit_price}
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
            defaultValue={updateMedicine.discount}
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
            defaultValue={updateMedicine.categoryName}
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

          <label htmlFor="email" className="self-start text-xs font-semibold">
            Email
          </label>
          <input
            {...register("email")}
            defaultValue={updateMedicine.sellerEmail}
            readOnly
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
    </div>
    </div>
  );
};

export default UpdateMedicines;
