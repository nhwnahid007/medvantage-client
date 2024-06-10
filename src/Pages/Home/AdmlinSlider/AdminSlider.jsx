import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminSlider = () => {

  const axiosSecure = UseAxiosSecure()

  const { data: bannerAds = [] } = useQuery({
    queryKey: ["bannerAds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisedment");
      return res.data;
    },
  });

  console.log(bannerAds)


  return (
    <div className="">
      <Carousel infiniteLoop={true} >
        {/* <div>
            
          <img  src="https://i.ibb.co/L8rV72z/crystal-7428278-1280.jpg" />
          
        </div> */}

        {bannerAds.map((ad, index) => (
          // Render images only if ad.role is "accepted"
          ad.status === "accepted" && (
            <div className="" key={index}>
            <img src={ad.image} alt={`Banner ${index}`} />
          
          </div>
          
          )
        ))}
       
        
      </Carousel>
    </div>
  );
};

export default AdminSlider;
