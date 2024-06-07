import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import Category from "./Category";

const Categories = () => {
  const axiosPublic = UseAxiosPublic();

  const {
    data: categories = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res.data;
    },
  });
console.log(categories)
  return (
    <div>
      <SectionHeading
        heading={"Categories"}
        subHeading={
          "Learn about wellness practices and lifestyle choices to optimize your health outcomes."
        }
      ></SectionHeading>

     <div className=" mt-20 grid gap-20 justify-evenly grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            categories.map(category=> <Category key={category._id} loading={loading} refetch={refetch} category={category}></Category> )
          }
     </div>
    </div>
  );
};

export default Categories;
