import React, {
  createContext
} from 'react';
import { useAuth } from '../hooks/useAuth';
import { IUser } from '../models/User';

type AuthContextType = {
  user: null | IUser;
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
    user, authenticated, loading, handleLogin, handleLogout,
  } = useAuth();

  return (
    <Context.Provider value={{ user, loading, authenticated, handleLogin, handleLogout }}>
      { props.children }
    </Context.Provider>
  );
}

export { Context, AuthProvider };
