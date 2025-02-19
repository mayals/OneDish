import { useEffect, useState, useContext } from 'react';
import {AxiosInstance} from "../../api/AxiosInstance"
// context 
import { UserContext } from '../../../src/pages/account_pages/UserContext.jsx';
import { TokenContext }  from '../../../src/pages/account_pages/TokenContext.jsx';





const UpdateAdminProfile = () => {

    // Get context values of request user 
    const { accessToken } = useContext(TokenContext);
    const { user, role }  = useContext(UserContext);
    
      

    const [profileData, setProfileData] = useState({
                                                    user: {
                                                            first_name: '',
                                                            last_name: '',
                                                            email: '',
                                                    },
                                                    date_of_birth: '',
                                                    gender: '',
                                                    phone_number: '',
                                                    gender: '',
                                                    country: '',
                                                    address: '',
                                                    profile_picture: null,
                                        });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchAdminProfile = async () => {
                    try {
                        const response = await AxiosInstance.get('/account/request-user-profile/');
                        console.log('response=',response)
                        setProfileData(response.data);
                        setLoading(false);
                    
                    } catch (err) {
                        setError('Failed to fetch admin profile');
                        setLoading(false);
                    }
                };
        
        fetchAdminProfile();
    }, []);


    // 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('user.')) {
        setProfileData(prev => ({
            ...prev,
            user: {
                ...prev.user,
                [name.split('.')[1]]: value
            }
        }));
        } else {
            setProfileData(prev => ({
                                    ...prev,
                                    [name]: value
                        }));
        }
    };

    const handleFileChange = (e) => {
        setProfileData(prev => ({
                                ...prev,
                                profile_picture: e.target.files[0]
                            }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            const formData = new FormData();
        
            // Append user data
            formData.append('user.first_name', user.first_name);
            formData.append('user.last_name',  user.last_name);
            
            // Append profile data
            formData.append('date_of_birth', profileData.date_of_birth);
            formData.append('gender', profileData.gender);
            formData.append('phone_number', profileData.phone_number);
            formData.append('country', profileData.country);
            formData.append('address', profileData.address);
            
            if (profileData.profile_picture instanceof File) {
                formData.append('profile_picture', profileData.profile_picture);
            }

            const response = await AxiosInstance.put('/account/update-request-user-profile/', formData);

            setSuccess('Profile updated successfully');
            setProfileData(response.data);
            } catch (err) {
                setError('Failed to update profile');
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;

    return (
        <section className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Profile</h1>
                
                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
                {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input
                        type="text"
                        name="user.first_name"
                        value={user.first_name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    
                    <div>
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input
                        type="text"
                        name="user.last_name"
                        value={user.last_name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-gray-700 mb-2">Date of Birth</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={profileData.date_of_birth}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    
                    <div>
                    <label className="block text-gray-700 mb-2">Gender</label>
                    <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                    type="tel"
                    name="phone_number"
                    value={profileData.phone_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Country</label>
                    <input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Profile Picture</label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update Profile
                </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateAdminProfile;