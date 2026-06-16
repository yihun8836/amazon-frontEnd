import Layout from "../Layoutes/Layout";
import CarouselEffect from "../../Components/CarouselEffect/CarouselEffect";
import Category from "../../Components/Category/Category";
Category;
import Product from "../../Components/Product/Product";
function LandingPage() {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product />
    </Layout>
  );
}

export default LandingPage;
