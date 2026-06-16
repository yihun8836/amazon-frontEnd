import { Link } from "react-router-dom";

function Card({ cate }) {
  return (
    <div className="col-md card p-3 shadow">
      <Link to={`category/${cate.title}`}>
        <h1 className="text-dark">{cate.name}</h1>
        <img src={cate.image} alt={cate.name} className="categoty-image mx-auto" />
        <p className="text-dark pe-3 mx-auto">Shop Now</p>
      </Link>
    </div>
  );
}

export default Card;