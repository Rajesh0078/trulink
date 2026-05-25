'use client';

import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  user: null,
  users: [],
  messages: [],
  matches: [],
  notifications: [],
  loading: false,
  error: null,
};

const AppContext = createContext(null);

function appReducer(state, action) {
  switch (action.type) {

    // ---------------- USER ----------------
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
export function AppProvider({ children, externalState }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (externalState?.user?._id) {
      dispatch({ type: "SET_USER", payload: externalState.user });
    }
  }, [externalState]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useStore() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useStore must be used inside AppProvider");
  }

  return context;
}