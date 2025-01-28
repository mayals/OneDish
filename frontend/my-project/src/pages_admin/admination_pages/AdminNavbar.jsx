import { NavLink, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    // Check if the user is authenticated
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        navigate('/login');
    }

    return (
        <nav className="bg-gray-200 text-white p-3">
            <ul className="flex flex-col md:flex-row justify-between items-center">
                {/* Hamburger Menu for Mobile */}
                <li className="md:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-700 hover:bg-gray-300 rounded-lg focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </li>

                {/* Search Bar */}
                <li className="w-full md:w-auto mb-2 md:mb-0">
                    <form className="flex items-center max-w-sm mx-auto">
                        <div className="w-full">
                            <input
                                type="text"
                                id="simple-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search branch name..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>
                    </form>
                </li>

                {/* Navigation Links */}
                <li className="text-center text-white flex gap-3 items-center">
                    <ul className="flex flex-col md:flex-row gap-2">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="bg-white">
                            {/* Placeholder for logo */}
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;