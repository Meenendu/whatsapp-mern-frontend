import React, { useContext, createContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";

export const stateContext = createContext();

export const StateProvider = ({ children }) => (
  <stateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </stateContext.Provider>
);

export const useContextState = () => useContext(stateContext);
