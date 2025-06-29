import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

const HomeSlider = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: bannerAds = [], isLoading } = useQuery({
    queryKey: ["bannerAds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisedment");
      return res.data;
    },
  });

  return (
    <div className="p-0">
      {isLoading ? (
        <SkeletonTheme baseColor="#ebddfd" highlightColor="#cfa8f0">
          <div className="skeleton-container">
            <Skeleton count={5} height={100} />
          </div>
        </SkeletonTheme>
      ) : (
        <div className="w-full container mx-auto rounded-xl overflow-hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {bannerAds
              .filter(ad => ad.status === "accepted")
              .map((ad, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-[240px] sm:h-[300px] md:h-[400px] lg:h-[480px] 2xl:h-[550px]">
                    <img
                      src={ad.image}
                      alt={`Banner ${index}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default HomeSlider;
