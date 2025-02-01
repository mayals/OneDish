import { NavLink, useNavigate, Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { UserContext } from "../../../src/pages/account_pages/UserContext";
import { TokenContext } from '../../../src/pages/account_pages/TokenContext';
import upIcon from "../../assets/up-svgrepo-com.svg";
import downIcon from "../../assets/down-svgrepo-com.svg";
import userIcon from "../../assets/user-svgrepo-com.svg";
import usersIcon from "../../assets/users-svgrepo-com.svg";
import mealIcon from "../../assets/tray-meal-svgrepo-com.svg";
import dashboardIcon from "../../assets/dashboard-alt-svgrepo-com.svg";





const AdminSidebar = () => {
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);

    const { accessToken } = useContext(TokenContext);
    const { user } = useContext(UserContext);

   

    return (
        <section className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen text-white p-4 shadow-xl">
            {/* Profile Section */}
            <div className="mb-8 flex flex-col items-center">
                <div className="mb-4 relative group">
                    {user?.profile?.profile_picture ? (
                        <img
                            className="w-20 h-20 rounded-full border-4 border-[#ffd8a8] transform group-hover:scale-105 transition-transform duration-300"
                            src={`http://127.0.0.1:8000/${user.profile.profile_picture}`}
                            alt="Profile"
                        />
                    ) : (
                        <div className="w-20 h-20 bg-[#fff4e6] rounded-full flex items-center justify-center p-2 border-4 border-[#ffd8a8]">
                            <img
                                src={userIcon}
                                className="w-12 h-12 text-amber-900"
                                alt="Default Avatar"
                            />
                        </div>
                    )}
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-0 group-hover:opacity-100 duration-300" />
                </div>
    
                <h2 className="text-2xl font-bold text-[#ffd8a8] mb-2">
                    {user?.name || "Administrator"}
                </h2>
                <p className="text-sm text-gray-300 italic">
                    Welcome back! 👋
                </p>
            </div>
    
            {/* Navigation Menu */}
            <nav className="space-y-2">
                <NavLink 
                    to="/admin-layout/dashboard-page" 
                    className={({ isActive }) => 
                        `flex items-center p-3 rounded-xl transition-all duration-200 hover:bg-[#fff4e6] hover:text-amber-900 ${
                            isActive ? 'bg-[#fff4e6] text-amber-900 font-bold' : 'text-gray-200'
                        }`
                    }
                >
                    <img 
                        src={dashboardIcon} 
                        className="w-6 h-6 mr-3 filter-orange" 
                        alt="Dashboard" 
                    />
                    <span className="text-lg">Dashboard</span>
                </NavLink>
    
                {/* Users Section */}
                <div className="group">
                    <div 
                        onClick={() => setToggle1(!toggle1)}
                        className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#fff4e6] hover:text-amber-900"
                    >
                        <div className="flex items-center">
                            <img 
                                src={usersIcon} 
                                className="w-6 h-6 mr-3 filter-orange" 
                                alt="Users" 
                            />
                            <span className="text-lg">Users</span>
                        </div>
                        <img 
                            src={toggle1 ? upIcon : downIcon} 
                            className={`w-4 h-4 transform transition-transform duration-300 ${toggle1 ? 'rotate-180' : ''}`} 
                            alt="Toggle" 
                        />
                    </div>
                    
                    {toggle1 && (
                        <div className="pl-8 mt-1 space-y-2 animate-slideDown">
                            <NavLink 
                                to="/admin-layout/user-list" 
                                className={({ isActive }) => 
                                    `block p-2 rounded-lg text-gray-300 hover:bg-amber-900/50 hover:text-white transition-colors duration-200 ${
                                        isActive ? 'bg-amber-900/30 text-white' : ''
                                    }`
                                }
                            >
                                👤 Users List
                            </NavLink>
                            <NavLink 
                                to="/admin-layout/client-list" 
                                className={({ isActive }) => 
                                    `block p-2 rounded-lg text-gray-300 hover:bg-amber-900/50 hover:text-white transition-colors duration-200 ${
                                        isActive ? 'bg-amber-900/30 text-white' : ''
                                    }`
                                }
                            >
                                👥 Clients
                            </NavLink>
                        </div>
                    )}
                </div>
    
                {/* Meals Section */}
                <div className="group">
                    <div 
                        onClick={() => setToggle2(!toggle2)}
                        className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#fff4e6] hover:text-amber-900"
                    >
                        <div className="flex items-center">
                            <img 
                                src={mealIcon} 
                                className="w-6 h-6 mr-3 filter-orange" 
                                alt="Meals" 
                            />
                            <span className="text-lg">Meals</span>
                        </div>
                        <img 
                            src={toggle2 ? upIcon : downIcon} 
                            className={`w-4 h-4 transform transition-transform duration-300 ${toggle2 ? 'rotate-180' : ''}`} 
                            alt="Toggle" 
                        />
                    </div>
                    
                    {toggle2 && (
                        <div className="pl-8 mt-1 space-y-2 animate-slideDown">
                            <NavLink 
                                to="/admin-layout/main-meals" 
                                className={({ isActive }) => 
                                    `block p-2 rounded-lg text-gray-300 hover:bg-amber-900/50 hover:text-white transition-colors duration-200 ${
                                        isActive ? 'bg-amber-900/30 text-white' : ''
                                    }`
                                }
                            >
                                🍲 Main Meals
                            </NavLink>
                            <NavLink 
                                to="/admin-layout/side-meals" 
                                className={({ isActive }) => 
                                    `block p-2 rounded-lg text-gray-300 hover:bg-amber-900/50 hover:text-white transition-colors duration-200 ${
                                        isActive ? 'bg-amber-900/30 text-white' : ''
                                    }`
                                }
                            >
                                🥗 Side Meals
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>
    
            {/* Add these in your CSS or styled-components */}
            <style jsx>{`
                .filter-orange {
                    filter: invert(84%) sepia(19%) saturate(1192%) hue-rotate(329deg) brightness(107%) contrast(101%);
                }
                @keyframes slideDown {
                    0% { opacity: 0; transform: translateY(-10px) }
                    100% { opacity: 1; transform: translateY(0) }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </section>
    );
}
export default AdminSidebar;