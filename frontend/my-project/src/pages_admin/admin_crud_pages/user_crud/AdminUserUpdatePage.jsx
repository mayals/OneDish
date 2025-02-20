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







const AdminUserUpdatePage = () =>{
    // navigate
    const navigate = useNavigate();

    // state
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');  
    const [isVerifiedEmail, setIsVerifiedEmail] = useState('');
    const [isActive, setIsActive] = useState('');
    const [userData, setUserData] = useState([]);
    const [email, setEmail] = useState('');
  

   
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
    }, [id]); // Add dependencies here
     
  
    useEffect(() => {
      console.log('userData=', userData)
      if (userData){
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setIsVerifiedEmail(userData.is_verifiedEmail);
        setIsActive(userData.is_active);
        setEmail(userData.email);

      }
    }, [userData]); // Add dependencies here


    ///////////////  FORM FIELDS  --- parse data from form field  
    // firstName field
    const onChangeFirstName = (event) => {
      setFirstName(event.target.value)
      console.log('firstName=', firstName)
    }
    // lastName field
    const onChangeLastName = (event) => {
      setLastName(event.target.value)
      console.log('lastName=', lastName)
    }
    // is_verifiedEmail field
    const onChangeIsVerifiedEmail = (event) => {
      setIsVerifiedEmail(event.target.value)
      console.log('isVerifiedEmail=', isVerifiedEmail)
    }
    // is_active field
    const onChangeIsActive = (event) => {
      setIsActive(event.target.value)
      console.log('isActive=', isActive)
    }
    ////////////////////////////////////////////



    //////////////////////////////  after submit button clicked
    const handleSubmit = async (e) => {
          e.preventDefault();
          // //////////////////////  validate fields ////////////////////////
          
          if(!accessToken){
            navigate('/login')
          }

          //  check firstName  field is not empty
          if (firstName === "" ) {
            notify("Please enter the First Name !","warning");
            return;
          }
          //  check lastName field is not empty
          if (lastName === "" ) {
            notify("Please enter the Last Name !","warning");
            return;
          }
          //  check password is not empty
          if (isVerifiedEmail === "" ) {
            notify("Please enter isVerifiedEmail !","warning");
            return;
          }
          //  check password2 is not empty
          if (isActive === "" ) {
            notify("Please enter isActive !","warning");
            return;
          }
          
          // Create FormData object
          const formData = new FormData();
          formData.append("first_name", firstName );
          formData.append("last_name", lastName);
          formData.append("is_verifiedEmail", isVerifiedEmail);
          formData.append("is_active", isActive);

          // Log the values using the get method
          console.log('formData.first_name=', formData.get('first_name'));
          console.log('formData.last_name=', formData.get('last_name'));
          console.log('formData.is_verifiedEmail=', formData.get('is_verifiedEmail'));
          console.log('formData.is_active=', formData.get('is_active'));
          console.log('formData', formData);

          //  Axios 
          setLoading(true);
          try {
                setLoading(true);
                const response = await AxiosInstance.put(`account/user-update/${id}/`, formData);
                console.log("API update user Response:", response.data); // Add this to verify structure
                setUserData(response.data);

                notify("User update successfully", "success"); 
                setTimeout(() => {
                    // Navigate after the 1.5-second delay
                    navigate("/admin-layout/user-list", { replace: true });
                }, 1500);
                setLoading(false);
                  
          } catch (error) {
                setLoading(false);
                setError('Failed to fetch user data');
                toast.error(error.response?.data?.message || "Failed to update user");
          }

    }


  
    return (
    <section>
   
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          {/* loading  */}
          {loading && <Loading />}
          {/* tostify  */}
          <ToastContainer />

          <h2 className="text-2xl font-semibold mb-4 text-center">Update User</h2>

          {/* Select User */}
          {/* <select
            className="w-full p-2 border rounded-md mb-4"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name} ({user.email})
              </option>
            ))}
          </select> */}
          

          {/* User Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                  disabled
                  type="text"
                  name="email"
                  value={email}
                  className="w-full p-2 border rounded-md bg-yellow-100"
                />
            </div>
            <div>
              <label className="block font-medium">First Name</label>
              <input
                type="text"
                name="first_name"
                value={firstName}
                onChange={onChangeFirstName}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={lastName}
                onChange={onChangeLastName}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block font-medium">Is Verified Email?</label>
              <select
                name="is_verifiedEmail"
                value={isVerifiedEmail} 
                onChange={onChangeIsVerifiedEmail} 
                className="p-2 border rounded-md"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Is Active?</label>
              <select
                name="is_active"
                value={isActive} 
                onChange={onChangeIsActive}
                className="p-2 border rounded-md"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            

            <button
              type="submit"
              className="w-full bg-[#d27556] text-white py-2 rounded-md hover:bg-[#ffd8a8] hover:text-[#d27556] transition"
            >
              Update User
            </button>
          </form>
        </div>

    </section>
  )
}

export default AdminUserUpdatePage;