import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import SectionHeading from "../../../../components/SectionHeading/SectionHeading";
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
console.log(image_hosting_api);

const ManageMedicines = () => {
  const { user } = useAuth();
  console.log(user?.email);
  const axiosSecure = UseAxiosSecure();
  const axiosPublic = UseAxiosPublic();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //medicine data by seller

  const {
    data: medicines = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["medicines", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosSecure.get(
        `/medicines/seller?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(medicines);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching medicines</div>;
  }

  //form




  const onSubmit = async (data) => {
    try {
      console.log(data);

    const imageFile = {image:data.image[0]}

      const res = await axiosPublic.post(image_hosting_api,imageFile , {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image upload response:", res.data);

      if(res.data.success){
        //now send the data 

        const medicineItem ={
            name: data.name,
            short_description:data.short_description,
            image:res.data.data.
            display_url,
            company:data.company,
            mg:data.mg,
            unit_price:data.unit_price,
            discount:data.discount,
            categoryName:data.categoryName,
            email:data.email,

        }
        console.log(medicineItem)

        const medicineRes = await axiosSecure.post('/medicines',medicineItem)
        console.log(medicineRes.data)
        if(medicineRes.data.insertedId){
            //show sucess
            toast.success('data added successfully')
            reset()
        }

      }

      console.log('with image url',res.data)
    //   const photoUrl = res.data.data.display_url;
    //   console.log(photoUrl)

      toast.success("Added successfully");
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Error during Update. Please try again later.");
    }
  };

  return (
    <div className="">
      <div className="mt-10">
        <SectionHeading heading={"Seller Medicines"}></SectionHeading>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Add new Medicine
        </button>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-center text-lg">Add medicine Here</h3>

          <div className="flex items-center justify-center text-center  dark:text-gray-800">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate=""
              action=""
              className="flex bg-purple-200 flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800"
            >
              <label
                htmlFor="name"
                className="self-start text-xs font-semibold"
              >
                Add medicine Name
              </label>
              <input
                {...register("name", { required: "Medicine Name is required" })}
                placeholder="Medicine Name"
                id="name"
                type="text"
                className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
                  errors.name && "border-red-500" // Add red border if there's an error
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
                Add medicine generic_name
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
                Add medicine short_description
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
                Change Photo
              </label>
              <input
                {...register("image", { required: "Image is required" })}
                accept="image/*"
                placeholder="Image"
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
                Add medicine Company
              </label>
              <input
                {...register("company", { required: "Company is required" })}
                placeholder="Company"
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
                Add medicine Mg
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
                Add Unit Price
              </label>
              <input
                {...register("unit_price", {
                  required: "Price is required",
                  min: {
                    value: 0,
                    message: "Price cannot be less than 0",
                  },
                })}
                placeholder="Price"
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
                Add Discount
              </label>
              <select
                {...register("discount", {
                  required: "Discount is required",
                  min: {
                    value: 0,
                    message: "Discount cannot be less than 0",
                  },
                })}
                defaultValue={0}
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
                Add Category Name
              </label>
              <input
                {...register("categoryName", {
                  required: "Category Name is required",
                })}
                placeholder="Category Name"
                id="categoryName"
                type="text"
                className={`flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600 ${
                  errors.categoryName && "border-red-500"
                }`}
              />
              {errors.categoryName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.categoryName.message}
                </p>
              )}

              <label
                htmlFor="email"
                className="self-start text-xs font-semibold"
              >
                Add Email
              </label>
              <input
                {...register("email")}
                defaultValue={user?.email}
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

          <div className="modal-action"></div>
        </div>
      </dialog>

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
              <th>Name</th>
              <th>Category</th>
              <th>Mg</th>
              <th>Company</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

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
                <td>{medicine.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMedicines;
