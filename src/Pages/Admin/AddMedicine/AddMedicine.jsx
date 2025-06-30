import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useCategory from "../../../Hooks/useCategory";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import moment from "moment";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMedicine = () => {
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const [categories] = useCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
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
          generic_name: data.generic_name,
          short_description: data.short_description,
          image: res.data.data.display_url,
          company: data.company,
          mg: data.mg,
          unit_price: data.unit_price,
          discount: data.discount,
          categoryName: data.categoryName,
          sellerEmail: data.email,
          date: moment().format("MM/DD/YYYY"),
        };

        const medicineRes = await axiosSecure.post("/medicines", medicineItem);
        if (medicineRes.data.insertedId) {
          reset();
          navigate("/dashboard/manageMedicines");
          toast.success("Medicine added successfully");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Error adding medicine. Please try again later.");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Add Medicine</title>
      </Helmet>

      <div className="my-10">
        <SectionHeading heading="Add New Medicine" />
      </div>

      <div className="flex items-center justify-center text-center dark:text-gray-800">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="flex bg-purple-200 flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800"
        >
          <label htmlFor="name" className="self-start text-xs font-semibold">
            Medicine Name
          </label>
          <input
            {...register("name", { required: "Medicine Name is required" })}
            placeholder="Medicine Name"
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
            placeholder="Generic Name"
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
            placeholder="Short Description"
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
            Medicine Image
          </label>
          <input
            {...register("image", { required: "Image is required" })}
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
            {...register("company", { required: "Company is required" })}
            placeholder="Company Name"
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
              min: { value: 0, message: "Mg cannot be less than 0" },
            })}
            placeholder="Mg"
            id="mg"
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
              min: { value: 0, message: "Price cannot be less than 0" },
            })}
            placeholder="Unit Price"
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
              min: { value: 0, message: "Discount cannot be less than 0" },
            })}
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
            Admin Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Admin Email"
            id="email"
            type="email"
            className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
              errors.email && "border-red-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}

          <button
            type="submit"
            className="flex items-center justify-center h-12 px-6 mt-8 text-sm rounded btn font-bold bg-purple-600 text-white hover:bg-purple-700"
          >
            Add Medicine
          </button>
        </form>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-6">
        <Link to="/dashboard/manageMedicines">
          <button className="btn bg-gray-600 text-white hover:bg-gray-700">
            Back to Manage Medicines
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddMedicine;
