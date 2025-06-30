import UseMedicine from "../../../Hooks/UseMedicine";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

const DiscountProduct = () => {
  const [medicine] = UseMedicine();
  const discountedMedicines = medicine.filter(
    (medicine) => medicine.discount > 0
  );

  return (
    <div className="py-16 bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-transparent dark:from-purple-900/10"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30 dark:bg-purple-800"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-20 dark:bg-purple-700"></div>

      <div className="relative z-10">
        <div className="my-10">
          <SectionHeading
            heading={"Discounted Products"}
            subHeading={"Grab yours now before they're gone!"}
          />
        </div>

        <div className="px-4 sm:px-6 lg:px-10">
          <Swiper
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + ' bg-purple-600"></span>';
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            className="discount-swiper"
          >
            {discountedMedicines.map((discount) => (
              <SwiperSlide key={discount._id}>
                <Link to={`/shop?search=${encodeURIComponent(discount.name)}`}>
                  <div className="group cursor-pointer h-full">
                    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-800/30 h-full">
                      {/* Image Container */}
                      <div className="relative overflow-hidden">
                        <img
                          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          src={discount.image}
                          alt={discount.name}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Discount Badge */}
                        <div className="absolute top-2 right-2">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full blur-sm opacity-75"></div>
                            <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-2 rounded-full shadow-lg border border-white/30 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                              <div className="text-center">
                                <span className="font-bold text-lg block leading-none">
                                  {discount.discount}%
                                </span>
                                <span className="text-xs font-semibold">
                                  OFF
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Flash sale indicator */}
                        <div className="absolute top-2 left-2">
                          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            SALE
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-gray-900">
                        <div className="text-center">
                          <h3 className="text-gray-900 dark:text-white font-bold text-base mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                            {discount.name}
                          </h3>

                          {/* Price display */}
                          <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="text-gray-500 line-through text-sm font-medium">
                              ${discount.unit_price}
                            </span>
                            <span className="text-purple-700 font-bold text-lg">
                              $
                              {(
                                discount.unit_price *
                                (1 - discount.discount / 100)
                              ).toFixed(2)}
                            </span>
                          </div>

                          {/* Category and mg badges */}
                          <div className="flex items-center justify-center gap-1 text-xs">
                            <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full font-medium">
                              {discount.categoryName}
                            </span>
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                              {discount.mg}mg
                            </span>
                          </div>

                          {/* Shop now indicator */}
                          <div className="mt-3 flex justify-center">
                            <div className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold text-xs group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                              <span>View Details</span>
                              <svg
                                className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom CSS for Swiper */}
      <style>{`
        .discount-swiper .swiper-pagination-bullet {
          background: #9333ea !important;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .discount-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #9333ea !important;
          transform: scale(1.2);
        }
        .discount-swiper .swiper-pagination {
          bottom: -40px !important;
        }
        .discount-swiper .swiper-slide {
          transition: all 0.3s ease;
          height: auto;
        }
        .discount-swiper .swiper-slide > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default DiscountProduct;
