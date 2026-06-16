import { useParams } from "react-router-dom";
import Layout from "../Layoutes/Layout";
import axios from "axios";
import API_Url from "../../API/EndPoints";
import { useState, useEffect } from "react";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function ProductDeatail() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_Url}/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (IsLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <Layout>
          <h2>Product not found</h2>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="p-3 detail-section container mx-auto shadow rounded-3 bg-light pb-5 mt-4">
        <ProductCard
          product={product}
          flex={true}
          addBtn={true}
          removeBtn={false}
        />
      </section>
    </Layout>
  );
}

export default ProductDeatail;
