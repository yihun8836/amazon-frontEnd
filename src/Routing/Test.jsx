import React, { useReducer, useState } from "react";

function App() {
  const [showCart, setShowCart] = useState(true);

  const products = [
    { id: 1, name: "iPhone11", price: 1000 },
    { id: 2, name: "laptop", price: 2000 },
    { id: 3, name: "iPad", price: 4000 },
    { id: 4, name: "SamsungS25", price: 3000 },
  ];

  const inState = {
    cart: [],
  };

  const _TYPE = {
    add_to_cart: "ADD_TO_CART",
    remove_from_cart: "REMOVE_FROM_CART",
    remove_one: "REMOVE_ONE",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case _TYPE.add_to_cart:
        const existItem = state.cart.find((i) => i.id === action.item.id);

        if (existItem) {
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.item.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          };
        }

        return {
          ...state,
          cart: [...state.cart, { ...action.item, quantity: 1 }],
        };

      case _TYPE.remove_from_cart:
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.item.id),
        };

      case _TYPE.remove_one:
        const removeItem = state.cart.find(
          (item) => item.id === action.item.id,
        );

        if (removeItem.quantity === 1) {
          return {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.item.id),
          };
        }

        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, inState);

  const addToCart = (product) => {
    dispatch({ type: _TYPE.add_to_cart, item: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: _TYPE.remove_from_cart, item: product });
  };

  const removeOne = (product) => {
    dispatch({ type: _TYPE.remove_one, item: product });
  };

  const totalPrice = state.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      {showCart && (
        <div>
          <h1 style={{ textAlign: "center" }}>Cart</h1>
          <section
            style={{
              width: "50%",
              margin: "20px auto",
            }}
          >
            {/* PRODUCTS */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {products.map((product) => (
                <div key={product.id}>
                  <p>{product.name}</p>
                  <p>{product.price}</p>

                  <button
                    style={{ marginBlock: "10px" }}
                    onClick={() => {
                      addToCart(product);
                      setShowCart(false);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
      <h1>Cart Detail</h1>

      <p>
        Total Price: <b>{totalPrice}</b>
      </p>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {state.cart.map((item) => (
          <div key={item.id}>
            <p>Product: {item.name}</p>
            <p>Quantity: {item.quantity}</p>

            <button
              style={{ margin: "10px" }}
              onClick={() => {
                removeFromCart(item);
                setShowCart(true);
              }}
            >
              Remove from Cart
            </button>

            <button onClick={() => removeOne(item)}>-</button>

            <button onClick={() => addToCart(item)}>+</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
