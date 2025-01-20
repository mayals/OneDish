import axios from "axios"
import { useState , useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../api/Api.js"
import Loading from "../../Loading";
import notify from "../../common/UseNotification.js"
import { ToastContainer, toast } from 'react-toastify';



const Register = () => {
    // navigate
    const navigate = useNavigate();
    

    // state
    const [loading, setLoading] = useState(false);
    const [email ,setEmail]= useState('')    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');  
    const [password, setPassword] = useState(''); 
    const [password2, setPassword2] = useState('');  
      
    
    
    ///////////////  FORM FIELDS  --- parse data from form field  
    // email field
    const onChangeEmail = (event) => {
          setEmail(event.target.value)
          console.log('email=', email)
    }
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
    // password field
    const onChangePassword = (event) => {
          setPassword(event.target.value)
          console.log('password=', password)
    }
    // password2 field
    const onChangePassword2 = (event) => {
          setPassword2(event.target.value)
          console.log('password2=', password2)
    }
    /////////////// ///////////////  ///////////////



    //////////////////////////////  after submit button clicked
    const handleSubmit = async (e) => {
          e.preventDefault();
          // //////////////////////  validate fields ////////////////////////
          //  check name  field is not empty
          if (email === "" ) {
            notify("Please enter the Email!","warning");
            return;
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
          if (password === "" ) {
            notify("Please enter  Password !","warning");
            return;
          }
          //  check password2 is not empty
          if (password2 === "" ) {
            notify("Please enter Confitrm Password !","warning");
            return;
          }
          //  check password is identical to password2
          if (password !== password2 ) {
            notify("Please enter identical passwords !","warning")
            return;
          }

          
          
          // Create FormData object
          const formData = new FormData();
          formData.append("email", email);
          formData.append("first_name", firstName);
          formData.append("last_name", lastName);
          formData.append("password", password);
          formData.append("password2", password2);

          // Log the values using the get method
          console.log('formData.email=', formData.get('email'));
          console.log('formData.first_name=', formData.get('first_name'));
          console.log('formData.last_name=', formData.get('last_name'));
          console.log('formData.password=', formData.get('password'));
          console.log('formData.password2=', formData.get('password2'));
      


          //  Axios 
          setLoading(true);
          try {
                const response = await axios.post(`${baseURL}/account/register/`, formData, {
                  headers: {
                      'Content-Type': 'application/json', // Ensure the backend knows it's receiving JSON
                    },
                });
                console.log('response.data=',response.data)
                setLoading(false);
                notify("Registration successful!", "success");
                navigate("/verify-email"); // Redirect to login page after successful registration
        
          } catch (error) {
                setLoading(false);
                notify(error.response?.data?.message || "Registration failed!", "error");
          }

    }


    return (
    <>
    {loading && <Loading />} 

    {/* Add the ToastContainer here */}
       <ToastContainer />
    
    
    <section
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/top-view-christmas-tableware-with-copy-space_23-2148746072.jpg')",
      }}
      className="min-h-dvh bg-no-repeat w-full flex items-center justify-center bg-cover bg-center relative"
    >
      {/* Overlay for better readability */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

      {/* Register Form */}
      <div className="my-[20px] bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full mx-4 relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create Your Account 🔐</h2>
        
        
        
        <form noValidate  onSubmit={handleSubmit} >
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              required
              onChange={onChangeEmail}
              />
          </div>

          {/* First Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first_name"
              type="text"
              placeholder="First Name"
              required
              onChange={onChangeFirstName}
            />
          </div>

          {/* Last Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="last_name"
              type="text"
              placeholder="Last Name"
              required
              onChange={onChangeLastName}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              required
              onChange={onChangePassword}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              required
              onChange={onChangePassword2}
            />
          </div>

          {/* Two-Factor Authentication Toggle */}
          {/* <div className="mb-6 flex items-center">
            <input
              className="mr-2 leading-tight"
              id="enable_two_factor_authentication"
              type="checkbox"
            />
            <label className="text-sm text-gray-700" htmlFor="enable_two_factor_authentication">
              Enable Two-Factor Authentication
            </label>
          </div> */}

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-[#bc9b79] hover:bg-[#795548] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

        {/* Link to Login Page */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Already have an account?{' '}
          <a
            className="inline-block align-baseline font-bold text-sm text-[#bc9b79] hover:text-[#795548] transition-colors duration-300"
            href="http://localhost:5173/OneDish/login"
          >
            Login here
          </a>
        </p>
      </div>
    </section>
    </>);
};

export default Register;