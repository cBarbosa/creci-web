import axios from 'axios';
import { toast } from 'react-toastify';

const API_URI = import.meta.env.VITE_API_URI;

const axiosService = axios.create({
    baseURL: API_URI
});


    // if (token) {
    //   api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
    //   setAuthenticated(true);
    // }

axiosService.interceptors.request.use(
    async config => {
        const value = await config;
        // console.debug('InterceptorRequest',value);
        const token = localStorage.getItem('token');
        if(token) {
            config.headers = {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'Accept': 'application/json'
          }
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

axiosService.interceptors.response.use((response) => {
// console.debug('InterceptorResponse', response);
    return response;
}, async (error) => {
    
    const originalRequest = error.config;
    // console.debug('InterceptorResponse', `error response interceptor`, originalRequest);

    console.debug('responseError', error);

    if(error.message === 'Network Error' && !error.response) {
        toast.error(`Netowrk error - make sure API is running`);
        return Promise.reject(error);
    }
    
    const {status, data, config} = error.response;

    if(status === 401 && (data?.message === '' || data?.message === undefined)) {
        toast.error(`Você não está mais logado no sistema.`);
        // history.replace('/login');
        return Promise.reject(error);
    }

    if(status === 404) {
        toast.error(`not found`);
        // history.replace('/404');
        return Promise.reject(error);
    }
    
    if(status === 400 && config.method ==='get' && data.errors.hasOwnProperty('id')) {
        toast.error(`not found`);
        return Promise.reject(error);
    }
    
    if(status === 500) {
        toast.error(`Server error - check the terminal for more info!`);
        return Promise.reject(error);
    }

    toast.error(data.message);
    return Promise.reject(error);
});


export default axiosService;
