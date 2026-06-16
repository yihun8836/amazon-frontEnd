import Layout from "../Layoutes/Layout";
import { db } from "../../Utility/firebase";
import { DataProviderContext } from "../../DataProvider/DataProvider";
import { useEffect, useContext, useState } from "react";
import "./Order.css";
DataProviderContext;
useEffect;
import ProductCard from "../../Components/Product/ProductCard";
function Order() {
  const { state, dispatch } = useContext(DataProviderContext);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (state.user) {
      db.collection("users")
        .doc(state.user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapShot) => {
          setOrder(
            snapShot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          );
        });
    } else {
      setOrder([]);
    }
  }, []);

  return (
    <Layout>
      <section
        className="align-items-ceter justify-content-center mx-auto p-3"
        style={{
          maxWidth: "700px",
        }}
      >
        <div className="order-container bg-white ">
          <h2 className="text-center">Your Orders</h2>
          {order.length == 0 && <small>You don't have orders yet.</small>}
          <div className="">
            <hr />

            {order.map((eachOrder, index) => {
              return (
                <div key={index}>
                  <p>
                    <span
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        marginLeft: "10px",
                      }}
                    >
                      {" "}
                      Product ID:{" "}
                    </span>
                    {eachOrder.id}
                  </p>

                  {eachOrder?.data?.cart?.map((item, i) => {
                    return (
                      <ProductCard
                        key={i}
                        product={item}
                        flex={true}
                        isPaymentPage={true}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Order;
