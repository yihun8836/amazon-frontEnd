import { useContext, useEffect } from "react";
import { DataProviderContext } from "../../DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, msg, redirect }) {
  const { state } = useContext(DataProviderContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.authLoading && !state.user) {
      navigate("/auth", {
        state: {
          msg,
          redirect,
        },
      });
    }
  }, [state.user, state.authLoading, navigate, msg, redirect]);

  if (state.authLoading) {
    return (
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
