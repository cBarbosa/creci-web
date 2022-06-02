import React, {
  createContext,
  ReactNode
} from 'react';

import { useAuth } from '../hooks/useAuth';

type AuthContextType = {
  loading: boolean;
  authenticated: boolean;
  handleLogin: (username:string, password:string) => Promise<void>;
  handleLogout: () => void;
};

type AuthContextProviderProps = {
  children: JSX.Element;
};

const Context = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider(props: AuthContextProviderProps) {
  const {
    authenticated, loading, handleLogin, handleLogout,
  } = useAuth();

  return (
    <Context.Provider value={{ loading, authenticated, handleLogin, handleLogout }}>
      { props.children }
    </Context.Provider>
  );
}

export { Context, AuthProvider };
