import { useLocation, useNavigate, useParams } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaDollarSign, FaEye } from "react-icons/fa";
import { BsFileEarmarkMedical } from "react-icons/bs";
import { MdOutlineFactory } from "react-icons/md";
import { CiMedicalCross } from "react-icons/ci";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import useCart from "../../Hooks/useCart";
import { useState } from "react";
import { RiDiscountPercentLine } from "react-icons/ri";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import MedicineDetailsModal from "../../components/Shared/MedicineDetailsModal";

const CategoryDetails = () => {
  const axiosPublic = UseAxiosPublic();
  const { categoryName } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = UseAxiosSecure();
  const [, refetch] = useCart();
  const [quantities, setQuantities] = useState({});

  const { data: categoryDetail = [] } = useQuery({
    queryKey: ["categoryDetail", categoryName],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/medicineByCategory?categoryName=${categoryName}`
      );
      return res.data;
    },
  });

  const handleAddToCart = async (medicine, quantity) => {
    if (user && user?.email) {
      const cartItem = {
        medicineId: medicine._id,
        buyerEmail: user?.email,
        name: medicine.name,
        image: medicine.image,
        price: medicine.unit_price,
        discount: medicine.discount,
        quantity: quantity || 1,
        sellerEmail: medicine.sellerEmail,
      };

      try {
        const response = await axiosSecure.post("/carts", cartItem);
        if (response.data.insertedId) {
          toast.success(`${medicine.name} added to your cart successfully`);
          refetch();
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      Swal.fire({
        title: "You are not logged In",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Please Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  const handleIncreaseQuantity = (medicineId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [medicineId]: (prevQuantities[medicineId] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (medicineId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [medicineId]: Math.max((prevQuantities[medicineId] || 0) - 1, 0),
    }));
  };

  return (
    <div>
      <Helmet>
        <title>By category</title>
      </Helmet>
      <SectionHeading heading={categoryName}></SectionHeading>
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
              <th>Price</th>

              <th>Details</th>
              <th>Add To Cart</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {categoryDetail.map((categoryDetailData, index) => (
              <tr key={categoryDetailData._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={categoryDetailData.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{categoryDetailData.name}</div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">
                  {categoryDetailData.unit_price}$
                  <br />
                  <span className="badge bg-purple-300 font-semibold badge-ghost badge-sm">
                    <RiDiscountPercentLine />
                    <span className="text-gray-700 font-bold">
                      {categoryDetailData.discount}%
                    </span>
                  </span>
                </td>

                <td>
                  <MedicineDetailsModal medicine={categoryDetailData} />
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        categoryDetailData,
                        quantities[categoryDetailData._id]
                      )
                    }
                    className="btn btn-outline border-0 border-b-4 text-[#7600dc]"
                  >
                    Add to Cart
                  </button>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleDecreaseQuantity(categoryDetailData._id)
                      }
                      className="btn btn-sm btn-outline text-[#7600dc]"
                    >
                      -
                    </button>
                    <span>{quantities[categoryDetailData._id] || 0}</span>
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(categoryDetailData._id)
                      }
                      className="btn btn-sm btn-outline text-[#7600dc]"
                    >
                      +
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

export default CategoryDetails;
