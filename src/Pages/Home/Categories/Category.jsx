import { Link } from "react-router-dom";

const Category = ({ category, medicine }) => {
  const filteredMedicine = medicine.filter(
    (item) => item.categoryName === category.categoryName
  );

  return (
    <div>
      <Link to={`category/${category.categoryName}`}>
        <div className="max-w-2xl mx-auto group cursor-pointer">
          <div className="bg-white shadow-xl border border-gray-200 rounded-2xl max-w-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-purple-400 dark:hover:border-purple-500 transform hover:-translate-y-2">
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img
                className="rounded-t-2xl h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-125"
                src={category.image}
                alt={category.categoryName}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Medicine count badge */}
              <div className="absolute top-4 right-4">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                  {filteredMedicine.length}{" "}
                  {filteredMedicine.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Floating category name overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h5 className="text-white font-bold text-xl tracking-tight uppercase drop-shadow-lg">
                  {category.categoryName}
                </h5>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900">
              <div className="text-center">
                <h5 className="text-gray-900 font-bold text-xl tracking-tight mb-2 dark:text-white uppercase group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {category.categoryName}
                </h5>

                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                  Discover {filteredMedicine.length}{" "}
                  {filteredMedicine.length === 1 ? "medicine" : "medicines"} in
                  this category
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Category;
