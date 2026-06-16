import logo from "../../assets/images/icons/amazon_logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./SignUp.css";
import { useContext, useState } from "react";
import { auth } from "../../Utility/firebase";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataProviderContext } from "../../DataProvider/DataProvider";
import { type } from "../../Utility/action.type";
import { Navigate } from "react-router-dom";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(DataProviderContext);
  const navigate = useNavigate();
  const navData = useLocation();
  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });
  console.log(navData);
  const authHandler = async (e) => {
    e.preventDefault();

    setError("");

    if (e.target.name === "signIn") {
      setLoading((prev) => ({ ...prev, signin: true }));

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: type.SET_USER,
            user: userInfo.user,
          });
          setLoading((prev) => ({ ...prev, signin: false }));
          navigate(navData?.state?.redirect || "/");
        })

        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading((prev) => ({ ...prev, signin: false }));
        });
    } else {
      setLoading((prev) => ({ ...prev, signup: true }));
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: type.SET_USER,
            user: userInfo.user,
          });
          navigate(navData?.state?.redirect || "/");
        })

        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading((prev) => ({ ...prev, signup: false }));
        });
    }
  };

  return (
    <section className="auth-wraper">
      {/* logo */}
      <Link to={"/"}>
        <img src={logo} alt="logo" />
      </Link>

      {/* form */}
      <div className="form-wraper">
        <h2>Sign-In</h2>
        {navData?.state?.msg && (
          <small
            style={{
              color: "red",
              padding: "5px",
              textAlign: "center",
            }}
          >
            {navData?.state?.msg}
          </small>
        )}
        <form>
          <div className="email-wraper">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="password-wraper">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>
        </form>

        {/* Sign In */}
        <button
          name="signIn"
          className="login"
          onClick={authHandler}
          type="submit"
        >
          {loading.signin ? <ClipLoader color="green" size={15} /> : "Login"}
        </button>

        {/* Sign Up */}
        <button
          name="signUp"
          className="sign-up-btn"
          onClick={authHandler}
          type="submit"
        >
          {loading.signup ? <ClipLoader size={15} /> : "Create Account"}
        </button>

        {/* Error */}
        {error && (
          <small
            style={{ fontSize: "14px", color: "red", textAlign: "center" }}
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
