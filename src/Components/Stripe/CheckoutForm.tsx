import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!stripe || !elements) {
      setMessage("Stripe.js has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage("Card element not found.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/create-payment-intent", {
        amount: 500, // $5.00 in cents
        currency: "usd",
      });

      const clientSecret: string = response.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement as StripeCardElement,
        },
      });

      if (result.error) {
        setMessage(`❌ ${result.error.message}`);
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        setMessage(" Payment successful!");
      }
    } catch (err: any) {
      setMessage(`⚠️ ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5"
      px={2}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 420 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Checkout
        </Typography>
        <Typography variant="body1" gutterBottom color="text.secondary">
          Enter your card details below to complete the payment.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              mt: 2,
              bgcolor: "#fff",
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#c62828" },
                },
              }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              bgcolor: "#f44336",
              '&:hover': { bgcolor: "#d32f2f" },
            }}
            disabled={!stripe || loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Pay $5.00"}
          </Button>
        </form>

        {message && (
          <Alert severity={message.includes("") ? "success" : "error"} sx={{ mt: 3 }}>
            {message}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default CheckoutForm;
