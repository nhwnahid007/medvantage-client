import { Link } from "react-router-dom";

const Category = ({category,medicine}) => {
    console.log(medicine)
    const filteredMedicine = medicine.filter(
        (item) => item.categoryName === category.categoryName
      );
      
  return (
    <div>
      <>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg h-[300px] w-full" src={category.image} alt="" />
            </a>
            <div className="p-5">
              <div className="flex items-center">
                <a href="#">
                  <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white uppercase">
                    {category.categoryName}
                  </h5>
                </a>
  
                <p className="px-4 flex justify-center ml-2 mb-2 bg-purple-100 font-bold w-6 rounded-2xl">
                  {filteredMedicine.length}
                </p>
              </div>

              <Link
                to={`category/${category.categoryName}`}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-purple-600 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
              >
                Explore This category
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Category;
