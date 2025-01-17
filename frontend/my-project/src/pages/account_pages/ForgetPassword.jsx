import React from 'react';

const ForgotPassword = () => {
  return (
    <section
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/top-view-christmas-tableware-with-copy-space_23-2148746072.jpg')",
      }}
      className="min-h-dvh bg-no-repeat w-full flex items-center justify-center bg-cover bg-center relative"
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Forgot Password Form */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-sm w-full mx-4 relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Forgot Password? 🔒</h2>
        <form>
          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-[#bc9b79] hover:bg-[#795548] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>

        {/* Link to Login Page */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Remember your password?{' '}
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

export default ForgotPassword;