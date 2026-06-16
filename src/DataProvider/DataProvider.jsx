import { createContext, useReducer } from "react";
import { reducer, initialState } from "../Utility/reducer";
export const DataProviderContext = createContext();

function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DataProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </DataProviderContext.Provider>
  );
}
export default DataProvider;
