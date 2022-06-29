import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IUser } from '../models/User';
import api from '../services/api';

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = React.useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStorage = localStorage.getItem('user');

    if (token && userStorage) {
      api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
      setUser(JSON.parse(userStorage));
    }

    setLoading(false);
  }, []);

  const handleLogin = async (username:string, password: string) => {

    if(!username || !password) {
      toast.error('Não autenticou');
    }

    try {
      const { data: { data: { accessToken, userData } } } = await api.post('/api/Authentication', {
        'userName': username,
        'password': password
      });

      localStorage.setItem('token', JSON.stringify(accessToken));
      localStorage.setItem('user', JSON.stringify(userData as IUser));
      // atob('sdf');
      // btoa('dsfsfd');
      // api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      setUser(userData as IUser);
      setAuthenticated(true);
      navigate('/app', { replace: true });
    } catch (error) {
      // throw Error(error);
      toast.error(`Credenciais de entrada inválidas, favor revisar`);
    }
  }

  const handleLogout = async () => {
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.defaults.headers.common['Authorization'] = `${undefined}`;
    navigate('/login',  { replace: true });
  }

  return {
    user,
    authenticated,
    loading,
    handleLogin,
    handleLogout
  };
}
