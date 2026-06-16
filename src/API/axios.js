import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-d452f/us-central1/api",
  baseURL: "https://amazon-api-deploy-gf4s.onrender.com/",
});
export { axiosInstance };
