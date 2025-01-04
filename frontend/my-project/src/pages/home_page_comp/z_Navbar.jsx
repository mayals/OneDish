import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; // Ensure you have this import
import logo from "../../assets/oneDishLogo.jpg";
import menuButton from "../../assets/menu-symbol-of-three-parallel-lines-svgrepo-com.svg";
import closeButton from "../../assets/close-bold-svgrepo-com.svg";

const Navbar = () => {
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    useEffect(() => {
        setIsMobileMenuVisible(false);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuVisible((prev) => !prev);
    };

    return (
        <section className="mt-5 md:mt-10 transition-all duration-500 drop-shadow-lg md:fixed md:flex md:w-full md-mx-0">
            <nav className="pt-3 pb-3 bg-white md:w-full">
                {/* Mobile Navbar */}
                <div className="flex justify-between items-center px-4 md:hidden">
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="OneDish Logo" className="w-10 h-10" />
                        <span className="text-xl font-bold text-tomato-600">OneDish Daily</span>
                    </div>
                    <button onClick={toggleMobileMenu}>
                        <img
                            className="h-10 w-10"
                            src={isMobileMenuVisible ? closeButton : menuButton}
                            alt="Menu Toggle"
                        />
                    </button>
                </div>

                {/* Mobile Menu Links */}
                {isMobileMenuVisible && (
                    <div className="bg-white py-4 px-6 ">
                        <ul className="space-y-4 text-center md:flex md:justify-center">
                            <li>
                                <NavLink to="/" className="text-lg text-gray-700 hover:text-teal-500">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className="text-lg text-gray-700 hover:text-teal-500">
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/pricing" className="text-lg text-gray-700 hover:text-teal-500">
                                    Pricing
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="text-lg text-gray-700 hover:text-teal-500">
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                        <div className="text-center mt-4">
                            <button className="text-white bg-teal-500 hover:bg-teal-600 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                                Create Account
                            </button>
                        </div>
                    </div>
                )}

                {/* Full-Screen Navbar */}
                <div className="hidden md:flex justify-between items-center px-8">
                    <ul className="flex items-center justify-center space-x-8">
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <NavLink 
                                className="cursor-pointer p-1 text-center transition-all duration-300 ease-in-out">
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        </li>
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <NavLink 
                                className="cursor-pointer p-1 text-center transition-all duration-300 ease-in-out">
                                Products
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        </li>
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <NavLink 
                                className="cursor-pointer p-1 text-center transition-all duration-300 ease-in-out">
                                Pricing
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        </li>
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <NavLink 
                                className="cursor-pointer p-1 text-center transition-all duration-300 ease-in-out">
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        </li>
                    </ul>
                    <button className="text-white bg-teal-500 hover:bg-teal-600 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                        Create Account
                    </button>
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
