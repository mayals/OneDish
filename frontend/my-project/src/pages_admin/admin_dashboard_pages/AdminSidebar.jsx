
import { BrowserRouter, Routes, Route, NavLink ,Link, useNavigate} from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import {useState, useEffect}  from  'react';

// import projectsIcon from '../../assets/star-sun-black-shape-svgrepo-com.svg';
// import paymentIcon from '../../assets/money-svgrepo-com.svg';
// import dashboardIcon from '../../assets/dashboard-svgrepo-com.svg';
// import adminAvatar from  "../../assets/admin-with-cogwheels-svgrepo-com.svg"


const AdminSidebar = () => {
    const navigate = useNavigate();

    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);
    
  
    // check the user is authenticated user 
    const accessToken = localStorage.getItem('accessToken');
    console.log('accessToken=',accessToken)
    if(!accessToken){
        // accessToken = null
        navigate('/login')
    }
    
    const profilePicture = useSelector((state) => state.authSlRed.profilePicture);
    console.log('profilePicture from redux=',profilePicture)

    
    
    return (
        <section className="bg-[#7532e5] text-white px-4 justify-center">

            {/*  show at md size only     authentication user */}
            
            
            
            <div className="flex justify-center items-center gap-1 mt-5">
               
                    { profilePicture ? (
                                            <img
                                                className="w-11 h-11 bg-gray-300 rounded-full shrink-0"
                                                src={`http://127.0.0.1:8000/${profilePicture}`}
                                                alt="Profile Picture"
                                            />   
                                        ) : (
                                            <img 
                                                src={adminAvatar}
                                                className='bg-white h-20 w-20 p-2 rounded rounded-lg'
                                                alt="admin avatar default"
                                            /> 
                                        )
                    }
               
                
            </div>

            <h3 className='text-center text-2xl py-3 my-2 font-bold shadow-black-500/50'>
                Administration
            </h3> 

            
            
            <div id="accordion-color" data-accordion="collapse" data-active-classes="bg-white text-[#0399ff]"> 
                <h2 id="a1 text-black">
                    <Link  to="/admin-layout/dashboard-page" type="button"className="flex items-center justify-between w-full p-1 font-medium rtl:text-right text-gray-900 border border-purple-800 focus:ring-1 focus:ring-gray-800 hover:bg-[#019bff]" data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1">
                        <div className='text-[#dde3ed] font-myRobotofont flex items-center'>
                           <img className='mx-2 lineColor-[#dde3ed]' src={dashboardIcon} width='20px' height='20px' alt="users" /><span className='text-black text-xl'>Dasboard</span>
                        </div>
                    </Link>
                </h2>
                {/*  users */}
                <h2 id="a1">
                    <button type="button" onClick={() => setToggle1(!toggle1)} className="flex items-center justify-between w-full p-1 font-medium rtl:text-right text-gray-900 border border-purple-800 focus:ring-1 focus:ring-gray-800 hover:bg-[#019bff]" data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1">
                        <span className='text-[#dde3ed] font-myRobotofont flex items-center'>
                           <img className='mx-2 lineColor-[#dde3ed]' src={usersIcon} width='20px' height='20px' alt="users" />Users
                        </span>
                        {toggle1 ? (
                            <svg className="w-3 h-3 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        ) : (
                            <svg className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        )}
                    </button>
                </h2>
                {/* employee and client  */}
                {toggle1 && (
                    <div id="b1">
                        <ul className='py-2 bg-white text-[#7425ff]'>
                            <li className="mb-2 bg-white hover:bg-gray-800 hover:opacity-75 hover:text-white">
                                <NavLink to="/admin-layout/employee-list" className="block pl-10">Employees</NavLink>
                            </li>
                            <li className="mb-2 bg-white hover:bg-gray-800 hover:opacity-75 hover:text-white">
                                <NavLink to="/admin-layout/client-list" className="block pl-10">Clients</NavLink>
                            </li>
                        </ul> 
                    </div>
                )}
                {/* projects   */}
                <h2 id="a2">
                    <button type="button" onClick={() => setToggle2(!toggle2)} className="flex items-center justify-between w-full p-1 font-medium rtl:text-right text-gray-900 border border-purple-800 focus:ring-1 focus:ring-gray-800 hover:bg-[#019bff]" data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1">
                        <span className='text-[#dde3ed] font-myRobotofont flex items-center'>
                           <img className='mx-2 lineColor-[#dde3ed]' src={projectsIcon} width='20px' height='20px' alt="projects" />Projects
                        </span>
                        {toggle2 ? (
                            <svg className="w-3 h-3 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        ) : (
                            <svg className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        )}
                    </button>
                </h2>
                {/* category   */}
                {toggle2 && (
                    <div id="b2">
                        <ul className='py-2 bg-white text-[#7425ff]'>
                            <li className="mb-2 bg-white hover:bg-gray-800 hover:opacity-75 hover:text-white">
                                <NavLink to="/admin-layout/category-list" className="block pl-10">Category</NavLink>
                            </li>
                            <li className="mb-2 bg-white hover:bg-gray-800 hover:opacity-75 hover:text-white">
                                <NavLink to="/admin-layout/subcategory-list" className="block pl-10">Sub Category</NavLink>
                            </li>
                            <li className="mb-2 bg-white hover:bg-gray-800 hover:opacity-75 hover:text-white">
                                <NavLink to="/admin-layout/project-list" className="block pl-10">Projects</NavLink>
                            </li>
                            <li className="mb-2 bg-white hover:bg-gray-800 hover:opacity-75 hover:text-white">
                                <NavLink to="/admin-layout/task-list" className="block pl-10">Tasks</NavLink>
                            </li>
                            <li className="mb-2 bg-white hover:bg-gray-800 hover:opacity-75 hover:text-white">
                                <NavLink to="#" className="block pl-10">Archief</NavLink>
                            </li>
                        </ul>  
                    </div>
                )}
                {/* payment  */}
                <h2 id="a3">
                    <button type="button" onClick={() => setToggle3(!toggle3)} className="flex items-center justify-between w-full p-1 font-medium rtl:text-right text-gray-900 border border-purple-800 focus:ring-1 focus:ring-gray-800 hover:bg-[#019bff]" data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1">
                        <span className='text-[#dde3ed] font-myRobotofont flex items-center'>
                           <img className='mx-2 lineColor-[#dde3ed]' src={paymentIcon} width='20px' height='20px' alt="payments" />Payments
                        </span>
                        {toggle3 ? (
                            <svg className="w-3 h-3 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        ) : (
                            <svg className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        )}
                    </button>
                </h2>
                {/* payment  */}
                {toggle3 && (
                    <div id="b3">
                        <ul className='py-2 bg-white text-[#7425ff]'>
                            <li className="mb-2 bg-white hover:bg-gray-800 hover:opacity-75 hover:text-white">
                                <NavLink to="/admin-dashboard/payments/payment1" className="block pl-10">Payment1</NavLink>
                            </li>
                            <li className="mb-2 bg-white hover:bg-gray-800 hover:opacity-75 hover:text-white">
                                <NavLink to="/admin-dashboard/payments/payment2" className="block pl-10">Payment2</NavLink>
                            </li>
                        </ul> 
                    </div>
                )}
            </div>       
        </section>  
    );
};

export default AdminSidebar;