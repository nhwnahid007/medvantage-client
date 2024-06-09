import { loadStripe } from "@stripe/stripe-js";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div>
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