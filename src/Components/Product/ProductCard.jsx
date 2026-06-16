import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { type } from "../../Utility/action.type";
import { DataProviderContext } from "../../DataProvider/DataProvider";

function ProductCard({ product, flex, addBtn, removeBtn, isPaymentPage, isCartOrPayment }) {
  const { dispatch } = useContext(DataProviderContext);

  const addTocart = () => {
    dispatch({ type: "ADD_TO_CART", item: product });
  };

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", item: product });
  };

  function truncateText(text, limit = 150) {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Safe checks to confirm layout styles
  const isFlexedLayout = flex || isPaymentPage || isCartOrPayment;

  return (
    <div
      className={
        isFlexedLayout
          ? `products flexed-products text-dark p-3 mt-3 ${
              isPaymentPage || isCartOrPayment ? "payment-layout-card" : "detail-layout-card shadow-sm rounded-3"
            }`
          : "products col text-dark shadow pt-2 pb-3 mt-3 mx-1 d-flex flex-column justify-content-between"
      }
    >
      {/* Universal Left Side Image Block */}
      <div className={isFlexedLayout ? "product-card-img-container" : "product-card-img-container w-100"}>
        <Link to={`/products/${product?.id}`} className="text-decoration-none d-flex justify-content-center w-100">
          <img
            src={product?.image}
            alt={product?.title}
            className={isFlexedLayout ? "detail-img" : "custom-card-img"}
          />
        </Link>
      </div>

      {/* Right Side Info Block */}
      <div className={`product-card-info-container ${isFlexedLayout ? "flex-grow-1 px-3" : "px-2 pt-1 d-flex flex-column flex-grow-1"}`}>
        <div className={isFlexedLayout ? "" : "card-title"}>
          <h5 className={isFlexedLayout ? "" : "mb-1"}>{product?.title}</h5>
          {!isPaymentPage && !isCartOrPayment && (
            <p className="desc text-muted mb-0">
              <span className="fw-bold">Description </span>
              {isFlexedLayout
                ? capitalizeFirst(product?.description)
                : capitalizeFirst(truncateText(product?.description, 50))}
            </p>
          )}
        </div>

        {/* Core elements container */}
        <div className={isFlexedLayout ? "mt-2" : "mt-auto"}>
          <div className="rating-star my-1">
            <Rating 
              value={product?.rating?.rate} 
              precision={0.1} 
              readOnly 
              size={isFlexedLayout ? "medium" : "small"}
            />
            <p className="mb-1 star-count ms-1 text-muted">({product?.rating?.count})</p>
          </div>

          <p className={`mb-2 fw-bold price-tag ${isFlexedLayout ? "" : "fs-6"}`}>Price ${product?.price}</p>
          
          {/* Action Row Actions Area Wrapper */}
          <div className={isCartOrPayment ? "d-flex flex-column gap-2 align-items-start mt-2" : ""}>
            
            {addBtn && (
              <button
                className={`btn-cart btn btn-warning btn-sm w-100 rounded-5 ${isFlexedLayout ? "flexed-btn" : ""}`}
                onClick={addTocart}
              >
                Add to Cart
              </button>
            )}

            {removeBtn && (
              <button
                className={`btn-cart btn btn-warning btn-sm rounded-5 ${isFlexedLayout ? "flexed-btn" : "w-100"}`}
                onClick={removeFromCart}
              >
                Remove
              </button>
            )}

            {/* Plus-Minus controls */}
            {removeBtn && (
              <div className="d-flex align-items-center gap-2 mt-1 cart-qty-row">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => dispatch({ type: type.REMOVE_ONE, item: product })}
                >
                  -
                </button>
                <span className="fw-bold px-2 fs-6">{product.quantity}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => dispatch({ type: type.ADD_TO_CART, item: product })}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;