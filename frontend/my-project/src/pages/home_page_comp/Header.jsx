import React from 'react';
import logo from "../../assets/oneDishLogo.jpg"
import whatsappSvg from "../../assets/whatsapp-svgrepo-com.svg"
import timeSvg from '../../assets/time-2-svgrepo-com.svg'

const Header = () => {
    return (
        <header className="bg-black fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="container mx-0 flex justify-around md:justify-between items-center px-4 py-1 sm:px-6">
                
                {/* Logo and Restaurant Name */}
                <div className="hidden md:flex md:items-center md:space-x-2">
                    <img
                    src={logo} 
                    alt="OneDish Logo"
                    className="w-10 h-10"
                    />
                    <span className="text-xl font-bold text-tomato-600">OneDish daily</span>
                </div>

                {/* Phone Number */}
                <div className="flex items-center space-x-2 text-tomato-600">
                    <img
                        src={whatsappSvg} 
                        alt="whatsappSvg"
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">+1 (555) 123-4567</span>
                </div>

                {/* Working Hours */}
                <div className="flex items-center space-x-2 text-basil-600">
                    <img
                        src={timeSvg } 
                        alt="timeSvg"
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">Mon - Fri: 9:00 AM - 5:00 PM</span>
                </div>
            </div>
        </header>
    );
  };
  
  export default Header;
  
