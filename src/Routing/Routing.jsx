import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Auth from "../Pages/Auth/Auth";
import Payment from "../Pages/Payment/Payment";
import Order from "../Pages/Orders/Order";
import ProductDeatail from "../Pages/ProductDetail/ProductDeatail";
import Results from "../Pages/Results/Results";
import Cart from "../Pages/Cart/Cart";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
function Routing() {
  const stripePromise = loadStripe(
    "pk_test_51Thkjv3T23iIfCwE9AJyfGIyUL0BiigFRbIJsPZYMzOqP3A1rGrG1Hpb8VVfPQ6vPVCC4rqVPRMnkdLRUdOW0f6K00mpM3xcPC",
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"You must login to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must login to access your orders"}
              redirect={"/orders"}
            >
              <Order />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDeatail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default Routing;
