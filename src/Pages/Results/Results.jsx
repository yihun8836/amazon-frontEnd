import Layout from "../Layoutes/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_Url from "../../API/EndPoints";
import "./Results.css";
import { useEffect, useState } from "react";
import ProductCard from "../../Components/Product/ProductCard";

function Results() {
  const [data, setData] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API_Url}/products/category/${categoryName}`
        );
        setData(data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <Layout>
      <div>
        <h1 className="text-center py-4">{categoryName.toUpperCase()}</h1>
        <section className="row row-cols-1 row-cols-md-3 g-3 justify-content-center">
          {data.map((category) => (
            <ProductCard
              key={category.id}
              product={category}
              addBtn={true}
              removeBtn={false}
            />
          ))}
        </section>
      </div>
    </Layout>
  );
}

export default Results;