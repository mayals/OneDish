import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import Loading from "../../Loading";
import { baseURL } from "../../api/Api.js"

import { TokenContext } from "../account_pages/TokenContext";


const Login = () => {
    const navigate = useNavigate();


    // State
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Get tokens
    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useContext(TokenContext); 



    // Handle form field changes
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (email === "") {
            toast("Please enter the Email!", { type: "warning" });
            return;
        }
        if (password === "") {
            toast("Please enter Password!", { type: "warning" });
            return;
        }

         
        // Create FormData object
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
       
        // Log the values using the get method
        console.log('formData.email=', formData.get('email'));
        console.log('formData.password=', formData.get('password'));
        ///////////////////////////////////////////////////////////////////





        // Axios request
        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}/account/login/`, formData,{
                headers: {
                    "Content-Type": "application/json",
                },
            });
 
            localStorage.setItem('accessToken',response.data.access_token);
            localStorage.setItem('refreshToken',response.data.refresh_token);
            console.log('accessToken=',response.data.access_token)
            console.log('refreshToken=',response.data.refresh_token)
            
            setAccessToken(response.data.access_token)
            setRefreshToken (response.data.refresh_token)
        


            setLoading(false);
            toast("Login successful!", { type: "success" });
            navigate("/"); // Redirect to home page after successful login
        } catch (error) {
            setLoading(false);
            toast(error.response?.data?.message || "Login failed!", { type: "error" });
        }






    };

    return (
        <section
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/free-photo/top-view-christmas-tableware-with-copy-space_23-2148746072.jpg')",
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

                <form noValidate onSubmit={handleSubmit}>
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
                    Don't have an account?{" "}
                    <a
                        className="inline-block align-baseline font-bold text-sm text-[#bc9b79] hover:text-[#795548] transition-colors duration-300"
                        href="http://localhost:5173/OneDish/register"
                    >
                        Register here
                    </a>
                </p>
            </div>
        </section>
    );
};

export default Login;