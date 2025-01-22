import React, { useEffect, useState, useContext } from 'react';
// https://www.npmjs.com/package/react-anchor-link-smooth-scroll
import AnchorLink from "react-anchor-link-smooth-scroll";
// assets
import logo from "../../assets/oneDishLogo.jpg";
import menuButton from "../../assets/menu-symbol-of-three-parallel-lines-svgrepo-com.svg";
import closeButton from "../../assets/close-bold-svgrepo-com.svg";
import userIcon from  "../../assets/user-svgrepo-com.svg"
// context 
import { UserContext } from '../account_pages/UserContext';
import { TokenContext }       from '../account_pages/TokenContext';
import {AxiosInstance} from '../../api/AxiosInstance.js';




import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import Loading from "../../Loading.jsx"
import { baseURL } from "../../api/Api.js"



const Navbar = () => {
    const [loading, setLoading] = useState(false);

    // Get tokens
    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useContext(TokenContext); 

    // Get user
    const { user, setUser } = useContext(UserContext);

    // Set tokens from localStorage on initial render
    useEffect(() => {
        setAccessToken(localStorage.getItem('accessToken'));
        setRefreshToken(localStorage.getItem('refreshToken'));
    }, [ ]);

    // Fetch user data when accessToken changes
    useEffect(() => {
        const fetchUserData = async () => {
            if (accessToken){
                console.log('if accessToken=',accessToken)
                
                setLoading(true);
                try {
                    const response = await AxiosInstance.get('/account/request-user/');
                    setUser(response.data);
                    console.log('from axios USER=', user);
                    setLoading(false);
                    toast("Login successful!", { type: "success" });
            
                } catch (error) {
                    setLoading(false);
                    toast(error.response?.data?.message || "Login failed!", { type: "error" });
                }
                   
            }
        };

        fetchUserData();
    }, [accessToken, setUser]);



        //  toggleMobileMenu
        const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

        useEffect(() => {
            setIsMobileMenuVisible(false);
        }, []);

        const toggleMobileMenu = () => {
            setIsMobileMenuVisible((prev) => !prev);
        };




        //// function to renderProfileLinks //////
        // const profileLinks = {
        //                         admin    :    "/admin-layout/dashboard-page",
        //                         client   :    "/client-dashboard",
        //                     };

        // const refreshToken = localStorage.getItem('refreshToken');
        // console.log('current refreshToken=',refreshToken)                    
        // if ( !refreshToken || !user.role || !profileLinks[user.role]) return null;


 

    return (
        <section  className="fixed mt-0 w-full mx-0 mt-5 md:mt-10 transition-all duration-500 drop-shadow-lg md:fixed md:flex md:w-full md-mx-0 md:z-40 z-40">
           
           {loading && <Loading />}

            {/* Add the ToastContainer here */}
            <ToastContainer />


            <nav className="pt-7 pb-3 bg-white md:w-full">
                {/* Mobile Navbar */}
                <div className="flex justify-between items-center px-4 md:hidden">
                    <div className="flex  -center space-x-2">
                        <img src={logo} alt="OneDish Logo" className="w-10 h-10" />
                        <span className="text-3xl md:text-2xl font-bold text-[#e52609]">OneDish <span className='text-xs text-gray-500'>daily</span></span>
                    </div>
                    <button onClick={toggleMobileMenu}>
                        <img
                            className="h-10 w-10 focus:ring-4 focus:ring-teal-500 focus:outline-none hover:outline-none"
                            src={isMobileMenuVisible ? closeButton : menuButton}
                            alt="Menu Toggle"
                        />
                    </button>
                </div>

                {/* Mobile Menu Links */}
                {isMobileMenuVisible && (
                    <div className="md:hidden bg-white py-6 px-6  md:z-40 z-40">
                        <ul className="space-y-4 text-center md:flex md:justify-center">
                            <li>
                                <AnchorLink href="#jumbotron" className="text-lg text-gray-700 hover:text-[#bc9b79]">
                                  الرئيسية
                                </AnchorLink>
                            </li>
                            <li>
                            <AnchorLink href="#mainmeal" className="text-lg text-gray-700 hover:text-[#bc9b79]">
                                الوجبة الأساسية  
                            </AnchorLink>
                            </li>
                            <li>
                                <AnchorLink href="#sidemeal" className="text-lg text-gray-700 hover:text-[#bc9b79]">
                                   الوجبات الجانبية
                                </AnchorLink>
                            </li>
                            <li>
                                <AnchorLink href="#ourlocation" className="text-lg text-gray-700 hover:text-[#bc9b79]">
                                    موقعنا
                                </AnchorLink>
                            </li>
                            <li>
                                <AnchorLink href="#contactus" className="text-lg text-gray-700 hover:text-[#bc9b79]">
                                    إتصل بنا
                                </AnchorLink>
                            </li>
                        </ul>
                        <div className="text-center mt-4">
                            <a href="/login" className="text-white bg-[#bc9b79] hover:bg-yellow-800 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                            الدخول
                            </a>
                        </div>
                    </div>
                )}

                {/* Full-Screen Navbar */}
                <div className="hidden md:flex md:justify-between md:items-center px-8">
                    {/* Navigation Links */}
                    <ul className="md:flex md:items-center md:justify-center md:space-x-8 flex-grow text-center">
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <AnchorLink href="#contactus">
                                إتصل بنا
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#bc9b79] transition-all duration-300 group-hover:w-full"></span>
                            </AnchorLink>
                        </li>
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <AnchorLink href="#ourlocation">
                                موقعنا
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#bc9b79] transition-all duration-300 group-hover:w-full"></span>
                            </AnchorLink>
                        </li>
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <AnchorLink href="#sidemeal" >
                                الوجبات الجانبية
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#bc9b79] transition-all duration-300 group-hover:w-full"></span>
                            </AnchorLink>
                        </li>
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <AnchorLink href="#mainmeal">
                                الوجبة الأساسية
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#bc9b79] transition-all duration-300 group-hover:w-full"></span>
                            </AnchorLink>
                        </li>
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <AnchorLink href="#jumbotron">
                                الرئيسية
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#bc9b79] transition-all duration-300 group-hover:w-full"></span>
                            </AnchorLink>
                        </li>
                    </ul>

                    {/* Call-to-Action Button */}
                    {!accessToken? (<div className="ml-8 md:mt-2">
                                        <a href="http://localhost:5173/OneDish/login" className="text-white bg-[#bc9b79] hover:bg-yellow-800 font-bold  py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                                           الدخول                        
                                        </a>
                                    </div>):
                                    (<a href="http://localhost:5173/OneDish/login" className="text-white bg-[#bc9b79] hover:bg-yellow-800 font-bold  py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                                        <div className='flex flex-row justify-around gap-1'> 
                                            <span>
                                                { user.profile_picture ?
                                                    (
                                                        <img
                                                            className="rounded-full"
                                                            width="60px"
                                                            height="60px"
                                                            src={`http://localhost:8000${profile_picture}`} 
                                                            alt={user.first_name || 'Profile'}
                                                        />
                                                    ) 
                                                    :
                                                    (       
                                                        <img 
                                                            src={userIcon} 
                                                            width="20px"
                                                            height="20px"
                                                            alt="unknown user avatar"
                                                        />    
                                                    )
                                                } 
                                            </span>  
                                            <span> 
                                                {user.first_name}   
                                            </span> 
                                                                                 
                                        </div>
                                    </a>)
                    }
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
