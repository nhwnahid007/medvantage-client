import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

import { MdDeleteForever } from "react-icons/md";

const AllUser = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDeleteUser=(_id)=>{
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
          axiosSecure.delete(`/user/${_id}`).then((res) => {
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

  const handleChangeUserRole = (_id, role) => {
   
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!",
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.patch(`/user/${_id}`, { role: role }).then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Updated!",
                text: "Your role has been updated.",
                icon: "success",
              });
            }
          });
        }
      });
  
  };


  return (
    <div>
      <h2>All Users</h2>
      <p>Total User: {users.length}</p>

      <div className="overflow-x-scroll w-full">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Remove User</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select onChange={(e) => handleChangeUserRole(user._id, e.target.value)}
                   defaultValue="default" className="select select-ghost w-full max-w-xs">
                    <option disabled value="default">
                      Change User Role
                    </option>
                    <option value='user'>user</option>
                    <option value='seller'>seller</option>
                    <option value='admin'>admin</option>
                  </select>
                </td>
                <td>
                    <button className="text-red-500" onClick={()=>handleDeleteUser(user._id)}><span className="text-3xl">
                    <MdDeleteForever />
                      </span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
