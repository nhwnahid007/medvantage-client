import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const AdminSlider = () => {
  return (
    <div className="">
      <Carousel infiniteLoop={true} >
        <div>
            
          <img  src="https://i.ibb.co/L8rV72z/crystal-7428278-1280.jpg" />
          
        </div>
        <div>
          <img  src="https://i.ibb.co/L8rV72z/crystal-7428278-1280.jpg" />
          
        </div>
        <div>
          <img  src="https://i.ibb.co/L8rV72z/crystal-7428278-1280.jpg" />
          
        </div>
        
      </Carousel>
    </div>
  );
};

export default AdminSlider;
