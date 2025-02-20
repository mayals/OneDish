import { useEffect, useState, useContext } from 'react';
import {AxiosInstance} from "../../api/AxiosInstance"
// context 
import { UserContext } from '../../../src/pages/account_pages/UserContext.jsx';
import { TokenContext }  from '../../../src/pages/account_pages/TokenContext.jsx';
import userIcon from "../../assets/user-svgrepo-com.svg";
import femaleIcon from "../../assets/female-person-2-svgrepo-com.svg"
import maleIcon from "../../assets/male-user-svgrepo-com.svg"


const AdminProfile = () => {

    // Get context values of request user
    const { accessToken } = useContext(TokenContext);
    const { user, role }  = useContext(UserContext);
    
      
    const [profileUserData, setProfileUserData] = useState({
                                                    // profile
                                                    phone_number: '',
                                                    gender:'',
                                                    date_of_birth:'',
                                                    country: '',
                                                    address: '',
                                                    profile_picture: '',
                                                    
                                                    // user
                                                    user: {
                                                        first_name: '',
                                                        last_name: '',
                                                        email: '',
                                                        date_joined: '',
                                                        is_active: false,
                                                        is_staff:false,
                                                        is_superuser: false,
                                                        is_verifiedEmail: false,
                                                        role:''
                                                    },
                                                   
                                        });


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await AxiosInstance.get('/account/request-user-profile/');
                console.log('fetchAdminProfile response=',response)
                setProfileUserData(response.data);
                setLoading(false);
            
            } catch (err) {
                setError('Failed to fetch admin profile');
                setLoading(false);
            }
        };

        fetchAdminProfile();
        console.log('profileUserData=',profileUserData)
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg mx-4 mt-4">
                {error}
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Profile</h2>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    {/* Profile Header */}
                    <div className="flex items-center mb-8">
                        <div className="relative">
                            {profileUserData.profile_picture ?(
                                <img 
                                    src={`http://localhost:8000${profileUserData.profile_picture}`} 
                                    alt="Profile" 
                                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                                />
                            ):(
                                <div className="w-20 h-20 bg-[#fff4e6] rounded-full flex items-center justify-center p-2 border-4 border-[#ffd8a8]">
                                    <img
                                        src={userIcon}
                                        className="w-12 h-12 text-amber-900"
                                        alt="Default Avatar"
                                    />
                                </div>
                            )}
                            {/* edit profile_picture  */}
                            <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1.5">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-6 items-center gap-4">
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                {profileUserData.user.first_name} {profileUserData.user.last_name} 
                                {profileUserData.gender === "female" ? (
                                    <img src={femaleIcon} className="h-[30px] w-[30px]" />
                                ) : (
                                    <img src={maleIcon} className="h-[30px] w-[30px]" />
                                )}
                            </h1>
                            <h1 className="text-gray-600">
                                {profileUserData.user.role}
                            </h1>
                        </div>
                        
                    </div>
                    

                    {/* Profile Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="text-gray-800">{profileUserData.user.email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Date of Birth:</span>
                                    <span className="text-gray-800">
                                        {new Date(profileUserData.date_of_birth).toLocaleDateString()}
                                    </span>
                                </div>

                                <br></br>

                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Information</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Joined Date:</span>
                                    <span className="text-gray-800">
                                        {new Date(user.date_joined).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Last Login:</span>
                                    <span className="text-gray-800">
                                        {new Date(user.last_login).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`px-2 py-1 rounded-full text-sm ${ profileUserData.user.is_active
                                                                                            ? 'bg-green-100 text-green-800' 
                                                                                            : 'bg-red-100 text-red-800'
                                                                                    }`}>
                                        {profileUserData.user.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Phone:</span>
                                    <span className="text-gray-800">
                                        {profileUserData.phone_number || 'Not provided'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Country:</span>
                                    <span className="text-gray-800">
                                        {profileUserData.country || 'Not provided'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Address:</span>
                                    <span className="text-gray-800 text-right">
                                        {profileUserData.address || 'Not provided'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <div className="mt-8 flex justify-end">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminProfile;