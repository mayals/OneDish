import axios from "axios"
import { useState , useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../api/Api.js"
import Loading from "../../Loading";
import notify from "../../common/UseNotification.js"
import { ToastContainer, toast } from 'react-toastify';




const Login = () => {



  const navigate = useNavigate();
    

  // state
  const [loading, setLoading] = useState(false);
  const [email ,setEmail]= useState('')    
  const [password, setPassword] = useState(''); 
  
    
  
  
  ///////////////  FORM FIELDS  --- parse data from form field  
  // email field
  const onChangeEmail = (event) => {
        setEmail(event.target.value)
        console.log('email=', email)
  }
  // password field
  const onChangePassword = (event) => {
        setPassword(event.target.value)
        console.log('password=', password)
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
        //  check password is not empty
        if (password === "" ) {
          notify("Please enter  Password !","warning");
          return;
        }
        ///////////////////////////////////////////////////////////////////

        
        
        // Create FormData object
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
       
        // Log the values using the get method
        console.log('formData.email=', formData.get('email'));
        console.log('formData.password=', formData.get('password'));
        ///////////////////////////////////////////////////////////////////
    


        //  Axios 
        setLoading(true);
        try {
              const response = await axios.post(`${baseURL}/account/login/`,formData, {
                headers: {
                    'Content-Type': 'application/json', // Ensure the backend knows it's receiving JSON
                  },
              });
              console.log('response.data=',response.data)
              
              localStorage.setItem('refreshToken',response.data.access_token);
              localStorage.setItem('accessToken',response.data.refresh_token);
              console.log('refreshToken=',response.data.access_token)
              console.log('accessToken=',response.data.refresh_token)

              setLoading(false);
              notify("Login successful!", "success");
              navigate("/"); // Redirect to login page after successful registration
      
        } catch (error) {
              setLoading(false);
              notify(error.response?.data?.message || "Login failed!", "error");
        }

  }

   
  
  
  return (
      <section
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/top-view-christmas-tableware-with-copy-space_23-2148746072.jpg')",
        }}
        className="min-h-dvh bg-no-repeat w-full flex items-center justify-center bg-cover bg-center relative"
      >
      {loading && <Loading />} 

        {/* Add the ToastContainer here */}
          <ToastContainer />

        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
        {/* Login Form */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-sm w-full mx-4 relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Welcome Back! 👨🏽‍🍳</h2>
          
          
          <form  noValidate  onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                required
                onChange={onChangeEmail}
              />
            </div>
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
            <div className="flex items-center justify-between">
              <button
                className="bg-[#bc9b79] hover:bg-[#795548] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-[#bc9b79] hover:text-[#795548] transition-colors duration-300"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs mt-6">
            Don't have an account ?  <a className="inline-block align-baseline font-bold text-sm text-[#bc9b79] hover:text-[#795548] transition-colors duration-300"
                href="http://localhost:5173/OneDish/register">Register here</a>
          </p>
        </div>
      </section>
    );
  };
  
  export default Login;