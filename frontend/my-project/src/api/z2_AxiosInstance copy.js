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
        let token = localStorage.getItem('accessToken');  // Get access_token directly from local storage
        console.log('accessToken  FROM LOCALSTORAGE=', token);
        
        if (token) {
            const user = jwtDecode(token);
            console.log('user from jwtDecode=', user);
            
            // Check if accessToken in local storage is expired
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            
            if (!isExpired) {
                // Token is not expired
                console.log('Token in localstorage is NOT EXPIRE');
                config.headers['Authorization'] = `Bearer ${token}`;
                return config;
            } else {
                // Token is expired, try to refresh it
                console.log('Token in localstorage is EXPIRE');
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    console.log('refreshToken in localstorage', refreshToken);
                    
                    const response = await axios.post(`${baseURL}/account/token/refresh/`, { refresh: refreshToken });
                    console.log('response interceptors', response);
                    // update -- accessToken --refreshToken in localStorage
                    localStorage.setItem('accessToken', response.data.access);
                    console.log('NEW accessToken after interceptors', response.data.access);

                    // update      -- config.headers['Authorization']
                    config.headers['Authorization'] = `Bearer ${response.data.access}`;
                    return config;


                } catch (error) {
                    console.log('Failed to refresh token:', error);
                    localStorage.clear();
                    return Promise.reject(error);
                }
            }
        }
        
        // If no token is found in local storage
        console.log('No token found in local storage');
        return config;
    }
);