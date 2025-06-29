import { Helmet } from "react-helmet-async";
import Categories from "../Categories/Categories";
import Data from "../Data/Data";
import DiscountProduct from "../DiscountProduct/DiscountProduct";
import Faqs from "../Faqs/Faqs";
import InfoAlert from "../Faqs/InfoAlert/InfoAlert";
import HomeSlider from "../AdmlinSlider/HomeSlider";

const Home = () => {
  return (
    <div className="space-y-16 px-4 md:px-8 lg:px-16 py-6">
      <Helmet>
        <title>Medvantage</title>
      </Helmet>

      {/* Hero Slider */}
      <section data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
        <HomeSlider />
      </section>

      {/* Categories */}
      <section data-aos="fade-up" data-aos-delay="150" data-aos-duration="800">
        <Categories />
      </section>

      {/* Discounted Products */}
      <section data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
        <DiscountProduct />
      </section>

      {/* FAQs */}
      <section data-aos="fade-up" data-aos-delay="250" data-aos-duration="800">
        <Faqs />
      </section>

      {/* Data Statistics */}
      <section data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
        <Data />
      </section>

      {/* Info Alert */}
      <section data-aos="fade-up" data-aos-delay="350" data-aos-duration="800">
        <InfoAlert />
      </section>
    </div>
  );
};

export default Home;
