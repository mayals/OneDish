import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { useParams, Link,  useNavigate } from 'react-router-dom';
// context 
import { UserContext } from '../../../../src/pages/account_pages/UserContext.jsx';
import { TokenContext }  from '../../../../src/pages/account_pages/TokenContext.jsx';
// axios
import {AxiosInstance} from "../../../api/AxiosInstance.js"
// react-toastify
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../common/Loading.jsx"
import notify from "../../../common/UseNotification.js"




const AdminUserDeleteConfirmPage = () => {

     // navigate
     const navigate = useNavigate();

     // state
     const [loading, setLoading] = useState(false); 
     const [error, setError] = useState('');
     const [firstName, setFirstName] = useState('');
     const [lastName, setLastName] = useState('');  
     const [email, setEmail] = useState('');
     const [userData, setUserData] = useState([]);

   
 
    
     // Get context values
     const { accessToken } = useContext(TokenContext);
     const { user, role }  = useContext(UserContext);
 
     if (user && role !== "Admin") {
       console.log('role=',role)
       toast.error( "You have no permission to reach this page"); 
       navigate("/")
     }
 
 
     const { id } = useParams();
     console.log('id=',id)
 
     // fetch selected user 
     useEffect(() => {
       const fetchUser = async () => {
             if (id) {
                 console.log('id=',id)
                   try {
                     setLoading(true);
                     const response = await AxiosInstance.get(`account/user-detail/${id}/`);
                     console.log("fetchUser API Response:", response.data); // Add this to verify structure
                     setUserData(response.data);
                     setLoading(false);
                   
                   } catch (error) {
                     setLoading(false);
                     setError('Failed to fetch user data');
                     toast.error(error.response?.data?.message || "Failed to get user");
                   }
             };
       }
     fetchUser();
     }, [id]); 


     useEffect(() => {
       console.log('userData=', userData)
       if (userData){
         setFirstName(userData.first_name);
         setLastName(userData.last_name);
         setEmail(userData.email);
       }
     }, [userData]); 
 

   
 
 
 
     //////////////////////////////  after submit button clicked
     const handleDelete = async (e) => {
           e.preventDefault();
           // //////////////////////  validate fields ////////////////////////
           
           if(!accessToken){
             navigate('/login')
           }
           
           //  Axios 
           setLoading(true);
           try {
                 setLoading(true);
                 const response = await AxiosInstance.delete(`account/user-delete/${id}/`);
                 console.log("API delete user Response:", response.data);
                 setUserData(response.data);
 
                 notify("User delete successfully", "success"); 
                 setTimeout(() => {
                     // Navigate after the 1.5-second delay
                     navigate("/admin-layout/user-list", { replace: true });
                 }, 1500);
                 setLoading(false);
                   
           } catch (error) {
                 setLoading(false);
                 setError('Failed to delete user data');
                 toast.error(error.response?.data?.message || "Failed to delete user");
           }
 
     }
 
 

    return (
        <section className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          {/* Loading */}
          {loading && <Loading />}
          
          <ToastContainer />
      
          <div className="text-center space-y-4">
            {/* Warning Icon */}
            <div className="mx-auto text-red-500">
              <svg 
                className="w-16 h-16 mx-auto animate-pulse"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
      
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Confirm User Deletion
            </h2>
      
            <p className="text-gray-600 mb-4">
              Are you sure you want to permanently delete this user account? This action cannot be undone.
            </p>
      
            {/* User Details Card */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="font-semibold text-gray-700">Full Name:</span>
                <span className="text-gray-600">{firstName} {lastName}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600 break-all">{email}</span>
              </div>
            </div>
      
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleDelete}
                className="flex-1 py-3 px-6 bg-red-500 hover:bg-red-600 text-white rounded-lg
                         font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Confirm Delete
              </button>
      
              <Link
                to="/users"
                className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg
                         font-medium transition-colors duration-200 text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </section>
    )

}
export default AdminUserDeleteConfirmPage;