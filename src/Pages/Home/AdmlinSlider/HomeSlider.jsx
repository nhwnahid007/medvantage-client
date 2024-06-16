import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Autoplay, Navigation, Pagination } from "swiper/modules";

const AdminSlider = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: bannerAds = [], isLoading } = useQuery({
    queryKey: ["bannerAds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisedment");
      return res.data;
    },
  });

  console.log(bannerAds);

  return (
    <div className="my-10 max-h-[700px]">
      {isLoading ? (
        <SkeletonTheme baseColor="#ebddfd" highlightColor="#cfa8f0">
        <div className="skeleton-container">
          <Skeleton count={5} height={100} />
          
        </div>
      </SkeletonTheme>
      
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {bannerAds &&
            bannerAds.map((ad, index) =>
              ad.status === "accepted" ? (
                <SwiperSlide key={index}>
                  <img
                    className="h-[400px] lg:h-[660px] w-full rounded-xl"
                    src={ad.image}
                    alt={`Banner ${index}`}
                  />
                </SwiperSlide>
              ) : null
            )}
        </Swiper>
      )}
    </div>
  );
};

export default AdminSlider;
