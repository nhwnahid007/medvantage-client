import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useCart from "../../Hooks/useCart";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAuth from "../../Hooks/UseAuth";
import moment from "moment";

const CheckoutForm = () => {

  const {user}=useAuth()
  const [error, setError] = useState('');
  const [clientSecret,setClientSecret]= useState('')
  const [transactionId,setTransactionId]=useState('')

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure()
  const [cart] = useCart()

  const totalPrice = cart.reduce((total, item) => {
    const discountedPrice = item.price * (1 - item.discount / 100);
    const itemTotal = discountedPrice * item.quantity;
    return total + itemTotal;
  }, 0);
  

  
  
  console.log(totalPrice)


  useEffect( ()=>{
    axiosSecure.post('/create-payment-intent',{price:totalPrice})
    .then(res=>{
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
    })
  },[axiosSecure,totalPrice])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);

      toast.error(`${error.message}`);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }


    //confirm
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
          card: card,
          billing_details: {
              email: user?.email || 'anonymous',
              name: user?.displayName || 'anonymous'
          }
      }
  })

  if(confirmError){
    console.log('Confirm Error')
  }
  else{
    console.log('Payment intent',paymentIntent)

    if (paymentIntent.status === 'succeeded'){
      console.log('Transaction Id',paymentIntent.id)
      setTransactionId(paymentIntent.id)

      const payment = {
        email: user?.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: moment().subtract(10, 'days').calendar(),
        cartIds: cart.map(item => item._id),
        medicineItemIds: cart.map(item => item.medicineId),
        status: 'pending'
    }

   const res= await axiosSecure.post('/payments',payment);
   console.log('Payment saved',res)

    }

  }

  };
  return (
    <form className="w-72 mx-auto" onSubmit={handleSubmit}>
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
      />
      <button
        className="btn btn-sm bg-[#7600dc] text-gray-200"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>

      {
        transactionId && <p className="text-green-600">Transaction Id: {transactionId}</p>
      }
    </form>
  );
};

export default CheckoutForm;
