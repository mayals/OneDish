import axios from "axios"
import { useState , useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../api/Api.js"
import Loading from "../../Loading.jsx"
import notify from "../../common/UseNotification.js"
import { ToastContainer, toast } from 'react-toastify';



const VerifyEmail = () => {
  // navigate
  const navigate = useNavigate();
    

  // state
  const [loading, setLoading] = useState(false);
  const [email ,setEmail]= useState('')  
 
 
      
    const [timer, setTimer] = useState(30);
    const [otp, setOtp]     = useState("");



/////////////////////////////////////////// send OTP //////////////////////   

      ///////////////  FORM FIELD  --- parse otp from  field
    const onChangeOtp = (event) =>{
        setOtp(event.target.value)
        console.log('otp=', otp)
    }


    //////////////////////////////  after submit button clicked
    const handleSubmitiOtp = async (e) => {
          e.preventDefault();
          // //////////////////////  validate fields ////////////////////////
          //  check name  field is not empty
          if (otp === "" ) {
            notify("Please enter the verification code!","warning");
            return;
          }

          // Create FormData object
          const formData = new FormData();
          formData.append("otp", otp);
          // Log the values using the get method
          console.log('formData.otp=', formData.get('otp'));

          //  Axios 
          setLoading(true);
          try {
                const response = await axios.post(`${baseURL}/account/verify-email/`, formData, {
                                                                                    headers: {
                                                                                        'Content-Type': 'application/json', // Ensure the backend knows it's receiving JSON
                                                                                      },
                                                                                  });
                console.log('response.data=',response.data)
                setLoading(false);
                notify("Verify email done successfully!", "success");
                navigate("/"); // Redirect to login page after successful registration
        
          } catch (error) {
                setLoading(false);
                notify(error.response?.data?.message || "Verify email failed!", "error");
          }

        }
       
       
       



/////////////////////////////////////////// Resend Email ////////////////////// 

      //////////////////// expired otp - Resending verification email //////////////
      // timer 
      useEffect(() => {
            if (timer > 0) {
              const interval = setInterval(() => setTimer(timer - 1), 1000);
              return () => clearInterval(interval);
            }
      }, [timer])


       /// parse email from field
      const onChangeEmail = (event) => {
        setEmail(event.target.value)
        console.log('email=', email)
      }
       

      const handleSubmitResendEmail = async (e)  => {
              e.preventDefault();
              if (timer === 0) {
                // Add logic to resend the verification email
                //  Axios 
                setLoading(true);

              
                try {
                      const response = await axios.get(`${baseURL}/account/resend-otp/${email}/`, {
                        headers: {
                            'Content-Type': 'application/json', // Ensure the backend knows it's receiving JSON
                          },
                      });
                      console.log('response.data=',response.data)
                      setLoading(false);
                      notify("A passcode has been sent to verify your email!", "success");
                      navigate("/verify-email"); // Redirect to login page after successful registration

                } catch (error) {
                      setLoading(false);
                      notify(error.response?.data?.message || "re sending email of passcode failed!", "error");
                }


                console.log('Resending verification email...');
                setTimer(30); // Reset the timer
              }
      };
      // /////////////////////// // ///////////////////////
 

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


            {/* Verify Email Form */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-sm w-full mx-4 relative z-10"> 
            
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Verify Your Email 📧</h2>
            <p className="text-gray-700 text-sm mb-6 text-center">
              We've sent a verification code to your email address. Please check your inbox, insert your given code in the field below.
            </p>
                  
            <form noValidate  onSubmit={handleSubmitiOtp} >
                  {/* send otp form */}
                    
                      <label className="block text-gray-700 text-xsm font-bold mb-2 mr-3" htmlFor="otp">
                          Verification Code
                      </label>

                      <div className='flex flex-row items-center'> 
                          {/* Email Field */}
                          <div className="mb-4">
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="otp"
                                  type="text"
                                  placeholder="0000"
                                  required
                                  onChange={onChangeOtp}
                                  />
                            </div>
                            <div >
                                <button
                                  className="bg-[#bc9b79] hover:bg-[#795548] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                                  type="submit"
                                >
                                  Send
                                </button>
                            </div>
                      </div>    
                  </form>

              
                  <br></br>
                  <hr></hr>
                  <br></br>


                  {/* Resend Verification Email Button */}
                  <div className="mb-6">
                      
                  <form>
                          <div>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="email"
                                  type="email"
                                  placeholder="Email"
                                  required
                                  onChange={onChangeEmail}
                                />
                            </div>

                            <br></br>

                            <button
                                  className="bg-[#bc9b79] hover:bg-[#795548] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300"
                                  type="button"
                                  onClick={handleSubmitResendEmail}
                                  disabled={timer > 0}
                            >
                                  {timer > 0 ? `Resend in ${timer}s` : 'Resend Verification Email'}
                            </button>
                      </form> 
                  </div>

                  
                  
                


                  {/* Link to Login Page */}
                  <div>
                      <p className="text-center text-gray-500 text-xs mt-6">
                        Already verified?{' '}
                        <a
                          className="inline-block align-baseline font-bold text-sm text-[#bc9b79] hover:text-[#795548] transition-colors duration-300"
                          href="http://localhost:5173/OneDish/login"
                        >
                          Login here
                        </a>
                      </p>
                  </div>

          </div>
        </section>
      );


};
export default VerifyEmail;
