import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiUser, FiPhone, FiMapPin, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
// context 
import { UserContext } from '../../../../src/pages/account_pages/UserContext.jsx';
import { TokenContext }  from '../../../../src/pages/account_pages/TokenContext.jsx';
// axios
import {AxiosInstance} from "../../../api/AxiosInstance.js"
// react-toastify
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../common/Loading.jsx"


const AdminUserDetailPage = () => {
    const { id } = useParams();
    console.log('id=',id)

    const [profile, setProfile] = useState(null);
    //   const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');



    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    
    // Get context values
    const { accessToken } = useContext(TokenContext);
    const { user, role }  = useContext(UserContext);

  



  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.role === "Admin") {
        console.log('user.role=',user.rule)
        
        try {
          setLoading(true);
          const response = await AxiosInstance.get(`account/user-detail/${id}/`);
          console.log("API Response:", response.data); // Add this to verify structure
          setUserData(response.data);
          setProfile(response.data.profile)
          setLoading(false);
        
        } catch (error) {
          setLoading(false);
          setError('Failed to fetch user data');
          toast.error(error.response?.data?.message || "Failed to load users");
        }
      
    }else{toast.error("only admin can view this page");}
    };

    fetchUser();
  }, [id]); // Add dependencies here




  //   useEffect(() => {
    
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`/api/users/${userId}/`);
//         const data = await response.json();
        
//         setUser(data.user);
//         setProfile(data.profile);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch user data');
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }



  return (
    <section>
     {loading && <Loading />}
     <ToastContainer />
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/admin-layout/user-list" 
          className="mb-4 inline-flex items-center text-gray-600 hover:text-gray-800"
        >
          <FiArrowLeft className="mr-2" /> 
          Back to Users List
        </Link>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-yellow-700 to-yellow-800 p-6">
            <div className="flex items-center">
             
              <div className="relative">
                {userData.profile?.profile_picture ? (
                  <img
                    src={`http://localhost:8000${userData.profile.profile_picture}`}
                    alt={`${userData.first_name}'s profile`}
                    className="w-24 h-24 rounded-full border-4 border-white"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-500">
                    {userData.first_name?.[0]}{userData.last_name?.[0]}
                  </div>
                )}
              </div>

              <div className="ml-6 text-white">
                <h1 className="text-2xl font-bold">
                  {userData.first_name} {userData.last_name}
                </h1>
                <p className="mt-1 opacity-90">{userData.role}</p>
              </div>

            </div>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* Personal Information */}
                <div className="md:col-span-2 space-y-4">
                    {/* email */}
                    <div className="flex items-center">
                        <FiMail className="text-gray-400 mr-3" />
                        <div>
                        <p className="text-gray-600">Email</p>
                        <p className="font-medium">{userData.email}</p>
                        <span className="inline-flex items-center mt-1 text-sm">
                            {userData.is_verifiedEmail ? (
                            <>
                                <FiCheckCircle className="text-green-500 mr-1" />
                                <span className="text-green-600">Verified</span>
                            </>
                            ) : (
                            <>
                                <FiXCircle className="text-red-500 mr-1" />
                                <span className="text-red-600">Not Verified</span>
                            </>
                            )}
                        </span>
                        </div>
                    </div>
                    {/* status */}
                    <div className="flex items-center">
                        <FiUser className="text-gray-400 mr-3" />
                        <div>
                            <p className="text-gray-600">Account Status</p>
                            <span className="inline-flex items-center mt-1 text-sm">
                                {userData.is_active ? (
                                <>
                                    <FiCheckCircle className="text-green-500 mr-1" />
                                    <span className="text-green-600">Active</span>
                                </>
                                ) : (
                                <>
                                    <FiXCircle className="text-red-500 mr-1" />
                                    <span className="text-red-600">Inactive</span>
                                </>
                                )}
                            </span>
                        </div> 
                    </div>

                   <br></br>

                    {profile && (
                        <>
                        {/* phone */}
                        <div className="flex items-center">
                            <FiPhone className="text-gray-400 mr-3" />
                            <div>
                            <p className="text-gray-600">Phone Number</p>
                            <p className="font-medium">
                                {profile.phone_number || 'N/A'}
                            </p>
                            </div>
                        </div>
                        {/* location */}
                        <div className="flex items-center">
                            <FiMapPin className="text-gray-400 mr-3" />
                            <div>
                            <p className="text-gray-600">Location</p>
                            <p className="font-medium">
                                {profile.address || 'N/A'}, {profile.country || 'N/A'}
                            </p>
                            </div>
                        </div>
                        </>
                    )}
                </div>

                <br></br>

                {/* Additional Details */}
                {userData.date_joined && (
                <div className="flex items-center">
                    <FiCalendar className="text-gray-400 mr-3" />
                    <div>
                        <p className="text-gray-600">Joined Date</p>
                        <p className="font-medium">
                           {new Date(userData.date_joined).toLocaleDateString()}
                        </p>
                    </div>    
                </div>
              )}

              {userData.last_login && (
              <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Last Login</p>
                    <p className="font-medium">
                      {new Date(userData.last_login).toLocaleDateString()}
                    </p>
                  </div>
              </div>
              )}


              <br></br>
              {userData.profile?.date_of_birth && (
              <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Date of Birth</p>
                    <p className="font-medium">
                      {new Date(userData.profile.date_of_birth).toLocaleDateString()}
                    </p>
                  </div>
              </div>
              )}

              {userData.profile?.gender && (
              <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Gender</p>
                    <p className="font-medium">
                       {userData.profile.gender}
                    </p>
                  </div>
              </div>
              )}
              
              
            </div>
          </div>
        </div>
      </div>
   
  </section>
  )
}

export default AdminUserDetailPage;