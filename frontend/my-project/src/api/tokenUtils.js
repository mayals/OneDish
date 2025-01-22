// Check if the token is expired
//tokenUtils.js
import axios from 'axios';
import dayjs from 'dayjs';
import {jwtDecode} from 'jwt-decode';
import { baseURL } from '../api/Api';

console.log('tokenUtils.js loaded')



//  check accessToken isTokenExpired ? expired : notexpired
export const isTokenExpired = (accessToken) => {
  if (!accessToken) return true;

  const isExpired = dayjs.unix(jwtDecode(accessToken).exp).diff(dayjs()) < 1;
  console.log('isExpired=',isExpired)
  return isExpired;
};




//  get new access token from refresh  token link 
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/auth/token/refresh/`, { refresh: refreshToken,  });
     
    console.log('new access_token from refresh_token link =',response.data.access)
    return response.data.access;
  
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};