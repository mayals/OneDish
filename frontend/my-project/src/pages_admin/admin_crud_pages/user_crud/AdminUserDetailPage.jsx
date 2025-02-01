import React from 'react'

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiUser, FiPhone, FiMapPin, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';


function AdminUserDetailPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500">
//         {error}
//       </div>
//     );
//   }

  return (
    <section>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/users"
          className="mb-4 inline-flex items-center text-gray-600 hover:text-gray-800"
        >
          <FiArrowLeft className="mr-2" /> 
          Back to Users
        </Link>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <div className="flex items-center">
              <div className="relative">
                {profile?.profile_picture ? (
                  <img
                    src={profile.profile_picture}
                    alt={`${user.first_name}'s profile`}
                    className="w-24 h-24 rounded-full border-4 border-white"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-500">
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                )}
              </div>
              <div className="ml-6 text-white">
                <h1 className="text-2xl font-bold">
                  {user.first_name} {user.last_name}
                </h1>
                <p className="mt-1 opacity-90">{user.role}</p>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Personal Information */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center">
                <FiMail className="text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                  <span className="inline-flex items-center mt-1 text-sm">
                    {user.is_verifiedEmail ? (
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

              <div className="flex items-center">
                <FiUser className="text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-600">Account Status</p>
                  <p className="font-medium">
                    {user.is_active ? 'Active' : 'Inactive'} Account
                  </p>
                </div>
              </div>

              {profile && (
                <>
                  <div className="flex items-center">
                    <FiPhone className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-gray-600">Phone Number</p>
                      <p className="font-medium">
                        {profile.phone_number || 'N/A'}
                      </p>
                    </div>
                  </div>

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

            {/* Additional Details */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Joined Date</p>
                <p className="font-medium">
                  {new Date(user.date_joined).toLocaleDateString()}
                </p>
              </div>

              {profile?.date_of_birth && (
                <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Date of Birth</p>
                    <p className="font-medium">
                      {new Date(profile.date_of_birth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {profile?.gender && (
                <div>
                  <p className="text-gray-600">Gender</p>
                  <p className="font-medium capitalize">{profile.gender}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default AdminUserDetailPage;