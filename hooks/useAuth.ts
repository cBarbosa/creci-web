import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

import api from '../services/api';

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  const handleLogin = async (username:string, password: string) => {

    if(!username || !password)
      window.alert('Não autenticou');
      // toast.error('Não autenticou');

    try {
      const { data: { data: { accessToken } } } = await api.post('/api/Authentication', {
        'userName': username,
        'password': password
      });

      localStorage.setItem('token', JSON.stringify(accessToken));
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      setAuthenticated(true);
      navigate('/app', { replace: true });

    } catch (error) {
      // throw Error(error);
      // toast.error(error);
      console.log(error);
    }
  }

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = `${undefined}`;
    navigate('/login',  { replace: true });
  }

  return { authenticated, loading, handleLogin, handleLogout };
}
