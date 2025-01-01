import logo from "../../assets/oneDishLogo.jpg"
import React from 'react';

const Header = () => {
    return (
        <header className="bg-black fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4 py-1 sm:px-6">
                
                {/* Logo and Restaurant Name */}
                <div className="flex items-center space-x-2 ">
                    <img
                    src={logo} 
                    alt="OneDish Logo"
                    className="w-10 h-10"
                    />
                    <span className="text-xl font-bold text-tomato-600">OneDish daily</span>
                </div>

                {/* Phone Number */}
                <div className="flex items-center space-x-2 text-tomato-600">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8.25C3 5.903 4.903 4 7.25 4h9.5C19.097 4 21 5.903 21 8.25v7.5C21 18.097 19.097 20 16.75 20h-9.5C4.903 20 3 18.097 3 15.75v-7.5zM7.25 10h9.5M7.25 14h9.5"
                    />
                    </svg>
                    <span className="text-sm font-medium">+1 (555) 123-4567</span>
                </div>

                {/* Working Hours */}
                <div className="flex items-center space-x-2 text-basil-600">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6l4 2m-4-12a9 9 0 100 18 9 9 0 000-18z"
                    />
                    </svg>
                    <span className="text-sm font-medium">Mon - Fri: 9:00 AM - 5:00 PM</span>
                </div>
            </div>
        </header>
    );
  };
  
  export default Header;
  
