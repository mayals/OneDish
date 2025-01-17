import React from 'react';

const VerifyEmail = () => {
 
 
 
  const [timer, setTimer] = React.useState(30);

  React.useEffect(() => {
          if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
          }
  }, [timer]);
  



  const handleResendEmail = () => {
          if (timer === 0) {
            // Add logic to resend the verification email
            console.log('Resending verification email...');
            setTimer(30); // Reset the timer
          }
  };
 
 
 
 
 
 
 
 
 
 
 
  return (
    <section
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/top-view-christmas-tableware-with-copy-space_23-2148746072.jpg')",
      }}
      className="min-h-dvh bg-no-repeat w-full flex items-center justify-center bg-cover bg-center relative"
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Verify Email Form */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-sm w-full mx-4 relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Verify Your Email 📧</h2>
        <p className="text-gray-700 text-sm mb-6 text-center">
          We've sent a verification link to your email address. Please check your inbox and click on the link to verify your email.
        </p>

        {/* Resend Verification Email Button */}
        <div className="mb-6">
            <button
                  className="bg-[#bc9b79] hover:bg-[#795548] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300"
                  type="button"
                  onClick={handleResendEmail}
                  disabled={timer > 0}
            >
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend Verification Email'}
            </button>
        </div>

        {/* Link to Login Page */}
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
    </section>
  );
};

export default VerifyEmail;
