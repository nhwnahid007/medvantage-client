import { loadStripe } from "@stripe/stripe-js";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div>
            <Helmet>
        <title>Payment</title>
      </Helmet>
            <SectionHeading heading={'Please pay'}></SectionHeading>

            <div className="">
            <Elements stripe={stripePromise}>
      <CheckoutForm></CheckoutForm>
    </Elements>
            </div>
        </div>
    );
};

export default Payment;