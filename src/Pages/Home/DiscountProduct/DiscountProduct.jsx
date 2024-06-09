import UseMedicine from "../../../Hooks/UseMedicine";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const DiscountProduct = () => {
  const [medicine] = UseMedicine();
  const discountedMedicines = medicine.filter(
    (medicine) => medicine.discount > 0
  );

  return (
    <div>
      <div className=" my-10">
        <SectionHeading
          heading={"Discounted product"}
          subHeading={"Grab yours now"}
        ></SectionHeading>
      </div>

      <div className="">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {discountedMedicines.map((discount) => (
            <>
              <SwiperSlide>
                <img
                  className="relative h-72 w-full"
                  src={discount.image}
                  alt=""
                />
                <div className="text-sm absolute top-0 right-0 bg-purple-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-purple-600 transition duration-500 ease-in-out">
                  <span className="font-bold">{discount.discount}%</span>
                  <small>Discount</small>
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountProduct;
