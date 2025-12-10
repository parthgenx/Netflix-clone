import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast"; // The new notification tool
import { ClipLoader } from "react-spinners"; // The new spinner

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start spinner

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // 1. Create Token
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      toast.error(error.message); // Nice error popup
      setLoading(false);
    } else {
      // 2. Send to Backend
      try {
        const response = await axios.post(
          "https://netflix-backend-u33z.onrender.com/payment",
          {
            id: paymentMethod.id,
          }
        );

        if (response.data.success) {
          toast.success("Welcome to Premium! 🍿"); // Nice success popup
          // Optional: Navigate to home after 2 seconds
          // setTimeout(() => window.location.href = '/', 2000);
        } else {
          toast.error("Payment failed on server.");
        }
      } catch (err) {
        toast.error("Server connection error.");
      }
      setLoading(false); // Stop spinner
    }
  };

  // Custom styling for the Stripe Input to make it look "Pro"
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/80 p-8 rounded-lg border border-gray-700 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Setup Payment
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="p-4 bg-white rounded-md shadow-inner">
          <CardElement options={cardStyle} />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-red-600 h-12 rounded font-bold text-white hover:bg-red-700 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            "Start Membership"
          )}
        </button>
      </form>

      <p className="text-gray-400 text-xs mt-4 text-center">
        Secure transaction powered by Stripe. No real money is charged in Test
        Mode.
      </p>
    </div>
  );
};

const Payment = () => {
  return (
    <div className="w-full min-h-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center flex items-center justify-center">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content Layer (z-index higher than overlay) */}
      <div className="z-10 w-full px-4">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

//update payment
