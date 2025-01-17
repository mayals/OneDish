import React from 'react';

const Register = () => {
  return (
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
        <form>
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
            />
          </div>

          {/* Two-Factor Authentication Toggle */}
          <div className="mb-6 flex items-center">
            <input
              className="mr-2 leading-tight"
              id="enable_two_factor_authentication"
              type="checkbox"
            />
            <label className="text-sm text-gray-700" htmlFor="enable_two_factor_authentication">
              Enable Two-Factor Authentication
            </label>
          </div>

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
  );
};

export default Register;