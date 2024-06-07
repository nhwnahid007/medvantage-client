import { FaDollarSign, FaEye } from "react-icons/fa";
import UseMedicine from "../../Hooks/UseMedicine";
import { BsFileEarmarkMedical } from "react-icons/bs";
import { MdOutlineFactory } from "react-icons/md";
import { CiMedicalCross } from "react-icons/ci";
import SectionHeading from "../../components/SectionHeading/SectionHeading";


const Shop = () => {
    const [medicine] = UseMedicine()
    console.log(medicine)
    return (
        <div>
                  
                  <SectionHeading heading={'All medicines'}></SectionHeading>
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
              <th>Price</th>
              <th>Company</th>
              <th>mg</th>
              <th>Show Details</th>
            </tr>
          </thead>
          <tbody>
            {medicine.map((medicineData, index) => (
              <tr key={medicineData._id}>
                <th>{index + 1}</th>
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
                      <div className="text-sm opacity-50">
                        {medicineData.generic_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">
                  {medicineData.unit_price}$
                  <br />
                  <span className="badge bg-purple-300 font-semibold badge-ghost badge-sm">
                    {medicineData.discount}% Discounted
                  </span>
                </td>
                <td>{medicineData.company}</td>
                <td>
                  <span className="font-semibold">
                    {medicineData.mg}{" "}
                  </span>
                  <small>mg</small>
                </td>
                <td>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className=""
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <FaEye></FaEye>
                  </button>
                  <dialog id="my_modal_1" className="modal">
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
                          <h2 className="card-title">
                            {medicineData.name}
                          </h2>
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
                                {medicineData.unit_price} %
                              </span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <FaDollarSign></FaDollarSign>{" "}
                              <span>
                                <strong>Generic Name:</strong>{" "}
                                {medicineData.generic_name}
                              </span>
                            </div>

                            <div className="flex gap-1 items-center ">
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
                                <strong>Mg:</strong> {medicineData.mg}<small>mg</small>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default Shop;