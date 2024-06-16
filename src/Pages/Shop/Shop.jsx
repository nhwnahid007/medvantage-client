import { useState } from "react";
import { FaDollarSign, FaEye } from "react-icons/fa";
import { BsFileEarmarkMedical } from "react-icons/bs";
import { MdOutlineFactory } from "react-icons/md";
import { CiMedicalCross } from "react-icons/ci";
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

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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

  const { data: count = "", } = useQuery({
    queryKey: ["count", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/medicinesCount');
      return data.count;
    },
  });
  console.log(count)

  const numberOfPages = Math.ceil(count / itemsPerPage);
  console.log(numberOfPages)

  const pages = [...Array(numberOfPages).keys()];

  console.log(pages)

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchTerm(searchQuery);
    setCurrentPage(1); // Reset to the first page when a new search is performed
  };

  const handleSortChange = event => {
    setSortBy(event.target.value);
    setCurrentPage(1); // Reset to the first page when the sort order is changed
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
        const response = await axiosSecure.post('/carts', cartItem);
        if (response.data.insertedId) {
          toast.success(`${medicine.name} added to your cart successfully`);
          refetch();
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    } else {
      Swal.fire({
        title: "You are not logged In",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Please Login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } })
        }
      });
    }
  }

  const handleIncreaseQuantity = (medicineId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [medicineId]: (prevQuantities[medicineId] || 0) + 1
    }));
  };

  const handleDecreaseQuantity = (medicineId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [medicineId]: Math.max((prevQuantities[medicineId] || 0) - 1, 0)
    }));
  };

  // Filter and sort the medicines
  const filteredMedicine = medicine.filter(medicineData =>
    (medicineData.name && medicineData.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (medicineData.company && medicineData.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (medicineData.generic_name && medicineData.generic_name.toLowerCase().includes(searchTerm.toLowerCase()))
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
    <div>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <div className="my-10"><SectionHeading heading={"All medicines"}></SectionHeading></div>
    <div className="md:flex gap-3 space-y-4 md:space-y-0">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search medicine..."
            value={searchQuery}
            onChange={handleSearch}
            className="input input-bordered"
          />
          <button onClick={handleSearchButtonClick} className="btn bg-[#7600dc] text-white">
            Search
          </button>
        </div>
        <div className="mx-auto">
          <select className=" mx-auto bg-purple-100 p-3 rounded-md" value={sortBy} onChange={handleSortChange}>
          <option value="default">Sort By Default</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
        </div>
    </div>
      
      <div className="overflow-x-auto my-10">
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
            {currentItems.map((medicineData, index) => (
              <tr key={medicineData._id}>
                <th>{index + 1 + indexOfFirstItem}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={medicineData.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{medicineData.name}</div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">
                  {medicineData.unit_price}$
                  <br />
                  <span className="badge text-gray-800 font-bold bg-purple-300 badge-ghost badge-sm">
                    <RiDiscountPercentLine /> {medicineData.discount}%
                  </span>
                </td>
                <td>
                  <button
                    className=""
                    onClick={() =>
                      document.getElementById(`${medicineData._id}`).showModal()
                    }
                  >
                    <FaEye></FaEye>
                  </button>
                  <dialog id={`${medicineData._id}`} className="modal">
                    <div className="modal-box">
                      <div className="card  bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                          <img
                            src={medicineData.image}
                            alt="Shoes"
                            className="rounded-xl"
                          />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">{medicineData.name}</h2>
                          <div className="">
                            <div className="flex gap-1 items-center">
                              <FaDollarSign></FaDollarSign>{" "}
                              <span>
                                <strong>Price:</strong>{" "}
                                {medicineData.unit_price}
                              </span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <FaDollarSign></FaDollarSign>{" "}
                              <span>
                                <strong>Discount :</strong>{" "}
                                {medicineData.discount} %
                              </span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <FaDollarSign></FaDollarSign>{" "}
                              <span>
                                <strong>Generic Name:</strong>{" "}
                                {medicineData.generic_name}
                              </span>
                            </div>

                            <div className="flex gap-1 items-center text-left ">
                              <BsFileEarmarkMedical />{" "}
                              <p>
                                <span className="font-semibold mr-1">
                                  <strong>Description:</strong>{" "}
                                </span>
                                {medicineData.short_description}{" "}
                              </p>
                            </div>
                            <div className="flex gap-1 items-center">
                              <MdOutlineFactory />{" "}
                              <span>
                                <strong>Company Name:</strong>{" "}
                                {medicineData.company}
                              </span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <CiMedicalCross />
                              <span>
                                <strong>Mg:</strong> {medicineData.mg}
                                <small>mg</small>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn text-white font-bold bg-[#7600dc]">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
                <td>
                  <button onClick={() => handleAddToCart(medicineData, quantities[medicineData._id])} className="btn btn-outline border-0  border-b-4 text-[#7600dc]">
                    Add to Cart
                  </button>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDecreaseQuantity(medicineData._id)} className="btn btn-sm btn-outline text-[#7600dc]">-</button>
                    <span>{quantities[medicineData._id] || 0}</span>
                    <button onClick={() => handleIncreaseQuantity(medicineData._id)} className="btn btn-sm btn-outline text-[#7600dc]">+</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination flex justify-center items-center mt-10">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber + 1)}
            className={`btn mx-1 ${currentPage === pageNumber + 1 ? "btn-active bg-purple-600" : ""}`}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shop;
