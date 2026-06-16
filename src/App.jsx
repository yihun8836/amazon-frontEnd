import Routing from "./Routing/Routing";
import { auth } from "./Utility/firebase";
import { type } from "./Utility/action.type";
import { useContext, useEffect } from "react";
import { DataProviderContext } from "./DataProvider/DataProvider";

function App() {
  const { dispatch } = useContext(DataProviderContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch({
        type: type.SET_USER,
        user: authUser || null,
      });

      dispatch({
        type: type.SET_AUTH_LOADING,
        authLoading: false,
      });
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="all-wraper overflow-hidden">
      <Routing />
    </div>
  );
}

export default App;
