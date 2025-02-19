import React, { useEffect, useState, useContext } from 'react';
import AnchorLink from "react-anchor-link-smooth-scroll";
import logo from "../../assets/oneDishLogo.jpg";
import menuButton from "../../assets/menu-symbol-of-three-parallel-lines-svgrepo-com.svg";
import closeButton from "../../assets/close-bold-svgrepo-com.svg";
import userIcon from  "../../assets/user-svgrepo-com.svg"
import { UserContext } from '../account_pages/UserContext';
import { TokenContext } from '../account_pages/TokenContext';
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../common/Loading"

const Navbar = () => {

    const [loading, setLoading] = useState(false);
    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useContext(TokenContext);
    const { user, role, setUser, setRole} = useContext(UserContext);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    const profileLinks = {
        Admin: "/admin-layout",
        Client: "/client-dashboard",
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuVisible((prev) => !prev);
    };

    // Helper function to get profile picture URL
    const getProfilePicture = () => {
        if (user?.profile?.profile_picture) {
            return `http://localhost:8000${user.profile.profile_picture}`;
        }
        return userIcon;
    };

    return (
        <section className="fixed mt-0 w-full mx-0 mt-5 md:mt-10 transition-all duration-500 drop-shadow-lg md:fixed md:flex md:w-full md-mx-0 md:z-40 z-40">
            <nav className="pt-7 pb-3 bg-white md:w-full">
                
                {/* Mobile Navbar */}
                <div className="flex justify-between items-center px-4 md:hidden">
                    <div className="flex-center space-x-2">
                        <img src={logo} alt="OneDish Logo" className="w-10 h-10" />
                        <span className="text-3xl md:text-2xl font-bold text-[#e52609]">
                            OneDish <span className='text-xs text-gray-500'>daily</span>
                        </span>
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
                    <div className="md:hidden bg-white py-6 px-6 md:z-40 z-40">
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

                        {/* Fixed authentication section */}
                        {!accessToken ? (
                            <div className="ml-8 md:mt-2">
                                <a href="http://localhost:5173/OneDish/login" className="text-white bg-[#bc9b79] hover:bg-yellow-800 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                                    الدخول
                                </a>
                            </div>
                        ) : profileLinks[role] ? (
                            <div className="flex items-center justify-center">
                                <a href={`http://localhost:5173/OneDish${profileLinks[role]}`} className="flex items-center text-white bg-[#bc9b79] hover:bg-yellow-800 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                                    <img
                                        className="rounded-full w-8 h-8 mr-2"
                                        src={getProfilePicture()}
                                        alt={user?.first_name || 'Profile'}
                                    />
                                    <div>{user?.first_name}</div>
                                </a>
                            </div>
                        ) : (
                            <button type="button" className="py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md">
                                {/* Loading spinner */}
                                <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z" />
                                </svg>
                                loading
                            </button>
                        )}
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
                    {/* Fixed desktop authentication section */}
                    {!accessToken ? (
                        <div className="ml-8 md:mt-2">
                            <a href="http://localhost:5173/OneDish/login" className="text-white bg-[#bc9b79] hover:bg-yellow-800 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                                الدخول
                            </a>
                        </div>
                    ) : (
                        <a href={`http://localhost:5173/OneDish${profileLinks[role]}`} className="text-white bg-[#bc9b79] hover:bg-yellow-800 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                            <div className='flex flex-row justify-around gap-1'>
                                <img
                                    className="rounded-full w-8 h-8"
                                    src={getProfilePicture()}
                                    alt={user?.first_name || 'Profile'}
                                />
                                <span>{user?.first_name}</span>
                            </div>
                        </a>
                    )}
                </div>
            </nav>
        </section>
    );
};

export default Navbar;