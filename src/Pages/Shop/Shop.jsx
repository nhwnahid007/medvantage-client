import { useState } from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import useCart from "../../Hooks/useCart";
import { RiDiscountPercentLine } from "react-icons/ri";
import UseMedicine from "../../Hooks/UseMedicine";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Items per page
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = UseAxiosSecure();
  const [, refetch] = useCart();
  const [quantities, setQuantities] = useState({});
  const [medicine] = UseMedicine();

  const { data: count = "" } = useQuery({
    queryKey: ["count", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/medicinesCount");
      return data.count;
    },
  });

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search input change
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1); // Reset to first page on sort change
  };

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

  // Filter and sort the medicines using searchQuery (no need for extra searchTerm state)
  const filteredMedicine = medicine.filter(
    (medicineData) =>
      (medicineData.name &&
        medicineData.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (medicineData.company &&
        medicineData.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (medicineData.generic_name &&
        medicineData.generic_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedMedicine = [...filteredMedicine].sort((a, b) => {
    if (sortBy === "priceLowToHigh") {
      return a.unit_price - b.unit_price;
    } else if (sortBy === "priceHighToLow") {
      return b.unit_price - a.unit_price;
    }
    return 0;
  });

  // Pagination: Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedMedicine.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination: handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10">
      <Helmet>
        <title>Shop</title>
      </Helmet>

      <SectionHeading heading={"All Medicines"} />

      {/* Search + Sort Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search medicine..."
            className="input input-bordered w-full md:w-auto"
          />
          {/* Search button removed because search happens instantly */}
        </div>
        <div>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="select select-bordered bg-purple-100"
          >
            <option value="default">Sort By: Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Medicine Table */}
      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra w-full">
          <thead className="bg-purple-50 text-sm text-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Details</th>
              <th>Add</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length ? (
              currentItems.map((medicineData, index) => {
                const qty = quantities[medicineData._id] || 0;
                return (
                  <tr key={medicineData._id}>
                    <td>{index + 1 + indexOfFirstItem}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 mask mask-squircle">
                            <img
                              src={medicineData.image}
                              alt={medicineData.name}
                            />
                          </div>
                        </div>
                        <div className="font-bold">{medicineData.name}</div>
                      </div>
                    </td>
                    <td className="space-y-1 text-sm">
                      {medicineData.discount > 0 ? (
                        <>
                          <div className="text-gray-500 line-through text-xs">
                            ${parseFloat(medicineData.unit_price).toFixed(2)}
                          </div>
                          <div className="text-lg font-semibold text-green-600">
                            $
                            {(
                              medicineData.unit_price *
                              (1 - medicineData.discount / 100)
                            ).toFixed(2)}
                          </div>
                          <div className="badge bg-purple-100 text-purple-800 font-medium text-xs">
                            <RiDiscountPercentLine className="mr-1" />
                            {medicineData.discount}% Off
                          </div>
                        </>
                      ) : (
                        <div className="text-lg font-semibold text-gray-700">
                          ${parseFloat(medicineData.unit_price).toFixed(2)}
                        </div>
                      )}
                    </td>

                    <td>
                      <button
                        className="btn btn-ghost"
                        onClick={() =>
                          document
                            .getElementById(`${medicineData._id}`)
                            .showModal()
                        }
                      >
                        <FaEye />
                      </button>

                      {/* Modal */}
                      {/* Modal */}
<dialog id={medicineData._id} className="modal">
  <div className="modal-box max-w-3xl p-6 relative rounded-xl shadow-lg bg-white">
    {/* Close icon top-right */}
    <button
      onClick={() => document.getElementById(medicineData._id).close()}
      className="btn btn-sm btn-circle absolute right-4 top-4 hover:bg-gray-200"
      aria-label="Close"
    >
      ✕
    </button>

    <h3 className="text-2xl font-semibold mb-6 border-b pb-3">{medicineData.name}</h3>

    <div className="flex flex-col md:flex-row gap-8">
      {/* Image */}
      <div className="flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm w-48 h-48">
        <img
          src={medicineData.image}
          alt={medicineData.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 space-y-4 text-gray-800">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Price:</span>
          <span className="text-lg font-bold text-green-700">
            ${parseFloat(medicineData.unit_price).toFixed(2)}
          </span>
        </div>

        {medicineData.discount > 0 && (
          <div className="flex justify-between items-center text-purple-700 font-semibold">
            <span>Discount:</span>
            <span>{medicineData.discount}% Off</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="font-semibold">Generic Name:</span>
          <span>{medicineData.generic_name}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Company:</span>
          <span>{medicineData.company}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Mg:</span>
          <span>{medicineData.mg} mg</span>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Description:</h4>
          <p className="text-gray-600 leading-relaxed">{medicineData.short_description}</p>
        </div>
      </div>
    </div>

    {/* Modal Actions */}
    <div className="modal-action mt-6">
      <form method="dialog">
        <button className="btn bg-[#7600dc] text-white hover:bg-[#5a009e] transition-colors duration-300">
          Close
        </button>
      </form>
    </div>
  </div>
</dialog>

                    </td>
                    <td>
                      <button
                        onClick={() => handleAddToCart(medicineData, qty)}
                        className="btn btn-outline border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                      >
                        Add to Cart
                      </button>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(medicineData._id)
                          }
                          className="btn btn-sm btn-outline"
                        >
                          −
                        </button>
                        <span className="font-semibold">{qty}</span>
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(medicineData._id)
                          }
                          className="btn btn-sm btn-outline"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-600">
                  No medicines found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 flex-wrap gap-2">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber + 1)}
            className={`btn px-4 ${
              currentPage === pageNumber + 1
                ? "bg-[#7600dc] text-white"
                : "btn-outline"
            }`}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shop;
