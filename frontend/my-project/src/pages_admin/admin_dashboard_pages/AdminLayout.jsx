import {  Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar.jsx';
import AdminSidebar from './AdminSidebar.jsx';



const AdminLayout = () => {
    return (
        <section>
        
            <div className="flex h-full">
            
                <AdminSidebar />
                
                    <div className="flex-1 flex flex-col">
                        <AdminNavbar />
                        <div className="flex-1">
                            <Outlet />
                        </div>
                    </div> 

            </div>
        </section>);
};

export default AdminLayout;


