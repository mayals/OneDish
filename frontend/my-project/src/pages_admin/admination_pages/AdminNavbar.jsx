import { NavLink, useNavigate } from 'react-router-dom';
import openIcon from "../../assets/open-text-book-svgrepo-com.svg"
import logo from "../../assets/oneDishLogo.jpg";
import bellIcon from "../../assets/bell-svgrepo-com.svg"
import settingsIcon from "../../assets/setting-svgrepo-com.svg"
import chevronIcon from "../../assets/chevron-selector-horizontal-svgrepo-com.svg"
import inboxesIcon from "../../assets/inbox-svgrepo-com.svg"
import noteIcon from "../../assets/note-svgrepo-com.svg"


const AdminNavbar = ({ toggleSidebar }) => {
   



    return (
        <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg p-4 z-10">
            <div className="flex items-center justify-between gap-4">
                {/* Left Section - Hamburger & Logo */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-[#ffd8a8] hover:bg-gray-700 rounded-lg transition-all duration-200 md:hidden"
                    >
                        <img 
                            src={openIcon} 
                            className="h-6 w-6 filter-orange" 
                            alt="Menu" 
                        />
                    </button>
    
                    {/* Logo */}
                    <NavLink 
                        to="/" 
                        className="hidden md:block hover:scale-105 transition-transform duration-200"
                    >
                        <img 
                            src={logo} 
                            className="h-10 w-10 rounded-full border-2 border-[#ffd8a8] p-1" 
                            alt="Logo" 
                        />
                    </NavLink>
                </div>
    
                {/* Quick Access Suggestions (Optional) */}
                <div className="hidden md:flex items-center justify-center gap-5">
                    <button className="flex items-center gap-2 text-[#ffd8a8] hover:text-white transition-colors">
                        <img src={inboxesIcon} className="h-5 w-5 filter-orange" alt="" />
                        <span>Inboxes</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#ffd8a8] hover:text-white transition-colors">
                        <img src={noteIcon} className="h-5 w-5 filter-orange" alt="" />
                        <span>Notes</span>
                    </button>
                </div>


                {/* Right Section - Controls */}
                <div className="flex items-center gap-5">
                    {/* Notification Bell */}
                    <button className="relative p-2 group">
                        <div className="relative">
                            <img
                                src={bellIcon}
                                className="h-6 w-6 filter-orange transition-transform group-hover:scale-110"
                                alt="Notifications"
                            />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                                3
                            </span>
                        </div>
                    </button>
    
                    {/* Settings Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg transition-all duration-200">
                            <img
                                src={settingsIcon}
                                className="h-6 w-6 filter-orange"
                                alt="Settings"
                            />
                            <span className="text-[#ffd8a8] hidden md:block">Admin</span>
                            <img
                                src={chevronIcon}
                                className="h-4 w-4 filter-orange transform transition-transform"
                                alt="▼"
                            />
                        </button>
    
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 origin-top-right z-10">
                            <NavLink
                                to="/admin-profile"
                                className="block px-4 py-3 text-gray-300 hover:bg-[#ffd8a8] hover:text-gray-900 transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                                👤 Profile Settings
                            </NavLink>
                            <button
                                // onClick={handleLogout}
                                className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[#ffd8a8] hover:text-gray-900 transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                                🚪 Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    
            
    
            {/* Add to your CSS */}
            <style jsx>{`
                .filter-orange {
                    filter: invert(84%) sepia(19%) saturate(1192%) hue-rotate(329deg) brightness(107%) contrast(101%);
                }
            `}</style>
        </nav>
    );
};

export default AdminNavbar;