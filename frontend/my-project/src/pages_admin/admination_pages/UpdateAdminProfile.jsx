import { useEffect, useState, useContext } from 'react';
import { useParams, Link,  useNavigate } from 'react-router-dom';
import {AxiosInstance} from "../../api/AxiosInstance"
// context 
import { UserContext } from '../../../src/pages/account_pages/UserContext.jsx';
import { TokenContext }  from '../../../src/pages/account_pages/TokenContext.jsx';
import notify from "../../common/UseNotification.js"




const UpdateAdminProfile = () => {

    const navigate = useNavigate()

    // Get context values of request user 
    const { accessToken } = useContext(TokenContext);
    const { user, role }  = useContext(UserContext);
    
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);  

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
                                                         // read only fields
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
    const [success, setSuccess] = useState('');

    const genderList = [
                       { id:1, name:'Female', value:'F'},
                       { id:2, name:'Male', value: 'M'}
                    ]
    

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


    // 
    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        if (e.target.name.startsWith('user.')) {
            setProfileUserData(prev => ({
            ...prev,
            user: {
                ...prev.user,
                [e.target.name.split('.')[1]]: e.target.value
            }
        }));
        } else {
            setProfileUserData(prev => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                        }));
        }
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
                setProfileUserData(prev => ({
                                    ...prev,
                                    profile_picture:file
                                  }));
        // Create a local URL for the preview
        setProfilePicturePreview(URL.createObjectURL(file));
        };
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if(!accessToken){
            navigate('/login')
        }

        if (profileUserData.user.first_name === "") {
            notify("Please enter the First Name!", "warning");
            return;
        }
        if (profileUserData.user.last_name === "") {
            notify("Please enter the Last Name!", "warning");
            return;
        }
        if (profileUserData.date_of_birth === "") {
            notify("Please enter Date of Birth!", "warning");
            return;
        }
        if (profileUserData.gender === "") {
            notify("Please select a Gender!", "warning");
            return;
        }
        if (profileUserData.phone_number === "") {
            notify("Please enter the Phone Number!", "warning");
            return;
        }
        if (profileUserData.country === "") {
            notify("Please enter Country!", "warning");
            return;
        }
        if (profileUserData.address === "") {
            notify("Please enter Address!", "warning");
            return;
        }


        try {
            const formData = new FormData();
        
            // Append user data
            formData.append('user.first_name', profileUserData.user.first_name);
            formData.append('user.last_name',  profileUserData.user.last_name);
            
            // Append profile data

            // Convert Date of Birth to YYYY-MM-DD format
            // This ensures that if the date contains time (YYYY-MM-DDTHH:mm:ss), it gets trimmed to YYYY-MM-DD.
            const formattedDate = profileUserData.date_of_birth.split('T')[0]; 
            formData.append('date_of_birth', formattedDate);
            formData.append('gender', profileUserData.gender);
            formData.append('phone_number', profileUserData.phone_number);
            formData.append('country', profileUserData.country);
            formData.append('address', profileUserData.address);
            
            if (profileUserData.profile_picture instanceof File) {
                formData.append('profile_picture', profileUserData.profile_picture);
            }

            const response = await AxiosInstance.put('/account/update-request-user-profile/', formData);

            setSuccess('Profile updated successfully');
            setProfileUserData(response.data);
            } catch (err) {
                setError('Failed to update profile');
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;

    return (
        <section className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Update Admin Profile</h1>
                
                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
                {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/*  first name */}
                            <div>
                                <label className="block text-gray-700 mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="user.first_name"
                                    value={profileUserData.user.first_name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* last name */}
                            <div>
                                <label className="block text-gray-700 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="user.last_name"
                                    value={profileUserData.user.last_name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        
                        {/* email  */}
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                            type="email"
                            value={profileUserData.user.email}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        
                        {/* date of birth  */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={profileUserData.date_of_birth}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* gender */}
                            <div>
                                <label className="block text-gray-700 mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={profileUserData.gender}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {/* <option value={profileUserData.gender}>{profileUserData.gender}</option> */}
                                    {
                                        (genderList.map((item) => {
                                                            return (
                                                                <option key={item.id} value={item.value}>{item.name}</option>
                                                            )
                                                        }
                                        ))
                                    }
                                </select>
                            
                            </div>
                        </div>



                        {/* phone number */}
                        <div>
                            <label className="block text-gray-700 mb-2">Phone Number</label>
                            <input
                            type="tel"
                            name="phone_number"
                            value={profileUserData.phone_number}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/*  countory */}
                        <div>
                            <label className="block text-gray-700 mb-2">Country</label>
                            <input
                            type="text"
                            name="country"
                            value={profileUserData.country}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/*  adress  */}
                        <div>
                            <label className="block text-gray-700 mb-2">Address</label>
                            <textarea
                            name="address"
                            value={profileUserData.address}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            />
                        </div>

                        {/* profile_picture */}
                        <div>
                            <label htmlFor="profile_picture" className="text-gray-700">
                                <div className='relative'>
                                    <div>
                                        <span>Profile Picture</span>  
                                        <img
                                            className="size-20 bg-white rounded-full mb-4 shrink-0 border-2 border-[#d0ccc6]"
                                            src={ profilePicturePreview || `http://localhost:8000${profileUserData.profile_picture}`}            
                                            alt="Current Profile Picture"
                                           
                                        />
                                    </div>
                                    {/* edit profile_picture  */}
                                    <div className="absolute bottom-0 ml-[60px] bg-[#c77054] text-white rounded-full p-1.5"  style={{ cursor: 'pointer' }}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>
                                </div>
                            </label>
                            {/* <input 
                                id="profile_picture"
                                type="file" 
                                required 
                                name="profile_picture" 
                                onChange={handleFileChange} 
                                className="w-full p-2 border rounded" 
                                accept="image/*"
                            /> */}
                            <input
                                id="profile_picture"
                                type="file"
                                required 
                                name="profile_picture" 
                                onChange={handleFileChange}
                                className="file:mr-4 file:rounded-full file:border-0 file:bg-yellow-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-yellow-700 hover:file:bg-yellow-100 dark:file:bg-yellow-600 dark:file:text-yellow-100 dark:hover:file:bg-yellow-500"
                                accept="image/*"
                            />
                        </div>


                        {/* <div>
                            <label className="block text-gray-700 mb-2">Profile Picture</label>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded"
                            />
                        </div> */}



                        <button
                            type="submit"
                            className="w-full bg-[#c77054] hover:bg-[#724130] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update Profile
                        </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateAdminProfile;