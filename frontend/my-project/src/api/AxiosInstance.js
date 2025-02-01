// api/AxiosInstance.js
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';




console.log('AxiosInstance.js loaded');

const baseURL = "http://127.0.0.1:8000/";



//  no image post
export const AxiosDefault = axios.create({
    baseURL: baseURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', //  no image post
    },
});

// for image post
export const AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data', // for image post
    },
});




// interceptors
AxiosInstance.interceptors.request.use(
    async (config) => {
        console.log('config', config);
        let token = localStorage.getItem('accessToken');
        console.log('accessToken FROM LOCALSTORAGE=', token);
        
        if (token) {
            const user = jwtDecode(token);
            console.log('user from jwtDecode=', user);
            
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            
            if (!isExpired) {
                console.log('Token in localstorage is NOT EXPIRE');
                config.headers['Authorization'] = `Bearer ${token}`;
                return config;
            } else {
                console.log('Token in localstorage is EXPIRE');
                const refreshToken = localStorage.getItem('refreshToken');
                
                // Check if refresh token exists
                if (!refreshToken) {
                    console.log('No refresh token available');
                    localStorage.clear();
                    // Optionally redirect to login page here
                    return Promise.reject(new Error('Authentication expired - please login again'));
                }

                try {
                    console.log('Attempting token refresh...');
                    const response = await axios.post(`${baseURL}/account/token/refresh/`, { 
                        refresh: refreshToken 
                    });
                    
                    localStorage.setItem('accessToken', response.data.access);
                    console.log('NEW accessToken after refresh', response.data.access);

                    config.headers['Authorization'] = `Bearer ${response.data.access}`;
                    return config;
                } catch (error) {
                    console.log('Failed to refresh token:', error);
                    localStorage.clear();
                    // Optionally redirect to login page here
                    return Promise.reject(error);
                }
            }
        }
        
        console.log('No token found in local storage');
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);