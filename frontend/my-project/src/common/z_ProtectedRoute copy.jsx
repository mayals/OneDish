import React, { useEffect, useState, useContext } from 'react';
// routes/ProtectedRoute.js
import {  Outlet } from 'react-router-dom';
// context 
import { UserContext } from '../../my-project/src/pages/account_pages/UserContext.jsx';
import { TokenContext }       from '../../my-project/src/pages/account_pages/TokenContext';
// axios
import {AxiosInstance} from '../../my-project/src/api/AxiosInstance.js';

import { ToastContainer, toast } from "react-toastify";
import Loading from "../src/Loading.jsx"



const ProtectedRoute = ({ allowedRoles,children }) => {
       const [loading, setLoading] = useState(false);

        // Get tokens
        const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useContext(TokenContext); 

        // Get user
        const { user, role, setUser, setRole} = useContext(UserContext);

        console.log('from context user=',user);
        console.log('from context role=',role);
        console.log('from context accessToken=', accessToken);
        

     
        

        // Set tokens from localStorage on initial render
        // useEffect(() => {
        // setAccessToken(localStorage.getItem('accessToken'));
        // setRefreshToken(localStorage.getItem('refreshToken'));
        // }, [ ]);
       


        // // Fetch user data when accessToken changes
        // useEffect(() => {
        // const fetchUserData = async () => {
        //         if (accessToken) {
        //                 console.log('Access Token exists:', accessToken);
        //                 setLoading(true);
                
        //                 //  response.data
        //                 try {
        //                         const response = await AxiosInstance.get('/account/request-user/');
        //                         setUser(response.data);
        //                         setRole(response.data.role);
        //                         console.log('User data from API:', response.data);
        //                         setLoading(false);
        //                         toast("response successful!", { type: "success" });
                        
                                


        //                 // response.error 
        //                 } catch (error) {
        //                         setLoading(false);
        //                         toast(error.response?.data?.message || "response failed!", { type: "error" });
        //                 }
        //         }
              
        // };
        // fetchUserData();
        // }, [accessToken, setUser]);
       

        
        if (role){
                console.log('role=',role)
                if (!allowedRoles.includes([role])){
                return children ? children : <Outlet />
                }      
        }


}
export default ProtectedRoute;