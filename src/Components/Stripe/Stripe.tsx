import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51RJSivJIiPYpQEUGyJrCZGbHYDdNMG7oNPO5iWzVdkTIoQCJLUSR9rXaujULKtJZ3uYLKJYOn38NFQMIPL3fnr3I00YoAg43V0"
);

const Stripe: React.FC = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Stripe Payment (TSX)</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Stripe;
