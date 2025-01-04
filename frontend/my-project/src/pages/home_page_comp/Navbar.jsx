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
        <section className="fixed mt-0 w-full mx-0 mt-5 md:mt-10 transition-all duration-500 drop-shadow-lg md:fixed md:flex md:w-full md-mx-0 md:z-40 z-40">
            <nav className="pt-3 pb-3 bg-white md:w-full">
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
                    <div className="md:hidden bg-white py-4 px-6 bg-yellow-300 md:z-40 z-40">
                        <ul className="space-y-4 text-center md:flex md:justify-center">
                            <li>
                                <NavLink to="/" className="text-lg text-gray-700 hover:text-[#bc9b79]">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className="text-lg text-gray-700 hover:text-[#bc9b79]">
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/pricing" className="text-lg text-gray-700 hover:text-[#bc9b79]">
                                    Pricing
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="text-lg text-gray-700 hover:text-[#bc9b79]">
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                        <div className="text-center mt-4">
                            <button className="text-white bg-[#bc9b79] hover:bg-yellow-800 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                                Create Account
                            </button>
                        </div>
                    </div>
                )}

                {/* Full-Screen Navbar */}
                <div className="hidden md:flex md:justify-between md:items-center px-8">
                    {/* Navigation Links */}
                    <ul className="md:flex md:items-center md:justify-center md:space-x-8 flex-grow text-center">
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <NavLink>
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#bc9b79] transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        </li>
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <NavLink>
                                Products
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#bc9b79] transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        </li>
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <NavLink>
                                Pricing
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#bc9b79] transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        </li>
                        <li className="text-lg text-gray-700 hover:text-teal-500 relative group">
                            <NavLink>
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#bc9b79] transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        </li>
                    </ul>

                    {/* Call-to-Action Button */}
                    <div className="ml-8">
                        <button className="text-white bg-[#bc9b79] hover:bg-yellow-800 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                            Create Account
                        </button>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
