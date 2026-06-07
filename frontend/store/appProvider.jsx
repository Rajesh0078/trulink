'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';

const initialState = {
  user: {},
  users: [],
  messages: [],
  matches: [],
  socket: null,
  onlineUsers: [],
  notifications: [],
  loading: false,
  error: null
};

const AppContext = createContext(null);

function appReducer(state, action) {
  switch (action.type) {
    // ---------------- USER ----------------
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ONLINE_USERS':
      return { ...state, onlineUsers: action.payload };
    default:
      return state;
  }
}
export function AppProvider({ children, externalState }) {
  const extendedState = {
    ...initialState,
    ...externalState
  };
  const [state, dispatch] = useReducer(appReducer, extendedState);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL_WITHOUT_VERSION, {
      auth: {
        token: externalState.token
      },
      transports: ['websocket']
    });

    socket.on('online-users', (data) => {
      dispatch({ type: 'ONLINE_USERS', payload: data });
    });

    return () => {
      socket.disconnect();
      socket.off('online-users');
    };
  }, [externalState]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useStore() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useStore must be used inside AppProvider');
  }

  return context;
}
