import { useContext } from 'react';
// routes/ProtectedRoute.js
import {  Outlet } from 'react-router-dom';
// context 
import { UserContext } from '../../my-project/src/pages/account_pages/UserContext.jsx';
import { TokenContext }       from '../../my-project/src/pages/account_pages/TokenContext';




const ProtectedRoute = ({ allowedRoles,children }) => {

        // Get tokens
        const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useContext(TokenContext); 

        // Get user
        const { user, role, setUser, setRole} = useContext(UserContext);

        console.log('from context accessToken=', accessToken);
        console.log('from context user=',user);
        console.log('from context role=',role);
       
        

        // allowedRoles
        if (role){
                console.log('from context role=',role)
                if (!allowedRoles.includes([role])){
                                                    return children ? children : <Outlet />
                }      
        }


}
export default ProtectedRoute;