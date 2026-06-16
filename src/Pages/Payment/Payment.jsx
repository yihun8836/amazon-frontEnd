import Layout from "../Layoutes/Layout";
import "./Payment.css";
import ProductCard from "../../Components/Product/ProductCard";
import { useContext, useState } from "react";
import { DataProviderContext } from "../../DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { axiosInstance } from "../../API/axios";
import { useNavigate } from "react-router-dom";
import { type } from "../../Utility/action.type";
function Payment() {
  const { state, dispatch } = useContext(DataProviderContext);

  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const total = state.cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleEvent = (event) => {
    setCardError(event.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setCardError("Stripe has not loaded yet");
      return;
    }

    if (state.cart.length === 0) {
      setCardError("Your cart is empty");
      return;
    }

    try {
      setLoading(true);
      setCardError("");

      const response = await axiosInstance.post(
        `/payments/create?total=${total}`,
      );

      console.log("Payment Response:", response.data);

      const clientSecret = response?.data?.clientSecret;

      if (!clientSecret) {
        throw new Error("Client secret was not returned from backend");
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        },
      );

      if (error) {
        setCardError(error.message);
        setLoading(false);
        return;
      }

      if (!paymentIntent) {
        throw new Error("PaymentIntent is null");
      }

      console.log("Payment Successful:", paymentIntent);

      await db
        .collection("users")
        .doc(state.user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          cart: state.cart,
          price: paymentIntent.amount,
          created: paymentIntent.created,
        });
      dispatch({
        type: type.EMPTY_CART,
      });
      setLoading(false);

      navigate("/orders", {
        state: {
          msg: "You have new orders",
        },
      });
    } catch (error) {
      console.error("Payment Error:", error);

      setCardError(error?.message || "Something went wrong during payment");

      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="chk-header p-3 text-center">
        <h3>Checkout ({state.cart.length}) Items</h3>
      </div>

      <div className="container">
        <div className="detail row align-items-center py-3">
          <h3 className="col-4">Delivery Address</h3>

          <div className="col-4">
            <p className="email">{state.user?.email}</p>
            <p className="adres">123 React Lane</p>
            <p className="adres">Chicago, IL</p>
          </div>
        </div>

        <hr />

        <div className="detail row align-items-start g-0 gap-5 my-5">
          <h3 className="col-md-3">Review items and delivery</h3>

          <div className="col-md-7 product-card">
            {state.cart.map((item, index) => (
              <ProductCard
                key={index}
                product={item}
                flex={true}
                isPaymentPage={true}
              />
            ))}
          </div>
        </div>

        <div className="detail row align-items-center mb-4">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <h3 className="m-0">Payment Method</h3>
          </div>

          <div className="col-12 col-md-8">
            <form onSubmit={handlePayment}>
              <div className="border rounded p-3 bg-white">
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleEvent} />

                <small>Total: ${total}</small>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-warning w-100 mt-3"
              >
                {loading ? (
                  <div className="loading">
                    <ClipLoader size={12} />
                    <span>Please wait...</span>
                  </div>
                ) : (
                  "Pay Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Payment;
