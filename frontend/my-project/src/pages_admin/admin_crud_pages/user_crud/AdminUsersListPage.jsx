import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // filter value
  
  // Get context values
  const { accessToken } = useContext(TokenContext);
  const { user, role }  = useContext(UserContext);


  useEffect(() => {
    const fetchUsers = async () => {
      if (user && user.role === "Admin") {
        console.log('user.role=',user.rule)
        try {
          setLoading(true);
          const response = await AxiosInstance.get('account/list-user/');
          console.log("API Response:", response.data); // Add this to verify structure
          setUsers(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error(error.response?.data?.message || "Failed to load users");
        }
      }
    };

    fetchUsers();
  }, [user]); // Add dependencies here

  // Add debounced search handler if needed
  // In your filteredUsers calculation:
  const filteredUsers = Array.isArray(users) ? users.filter(user => 
                      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    ): [];
 
 


  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      {loading && <Loading />}
      <ToastContainer />

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            {/* Search Input */}
            <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
              <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
                <img src={searchIcon} className="h-6 w-6" alt="Search" />
              </div>
              <input 
                type="text" 
                id="default-search" 
                className="block w-full sm:w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" 
                placeholder="Search for users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Table Container */}
            <div className="overflow-hidden border rounded-lg shadow-xs">
              <table className="min-w-full divide-y divide-gray-200">
                {/* thead */}
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
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-[#bc9b79]/25 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                            {user?.profile?.profile_picture ? (
                              <img 
                                src={user.profile.profile_picture} 
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
                            {/* Add your action buttons here */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUserListPage;