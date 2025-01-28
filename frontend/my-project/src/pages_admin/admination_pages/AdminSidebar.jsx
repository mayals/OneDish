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
    const navigate = useNavigate();
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);

    const { accessToken } = useContext(TokenContext);
    const { user } = useContext(UserContext);

    if (!accessToken) {
        navigate('/login');
    }

    return (
        <section className="text-white justify-center bg-gray-800 min-h-screen">
            <div className="flex justify-center items-center p-4">
                {user?.profile?.profile_picture ? (
                    <img
                        className="w-11 h-11 bg-gray-300 rounded-full shrink-0"
                        src={`http://127.0.0.1:8000/${user.profile.profile_picture}`}
                        alt="Profile Picture"
                    />
                ) : (
                    <img
                        src={userIcon}
                        className='bg-white h-20 w-20 p-2 rounded rounded-lg'
                        alt="admin avatar default"
                    />
                )}
            </div>

            <div className="grid grid-cols-1 gap-x-0 gap-y-4 p-4">
                <h2 className='text-center text-2xl font-bold shadow-black-500/50 px-1 py-4 bg-black text-white'>
                    Administration
                </h2>

                <h2>
                    <Link to="/admin-layout/dashboard-page" className="flex items-center justify-around w-full p-1 font-medium rtl:text-right text-gray-900 hover:bg-[#bc9b79]">
                        <img src={dashboardIcon} width='20px' height='20px' alt="dashboardIcon" />
                        <span className='text-white text-xl'>Dashboard</span>
                    </Link>
                </h2>

                {/* Users Section */}
                <h2>
                    <div onClick={() => setToggle1(!toggle1)} className='cursor-pointer text-white flex items-center justify-between w-full p-1 font-medium rtl:text-right hover:bg-[#bc9b79]'>
                        <img src={usersIcon} width='25px' height='25px' alt="users" />
                        <span>Users</span>
                        <span>
                            {toggle1 ? <img src={downIcon} width='15px' height='15px' alt="down" /> : <img src={upIcon} width='15px' height='15px' alt="up" />}
                        </span>
                    </div>
                </h2>
                {toggle1 && (
                    <div id="b1">
                        <ul className='bg-gray-800'>
                            <li className="mb-2 text-gray-500 hover:opacity-75 hover:text-[#bc9b79]">
                                <NavLink to="/admin-layout/user-list" className="block pl-10">Users</NavLink>
                            </li>
                            <li className="mb-2 text-gray-500 hover:opacity-75 hover:text-[#bc9b79]">
                                <NavLink to="/admin-layout/client-list" className="block pl-10">Clients</NavLink>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Meals Section */}
                <h2>
                    <div onClick={() => setToggle2(!toggle2)} className='cursor-pointer text-white flex items-center justify-between w-full p-1 font-medium rtl:text-right hover:bg-[#bc9b79]'>
                        <img src={mealIcon} width='25px' height='25px' alt="meals" />
                        <span>Meals</span>
                        <span>
                            {toggle2 ? <img src={downIcon} width='15px' height='15px' alt="down" /> : <img src={upIcon} width='15px' height='15px' alt="up" />}
                        </span>
                    </div>
                </h2>
                {toggle2 && (
                    <div id="b1">
                        <ul className='bg-gray-800'>
                            <li className="mb-2 text-gray-500 hover:opacity-75 hover:text-[#bc9b79]">
                                <NavLink to="/admin-layout/employee-list" className="block pl-10">Main Meals</NavLink>
                            </li>
                            <li className="mb-2 text-gray-500 hover:opacity-75 hover:text-[#bc9b79]">
                                <NavLink to="/admin-layout/client-list" className="block pl-10">Side Meals</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminSidebar;