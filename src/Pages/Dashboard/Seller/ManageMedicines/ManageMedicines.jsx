import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import SectionHeading from "../../../../components/SectionHeading/SectionHeading";


const ManageMedicines = () => {

    const {user} = useAuth()
    console.log(user?.email)
    const axiosSecure=UseAxiosSecure()

    const { data: medicines = [], error, isLoading } = useQuery({
        queryKey: ['medicines', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }
            const res = await axiosSecure.get(`/medicines/seller?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    console.log(medicines)



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching medicines</div>;
    }



    return (
        <div className="">

           <div className="mt-10"><SectionHeading heading={'Seller Medicines'}></SectionHeading></div>

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

      {
        medicines.map((medicine,index)=>  <tr key={medicine._id}>
            <th>
             {index+1}
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={medicine.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{medicine.name}</div>
                  
                </div>
              </div>
            </td>
            <td>
            {medicine.categoryName}
             
            </td>
            <td>{medicine.mg}<small>mg</small> </td>
            <td>
                {medicine.company}
            </td>
          </tr> )
      }


     
    
    </tbody>
    
    
  </table>
</div>

            
        </div>
    );
};

export default ManageMedicines;