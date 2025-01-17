// routes/ProtectedRoute.js
import {  Outlet } from 'react-router-dom';
import { useEffect} from 'react';


const ProtectedRoute = ({ allowedRoles,children }) => {
        

      
    


        let accessToken = localStorage.getItem('accessToken') || null;
       
        useEffect(() => {
             if (accessToken){
                dispatch(fetchRequestUserAction());
             }
        }, [accessToken,dispatch]);
    
        const { role } = useSelector((state) => state.authSlRed);
        // Get data from Redux
         console.log('role=',role)

        
        if (role){

                if (!allowedRoles.includes([role])){
                // console.log('allowedRoles=',allowedRoles)
                // console.log('loginSl_data.role=',loginSl_data.role)
                return children ? children : <Outlet />
                }      
        }


}
export default ProtectedRoute;