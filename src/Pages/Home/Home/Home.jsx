
import { Helmet } from "react-helmet-async";
import Homeswiper from "../AdmlinSlider/HomeSlider";
import Categories from "../Categories/Categories";
import Data from "../Data/Data";
import DiscountProduct from "../DiscountProduct/DiscountProduct";
import Faqs from "../Faqs/Faqs";
import InfoAlert from "../Faqs/InfoAlert/InfoAlert";


const Home = () => {
  return (
    <div data-aos="fade-up"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-anchor-placement="top-center" className="">


<Helmet>
        <title>Medvantage</title>
      </Helmet>

      {/* <AdminSlider></AdminSlider> */}
      <Homeswiper></Homeswiper>
      <Categories></Categories>
      <DiscountProduct></DiscountProduct>
      <Faqs></Faqs>
      <Data></Data>
      <InfoAlert></InfoAlert>
    </div>
  );
};

export default Home;
