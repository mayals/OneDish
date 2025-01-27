
import { BrowserRouter, Routes, Route, NavLink ,Link, useNavigate} from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
// context 
import { UserContext } from "../../../src/pages/account_pages/UserContext";
import { TokenContext }       from '../../../src/pages/account_pages/TokenContext';
import upIcon from "../../assets/up-svgrepo-com.svg"
import downIcon from "../../assets/down-svgrepo-com.svg"
import userIcon from "../../assets/user-svgrepo-com.svg"
import usersIcon from "../../assets/users-svgrepo-com.svg"
import mealIcon from "../../assets/tray-meal-svgrepo-com.svg"
import dashboardIcon from "../../assets/dashboard-alt-svgrepo-com.svg"


// const AdminSidebar = () => {
//     const navigate = useNavigate();
//     const [toggle1, setToggle1] = useState(false);
//     const [toggle2, setToggle2] = useState(false);
//     const [toggle3, setToggle3] = useState(false);

//     const accessToken = localStorage.getItem('accessToken');
//     if (!accessToken) {
//         navigate('/login');
//     }

//     return (
//         <aside className="w-64 bg-white shadow-md h-screen fixed">
//             <div className="p-6">
//                 <h3 className="text-2xl font-bold text-gray-800">Administration</h3>
//             </div>
//             <nav className="mt-6">
//                 <ul className="space-y-2">
//                     <li>
//                         <NavLink
//                             to="/admin-layout/dashboard-page"
//                             className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg"
//                         >
//                             <span className="ml-2">Dashboard</span>
//                         </NavLink>
//                     </li>
//                     <li>
//                         <button
//                             onClick={() => setToggle1(!toggle1)}
//                             className="w-full flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg"
//                         >
//                             <span className="ml-2">Users</span>
//                             <svg
//                                 className={`w-4 h-4 ml-auto transform ${toggle1 ? 'rotate-180' : ''}`}
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </button>
//                         {toggle1 && (
//                             <ul className="pl-6 mt-2 space-y-2">
//                                 <li>
//                                     <NavLink
//                                         to="/admin-layout/employee-list"
//                                         className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg"
//                                     >
//                                         Employees
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/admin-layout/client-list"
//                                         className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg"
//                                     >
//                                         Clients
//                                     </NavLink>
//                                 </li>
//                             </ul>
//                         )}
//                     </li>
//                     <li>
//                         <button
//                             onClick={() => setToggle2(!toggle2)}
//                             className="w-full flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg"
//                         >
//                             <span className="ml-2">Projects</span>
//                             <svg
//                                 className={`w-4 h-4 ml-auto transform ${toggle2 ? 'rotate-180' : ''}`}
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </button>
//                         {toggle2 && (
//                             <ul className="pl-6 mt-2 space-y-2">
//                                 <li>
//                                     <NavLink
//                                         to="/admin-layout/category-list"
//                                         className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg"
//                                     >
//                                         Category
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/admin-layout/subcategory-list"
//                                         className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg"
//                                     >
//                                         Sub Category
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/admin-layout/project-list"
//                                         className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg"
//                                     >
//                                         Projects
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/admin-layout/task-list"
//                                         className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg"
//                                     >
//                                         Tasks
//                                     </NavLink>
//                                 </li>
//                             </ul>
//                         )}
//                     </li>
//                     <li>
//                         <button
//                             onClick={() => setToggle3(!toggle3)}
//                             className="w-full flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg"
//                         >
//                             <span className="ml-2">Payments</span>
//                             <svg
//                                 className={`w-4 h-4 ml-auto transform ${toggle3 ? 'rotate-180' : ''}`}
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </button>
//                         {toggle3 && (
//                             <ul className="pl-6 mt-2 space-y-2">
//                                 <li>
//                                     <NavLink
//                                         to="/admin-dashboard/payments/payment1"
//                                         className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg"
//                                     >
//                                         Payment1
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/admin-dashboard/payments/payment2"
//                                         className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg"
//                                     >
//                                         Payment2
//                                     </NavLink>
//                                 </li>
//                             </ul>
//                         )}
//                     </li>
//                 </ul>
//             </nav>
//         </aside>
//     );
// };

// export default AdminSidebar;



const AdminSidebar = () => {
    const navigate = useNavigate();

    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);
    
  
    // check the user is authenticated user 
    // const accessToken = localStorage.getItem('accessToken');
    // console.log('accessToken=',accessToken)
    
    
    // Get tokens
    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useContext(TokenContext); 
    // Get user
    const { user, setUser } = useContext(UserContext);
    


    if(!accessToken){
        // accessToken = null
        navigate('/login')
    }

    // const profilePicture = useSelector((state) => state.authSlRed.profilePicture);
    //     console.log('profilePicture from redux=',profilePicture)
    console.log('from TokenContext accessToken=',accessToken)   
    console.log('from UserContext user=',user) 
    



    return (
        <section className="text-white justify-center bg-gray-800 min-h-screen">

            {/*  show at md size only     authentication user */}
            
            
            
            <div className="flex justify-center items-center">               
                {user?.profile?.profile_picture ? (
                                            <img
                                                className="w-11 h-11 bg-gray-300 rounded-full shrink-0"
                                                src={`http://127.0.0.1:8000/${profilePicture}`}
                                                alt="Profile Picture"
                                            />   
                                        ) : (
                                            <img 
                                                src={userIcon}
                                                className='bg-white h-20 w-20 p-2 rounded rounded-lg'
                                                alt="admin avatar default"
                                            /> 
                                        ) 
                }  
            </div> 

            
            
            
            <div className="grid grid-cols-1 gap-x-0 gap-y-4"> 
            
                <h2 className='text-center text-2xl font-bold shadow-black-500/50 px-1 py-4 bg-black text-white'>
                    Administration
                </h2> 

                
                <h2>
                    <Link   to="/admin-layout/dashboard-page" 
                            type="button" 
                            className="flex items-center justify-around w-full p-1 font-medium rtl:text-right text-gray-900  hover:bg-[#bc9b79]" 
                            >
                                <img  
                                    src={dashboardIcon}
                                    width='20px' 
                                    height='20px' 
                                    alt="dashboardIcon" 
                                 />       
                                   
                                <span className='text-white text-xl'>Dashboard</span> 
                    </Link>
                </h2>
                {/*  users */}
                <h2>
                    <div 
                        onClick={() => setToggle1(!toggle1)} 
                        className='cursor-pointer text-white flex items-center justify-between w-full p-1 font-medium rtl:text-right hover:bg-[#bc9b79]'
                    >
                           <img src={usersIcon} width='25px' height='25px' alt="users"/>
                           <span>Users</span>
                           <span>
                                {toggle1 ? (
                                              <img src={downIcon} width='15px' height='15px' alt="down"/>       
                                            ) : (
                                              <img src={upIcon} width='15px' height='15px' alt="up"/>
                                            )
                                }
                            </span>
                    </div>
                </h2>
                {/* employee and client  */}
                {toggle1 && (
                    <div id="b1">
                        <ul className='bg-gray-800'>
                            <li className="mb-2 text-gray-500 hover:opacity-75 hover:text-[#bc9b79]">
                                <NavLink to="/admin-layout/employee-list" className="block pl-10">Employees</NavLink>
                            </li>
                            <li className="mb-2 text-gray-500 hover:opacity-75 hover:text-[#bc9b79]">
                                <NavLink to="/admin-layout/client-list" className="block pl-10">Clients</NavLink>
                            </li>
                        </ul> 
                    </div>
                )}


                {/* Meals */}
                <h2>
                    <div 
                        onClick={() => setToggle2(!toggle2)} 
                        className='cursor-pointer text-white flex items-center justify-between w-full p-1 font-medium rtl:text-right hover:bg-[#bc9b79]'
                    >
                           <img src={mealIcon} width='25px' height='25px' alt="users"/>
                           <span>Meals</span>
                           <span>
                                {toggle2 ? (
                                              <img src={downIcon} width='15px' height='15px' alt="down"/>       
                                            ) : (
                                              <img src={upIcon} width='15px' height='15px' alt="up"/>
                                            )
                                }
                            </span>
                    </div>
                </h2>
                {/*Main Side meals  */}
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