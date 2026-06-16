import Layout from "../Layoutes/Layout";
import { useContext } from "react";
import { DataProviderContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const { state } = useContext(DataProviderContext);
  const totalPrice = state.cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Layout>
      <section className="cart-layout">
        <div className="cart-items-section">
          <h1>Cart</h1>
          <hr />
          {state.cart.length === 0 ? (
            <p>Oops! No items in your basket.</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {state.cart.map((item, index) => (
                <ProductCard
                  product={item}
                  key={index}
                  flex={true}
                  addBtn={false}
                  removeBtn={true}
                  isCartOrPayment={true}
                />
              ))}
            </div>
          )}
        </div>

        <div className="cart-summary">
          <h5>Order Summary</h5>
          <hr />
          <p>
            Total Items: <strong>{state.cart.length}</strong>
          </p>
          <p>
            Total Quantity:{" "}
            <strong>
              {state.cart.reduce((acc, item) => acc + item.quantity, 0)}
            </strong>
          </p>
          <p>
            Total Price: <strong>${totalPrice}</strong>
          </p>
          <Link to={"/payments"}>
            <button className="btn btn-warning w-100 rounded-5 mt-3">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default Cart;