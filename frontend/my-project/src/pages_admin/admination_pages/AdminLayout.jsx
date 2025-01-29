import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar.jsx';
import AdminSidebar from './AdminSidebar.jsx';
import React, { useState, useRef,useEffect} from 'react';




const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const navbarRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (navbarRef.current) {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }
    }, []);

    return (
        <section>
            <div className="flex h-full">
                {/* Sidebar - Hidden on small screens by default, visible when toggled */}
                <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative`}
                    style={{ top: `${navbarHeight}px` }} // Dynamic top margin based on navbar height
                >
                    <AdminSidebar />
                </div>

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Pass the toggleSidebar function to the Navbar and attach ref */}
                    <div ref={navbarRef}>
                        <AdminNavbar toggleSidebar={toggleSidebar} />
                    </div>
                    <div className="flex-1 p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminLayout;