import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCart from "../../Hooks/useCart";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";

const CheckoutForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const [cart, refetch] = useCart();

  const totalPrice = cart.reduce((total, item) => {
    const discountedPrice = item.price * (1 - item.discount / 100);
    const itemTotal = discountedPrice * item.quantity;
    return total + itemTotal;
  }, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      toast.error(`${error.message}`);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm Error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          buyerEmail: user?.email,
          medicineName: cart.map((item) => item.name),
          sellerEmails: cart.map((item) => item.sellerEmail),
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: moment().format("MM/DD/YYYY"),
          cartIds: cart.map((item) => item._id),
          medicineItemIds: cart.map((item) => item.medicineId),
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        refetch();

        if (res.data?.paymentResult?.insertedId) {
          toast.success("Paid Successfully");
        }

        navigate(`/invoice/${payment.transactionId}`);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Checkout
      </h2>

      {/* Total Price */}
      <div className="text-center text-lg font-semibold text-purple-700 mb-6">
        Total to Pay: ${totalPrice.toFixed(2)}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-3 border border-gray-300 rounded-md"
        />

        <button
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        {transactionId && (
          <p className="text-green-600 text-sm font-medium mt-2">
            ✅ Transaction Id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
