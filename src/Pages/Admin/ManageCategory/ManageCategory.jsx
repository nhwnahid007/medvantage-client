import { FaRegEdit } from "react-icons/fa";
import UseMedicine from "../../../Hooks/UseMedicine";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";


const ManageCategory = () => {
    const [medicines, loading, refetch] = UseMedicine();
console.log(loading)
    const axiosSecure = UseAxiosSecure()

    const handleDeleteMedicine=(_id)=>{
        console.log(_id)
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
              axiosSecure.delete(`/category/${_id}`).then((res) => {
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
      }
    return (
     <div>
            <div>
               <div className="mt-10"> <SectionHeading heading={'Manage Categories'}></SectionHeading></div>
            </div>
    
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
            <FaRegEdit className="text-2xl" />
            </td>
            <td>
           <button onClick={()=>handleDeleteMedicine(medicine._id)}> <MdDeleteForever className="text-2xl text-red-600" /></button>
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