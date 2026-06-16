import { FadeLoader } from "react-spinners";
function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <FadeLoader
        color="#0d6efd"
        loading={true}
        height={15}
        width={5}
        radius={2}
        margin={2}
      />
    </div>
  );
}

export default Loader;
