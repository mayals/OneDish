import { useEffect } from 'react';
import { useContext } from 'react';
// routes/ProtectedRoute.js
import {  Outlet } from 'react-router-dom';
// context 
import { UserContext } from '../pages/account_pages/UserContext';
import { TokenContext } from '../pages/account_pages/TokenContext';
// navigate
import { useNavigate } from 'react-router-dom';
// react-toastify
import { ToastContainer, toast } from "react-toastify";


const ProtectedRoute = ({ allowedRoles,children }) => {

        const navigate = useNavigate()

        // check if there is token in localStorage
        useEffect(() => {
                const storedAccessToken  = localStorage.getItem('accessToken');
                const storedRefreshToken = localStorage.getItem('refreshToken');

                if (!storedAccessToken && !storedRefreshToken) {
                        toast.error("Need login, No token available!");
                        navigate('/login') 
                }
        }, []);
        
        
        // Get tokens from context
        const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useContext(TokenContext); 

        // Get user from context
        const { user, role, setUser, setRole} = useContext(UserContext);

        console.log('ProtectedRoute from context accessToken=', accessToken);
        console.log('ProtectedRoute from context user=',user);
        console.log('ProtectedRoute from context role=',role);

        // allowedRoles
        if (role){
                console.log('from context role=',role)
                if (!allowedRoles.includes([role])){
                                                    return children ? children : <Outlet />
                }      
        }


}
export default ProtectedRoute;