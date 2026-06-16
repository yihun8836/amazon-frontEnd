import Card from "./Card";
import "./Category.css";
import productInfo from "./Data";

function Category() {
  return (
    <section className="category">
      <div className="card-wraper row gap-3 g-0 text-center align-items-center justify-content-center">
        {productInfo?.map((item, index) => (
          <Card cate={item} key={index} />
        ))}
      </div>
    </section>
  );
}

export default Category;