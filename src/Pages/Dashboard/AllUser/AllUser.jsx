import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";

const AllUser = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDeleteUser = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7600dc",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been removed.", "success");
          }
        });
      }
    });
  };

  const handleChangeUserRole = (_id, role) => {
    Swal.fire({
      title: "Confirm role change?",
      text: `Change user role to "${role}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7600dc",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/${_id}`, { role }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            queryClient.invalidateQueries(["userSellerRequest"]);
            queryClient.invalidateQueries(["sellerRequests"]);
            Swal.fire("Updated!", "User role updated successfully.", "success");
          }
        });
      }
    });
  };

  // Sort users by registration date
  const sortedUsers = [...users].sort((a, b) => {
    const timestampA = new Date(parseInt(a._id.substring(0, 8), 16) * 1000);
    const timestampB = new Date(parseInt(b._id.substring(0, 8), 16) * 1000);
    return timestampB - timestampA;
  });

  const userCount = users.filter((user) => user.role === "user").length;
  const sellerCount = users.filter((user) => user.role === "seller").length;
  const adminCount = users.filter((user) => user.role === "admin").length;

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <Helmet>
        <title>Users</title>
      </Helmet>

      {/* Heading */}
      <div className="mt-10 mb-4">
        <SectionHeading heading="Manage Users" />
      </div>

      {/* Summary cards under heading */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center bg-white shadow rounded p-4">
          <div className="text-xl font-bold text-gray-800">{users.length}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="text-center bg-white shadow rounded p-4">
          <div className="text-xl font-bold text-blue-600">{userCount}</div>
          <div className="text-sm text-gray-600">Users</div>
        </div>
        <div className="text-center bg-white shadow rounded p-4">
          <div className="text-xl font-bold text-green-600">{sellerCount}</div>
          <div className="text-sm text-gray-600">Sellers</div>
        </div>
        <div className="text-center bg-white shadow rounded p-4">
          <div className="text-xl font-bold text-purple-600">{adminCount}</div>
          <div className="text-sm text-gray-600">Admins</div>
        </div>
      </div>

      {/* User table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="table w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Registration Date</th>
              <th className="p-4">Change Role</th>
              <th className="p-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => {
              const registrationDate = new Date(
                parseInt(user._id.substring(0, 8), 16) * 1000
              );

              return (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium">{index + 1}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4">
                    {registrationDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-4">
                    <select
                      onChange={(e) =>
                        handleChangeUserRole(user._id, e.target.value)
                      }
                      defaultValue="default"
                      className="select select-bordered select-sm w-full max-w-xs"
                    >
                      <option disabled value="default">
                        Change User Role
                      </option>
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete User"
                    >
                      <MdDeleteForever size={24} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
