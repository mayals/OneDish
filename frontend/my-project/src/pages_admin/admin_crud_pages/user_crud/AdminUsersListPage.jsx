import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router";
// context 
import { UserContext } from '../../../../src/pages/account_pages/UserContext.jsx';
import { TokenContext }  from '../../../../src/pages/account_pages/TokenContext.jsx';
// react-toastify
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../common/Loading.jsx"
// SVG
import searchIcon from "../../../assets/search-svgrepo-com.svg"
import viewIcon from "../../../assets/view-svgrepo-com.svg"
import editIcon from "../../../assets/edit-svgrepo-com.svg"
import deleteIcon from "../../../assets/delete-2-svgrepo-com.svg"
import userIcon  from "../../../assets/user-male-svgrepo-com.svg"
// axios
import {AxiosInstance} from "../../../api/AxiosInstance.js"





const AdminUserListPage = () => {
    const navigate = useNavigate()
    // Get context values
    const { accessToken } = useContext(TokenContext);
    const { user, role }  = useContext(UserContext);
    
    // state
    const [loading, setLoading] = useState(false);
    //  filter by user.role -- radio buttons 
    // Add useSearchParams hook
    const [searchParams] = useSearchParams();
    
    // Modify initial state to check URL params
    const [showAllUsers, setShowAllUsers] = useState(searchParams.get('role') !== 'client');
       
    

    // filter by email, fullName -- search form
    const [searchTerm, setSearchTerm] = useState(''); // filter value  
    ////// pagination //////////////////////////////////////////
    const [page, setPage] = useState(1); // Track current page
    const [count, setCount ] = useState();
    const [users, setUsers] = useState([]); //results 
    const [links, setLinks ] = useState();
    const limit = 3; // Items(projects) per page

  
    if (user && role !== "Admin") {
      console.log('role=',role)
      toast.error( "You have no permission to reach this page"); 
      navigate("/")
    }
    if (!accessToken) {
      console.log('accessToken=',accessToken)
      toast.error( "Your login is expired!"); 
      navigate("/")
    }

  useEffect(() => {
      const roleFromURL = searchParams.get('role');
      if (roleFromURL === 'client') {
          setShowAllUsers(false);
      }else{
          setShowAllUsers(true);
      }

  }, [searchParams]);


  useEffect(() => {
      const fetchUsersResults = async({ limit, offset }) => {
          console.log('limit=',limit)
          console.log('offset=',offset)
          
          try {
            setLoading(true);
            const response = await AxiosInstance.get('account/list-user/?limit=${limit}&offset=${offset}');
            console.log("API all users Response=", response); // Add this to verify structure
            console.log("API all users Response.data=", response.data); // Add this to verify structure
            setUsers(response.data.results);
            setCount(response.data.count);
            setLinks(response.data.links);
            setLoading(false);
        
          } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || "Failed to load users");
          }
      }


      const fetchClientsResults = async({ limit, offset }) => {
        console.log('limit=',limit)
        console.log('offset=',offset)
        
        try {
          setLoading(true);
          const response = await AxiosInstance.get('account/list-client/?limit=${limit}&offset=${offset}');
          console.log("API clients Response=", response); // Add this to verify structure
          console.log("API clients Response.data=", response.data); // Add this to verify structure
          setUsers(response.data.results);
          setCount(response.data.count);
          setLinks(response.data.links);
          setLoading(false);
      
        } catch (error) {
          setLoading(false);
          toast.error(error.response?.data?.message || "Failed to load clients");
        }
    }
    
      // results
      if (showAllUsers === true){
          // fetch all users
          fetchUsersResults({ limit, offset: (page - 1) * limit });
      }else{
          // fetch clients only 
          fetchClientsResults({ limit, offset: (page - 1) * limit });
      }
  }, [showAllUsers]);
// /////////////////////////////////////////////////////////////////



 ////////////////////////////////////////////////////////////////////////////// 
  // general fetchUsersByLinks function---links.previous & links.next
  const fetchUsersByLinks = async (url) => {
      if (user && user.role === "Admin") {
          console.log('user.role=',user.rule)
          if (links){
                  try {
                    setLoading(true);
                    const response = await AxiosInstance.get(url);
                    console.log("url Response=", response); // Add this to verify structure
                    console.log("API Response.data=", response.data); // Add this to verify structure
                    setUsers(response.data.results);
                    setCount(response.data.count);
                    setLinks(response.data.links);
                    const totalPages = Math.ceil(count/limit);
                    console.log('totalPages =',totalPages)
                    setLoading(false);
                  
                  } catch (error) {
                    setLoading(false);
                    toast.error(error.response?.data?.message || "Failed to load users");
                  } 
          }
      }
  };

  const totalPages = Math.ceil(count/limit);
  console.log('totalPages =',totalPages)

  // Handle previous page
  const handlePreviousPage = () => {
  if (links.previous) {
      fetchUsersByLinks(links.previous);
      setPage(page => page - 1);
      console.log('page =',page)
  }
};

  // Handle next page
  const handleNextPage = () => {
  if (links.next) {
      fetchUsersByLinks(links.next); 
      setPage(page => page + 1);
      console.log('page =',page) 
  }
};
 ////////////////////////////////////////////////////////////////////////////// 




// /fetchUsersByPressedPage//////////////////////////////////////////////////////////////////////
const fetchUsersByPressedPage = async(page) => {
  if (user && user.role === "Admin") {
      console.log('user.role=',user.rule)
      
      try {
        setLoading(true);
        const response = await AxiosInstance.get(`account/list-user/?page=${page}`);
        console.log("ByPressedPageAPI Response=", response); // Add this to verify structure
        console.log("ByPressedPageAPI Response.data=", response.data); // Add this to verify structure
        setUsers(response.data.results);
        setCount(response.data.count);

        setLoading(false);
      
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message || "Failed to load users");
      }
  }
};

// handlePressedPage
const handlePressedPage = (index) => {
  console.log('index =', index);
  const pressedPage = index + 1; // Increment index to get the correct page number1
  console.log('pressedPage =', pressedPage);
  setPage(pressedPage); // This is asynchronous

  // Instead of using `page` which is outdated here, use `newPage` directly
  console.log('page will be fetched =', pressedPage);
  
  fetchUsersByPressedPage(pressedPage); // Use newPage directly
  };
//////////////////////////////////////////////////////////







    // Add debounced search handler if needed
    // In your filteredUsers [results user] calculation:
    const filteredUsers = Array.isArray(users) 
                                              ? users.filter(user => 
                                                                user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
                                                            )
                                              : [];
 


  return (

    <section className="px-4 sm:px-6 lg:px-8">
      {/* loading  */}
      {loading && <Loading />}
      {/* tostify  */}
      <ToastContainer />
      {/* Users List */}
      <h2 className='text-center text-xl py-2'>Users List</h2>

      {/* Search and Add Button Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Search Input */}
        <div className="relative  sm:w-60 md:w-80 text-gray-500 focus-within:text-gray-900">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <img src={searchIcon} className="h-6 w-6" alt="Search" />
          </div>
          <input 
            type="text" 
            id="default-search" 
            className="block w-full h-11 pl-12 pr-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" 
            placeholder="Search for users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* radio buttons fot filter by user.role */}
        <div className="flex items-center space-x-4 ml-4">
                <label className="flex items-center space-x-1">
                    <input
                        type="radio"
                        checked={showAllUsers}
                        onChange={() => {
                            setShowAllUsers(true);
                            setPage(1);
                            navigate('/admin-layout/user-list');
                        }}
                        className="form-radio text-[#d27556] focus:ring-[#d27556]"
                    />
                    <span className="text-sm">All Users</span>
                </label>
                <label className="flex items-center space-x-1">
                    <input
                        type="radio"
                        checked={!showAllUsers}
                        onChange={() => {
                            setShowAllUsers(false);
                            setPage(1);
                            navigate('/admin-layout/user-list?role=client');
                        }}
                        className="form-radio text-[#d27556] focus:ring-[#d27556]"
                    />
                    <span className="text-sm">Clients Only</span>
                </label>
        </div>
       

        {/* Add User Button */}
        <button 
          className="ml-4 px-6 py-2 bg-[#d27556] text-white font-medium rounded-full hover:bg-[#ffd8a8] hover:text-[#d27556] transition"
        >
          Add User
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden border rounded-lg shadow-xs">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                User Id
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-[#bc9b79]/25 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                  {user?.profile?.profile_picture ? (
                    <img
                      src={`http://localhost:8000${user.profile.profile_picture}`}
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" 
                      alt={user.full_name} 
                    />
                  ) : (
                    <img 
                      src={userIcon} 
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" 
                      alt={user.full_name}
                    />
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.full_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                  {user.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                  {user.role}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Link to={`/admin-layout/user-detail/${user.id}`} className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <img src={viewIcon} className="h-5 w-5 sm:h-6 sm:w-6" alt="View" />
                    </Link>
                    <Link to={`/admin-layout/user-update/${user.id}`} className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <img src={editIcon} className="h-5 w-5 sm:h-6 sm:w-6" alt="Edit" />
                    </Link>
                    <Link to={`/admin-layout/user-delete-confirm/${user.id}`}  className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <img src={deleteIcon} className="h-5 w-5 sm:h-6 sm:w-6" alt="Delete" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {/*  pagination  */}
       <nav className='flex justify-center my-4' aria-label="Page navigation example">
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                        {/* previous button */}
                        {page > 1 && (
                            <button type='button' 
                                // disabled={!links.previous} 
                                onClick={handlePreviousPage} 
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                                </svg>
                            </button>
                        )}
                    </li>

                    {/* Page numbers */}
                    {totalPages > 1 && (
                        Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button 
                                    type="button"
                                    onClick={() => handlePressedPage(index)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight ${page === index + 1 ? 'text-blue-600 border border-blue-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300'} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))
                     )}   
                    <li>
                        {/* Next button  */}
                        {page < totalPages && (
                            <button type='button' 
                                onClick={handleNextPage} 
                                // disabled={!links.next}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                            </button>
                        )}
                    </li>
                </ul>
            </nav>
            
    </section>
  );
};

export default AdminUserListPage;