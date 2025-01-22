// utils/AxiosInstance.js
// utils/AxiosInstance.js
import axios from 'axios';
import { isTokenExpired, refreshAccessToken } from './tokenUtils';

console.log('AxiosInstance.js loaded');


import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = "http://127.0.0.1:8000/";



let accessToken  = localStorage.getItem('accessToken')
console.log('accessToken',accessToken)
let refreshToken = localStorage.getItem('refreshToken')
console.log('refreshToken',refreshToken)


//  default backend endpoint without Authorization (visitor) no accessToken(allow any)
//  // 'Content-Type': 'application/json',  no image post
export const AxiosDefault = axios.create({
                                  baseURL: baseURL,
                                  headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            // no image post
                                            // 'Content-Type' : 'multipart/form-data',
                                            //  no need authenticated 
                                            // 'Authorization': `Bearer ${accessToken}`, // Correct template literal
                                          },
                                  }
                                );


//  for Authorization - permission is authenticated backend endpoint (only authenticated)
// 'Content-Type' : 'multipart/form-data',  -- with image 
export const AxiosInstance = axios.create({
                                  baseURL: baseURL,
                                  headers: {
                                            'Accept': 'application/json',
                                            // 'Content-Type': 'application/json',
                                            'Content-Type' : 'multipart/form-data',
                                            'Authorization': `Bearer ${accessToken}`, // Correct template literal
                                          },
                                  }
);



// interceptors
AxiosInstance.interceptors.request.use(
                                    async(config) => {
                                    console.log('config',config);
                                                  let token = localStorage.getItem('accessToken')// get access_token directly from local storage
                                                  console.log('token FROM LOCALSTORAGE',token)
                                                  if (token) {
                                                      const user = jwtDecode(token);
                                                      console.log('user from jwtDecode',user)
                                                      // check if accessToken  in localstate is expired
                                                      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
                                                      
                                                      //  false  ---> token not expired 
                                                      if (!isExpired) {
                                                            //  isExpired == false
                                                            console.log('Token in localstorage is NOT EXPIRE');
                                                            config.headers['Authorization'] =`Bearer ${token}`;   // return config without need change
                                                            return config; 
                                                     
                                                     
                                                      } try {
                                                      // true -->  isExpired == true
                                                            console.log('Token in localstorage is EXPIRE');
                                                            let token = localStorage.getItem('accessToken')// get access_token directly from local storage
                                                            console.log('OLD AccessToken FROM LOCALSTORAGE',token)
                                                            //  SO accessToken in localstorage must be renew from refresh_token
                                                            let refreshToken = localStorage.getItem('refreshToken')
                                                            console.log('refreshToken in localstorage',refreshToken)
                                                            
                                                            const response = await axios.post(`${baseURL}/api/v1/auth/token/refresh/`, { refresh: refreshToken }); 
                                                            localStorage.setItem('accessToken', response.data.access);
                                                            console.log('NEW accessToken after interceptors',response.data.access)
                                                            config.headers['Authorization'] = `Bearer ${response.data.access}`;
                                                            // console.log('config',config);
                                                            return config;    // return config after change 
                                                            
                                                            // api response error in change expired token 
                                                            } catch (error) {
                                                              console.log('Failed to refresh token:', error);
                                                              localStorage.clear();
                                                              return Promise.reject(error);
                                                            }
                                                        
                                                  }
                                                  //  if no token accessToken  in  localStorage 
                                                  console.log('config',config);
                                                  return config;  // return config when no token found in local storage
                                    }
                                    
);
