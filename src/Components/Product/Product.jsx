import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./Product.css";

function Product() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <section className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 justify-content-center">
        {products?.map((p) => (
          <ProductCard
            key={p?.id}
            product={p}
            addBtn={true}
            removeBtn={false}
          />
        ))}
      </section>
    </div>
  );
}

export default Product;
