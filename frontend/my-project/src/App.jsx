import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';


import {TokenProvider} from './pages/account_pages/TokenProvider';
import {UserProvider} from './pages/account_pages/UserProvider';
import { MainMealProvider } from  './pages/home_page_comp/MainMealProvider';
import { SideMealsProvider } from  './pages/home_page_comp/SideMealsProvider';



// visitors
import HomePage from       "./pages/home_page_comp/HomePage";
import Login from           "./pages/account_pages/Login";
import Register from        "./pages/account_pages/Register";
import VerifyeEmail from    "./pages/account_pages/VerifyeEmail";
import Unauthorized from    "./pages/account_pages/Unauthorized";
//  password
import ForgetPassword from  "./pages/account_pages/ForgetPassword";
import SetNewPassword from  "./pages/account_pages/SetNewPassword";
import ChangePassword from  "./pages/account_pages/ChangePassword";

// admin
import AdminLayout from './pages_admin/admin_dashboard_pages/AdminLayout.jsx';
import AdminDashboard from './pages_admin/admin_dashboard_pages/AdminLayout.jsx'; 

// tag  pages
import AdminTagCreate from './pages_admin/admin_crud_pages/tag_crud/AdminTagCreate.jsx'
import AdminTagList   from './pages_admin/admin_crud_pages/tag_crud/AdminTagList.jsx'
import AdminTagDetail from './pages_admin/admin_crud_pages/tag_crud/AdminTagDetail.jsx'
import AdminTagUpdate from './pages_admin/admin_crud_pages/tag_crud/AdminTagUpdate.jsx'


// main meal pages
import AdminMainMealCreate from './pages_admin/admin_crud_pages/main_meal_crud/AdminMainMealCreate.jsx'
import AdminMainMealList   from './pages_admin/admin_crud_pages/main_meal_crud/AdminMainMealList.jsx'
import AdminMainMealDetail from './pages_admin/admin_crud_pages/main_meal_crud/AdminMainMealDetail.jsx'
import AdminMainMealUpdate from './pages_admin/admin_crud_pages/main_meal_crud/AdminMainMealUpdate.jsx'


// side meal pages
import AdminSideMealCreate from './pages_admin/admin_crud_pages/sidemeal_crud/AdminSideMealCreate.jsx'
import AdminSideMealList   from './pages_admin/admin_crud_pages/sidemeal_crud/AdminSideMealList.jsx'
import AdminSideMealDetail from './pages_admin/admin_crud_pages/sidemeal_crud/AdminSideMealDetail.jsx'
import AdminSideMealUpdate from './pages_admin/admin_crud_pages/sidemeal_crud/AdminSideMealUpdate.jsx'



// user pages
import AdminUserList   from   './pages_admin/admin_crud_pages/user_crud/AdminUserList.jsx'
import AdminUserDetail from   './pages_admin/admin_crud_pages/user_crud/AdminUserDetail.jsx'
import AdminUserUpdate from   './pages_admin/admin_crud_pages/user_crud/AdminUserUpdate.jsx'










const App = () =>{

        return (
        
            <BrowserRouter basename='/OneDish/'>
                
                {/* providers */}
                <TokenProvider>
                <UserProvider>
                <MainMealProvider>
                <SideMealsProvider>
                    
                    
                    <Routes>
                        {/* ###################  Visitor  ################# */}
                        {/* for all  visitors- allow any - No authentication */}
                        <Route path="/"                element={<HomePage />} />
                        <Route path="/register"        element={<Register />} />
                        <Route path="/verify-email"    element={<VerifyeEmail />} />
                        <Route path="/login"           element={<Login />} />
                        <Route path="/unauthorized"    element={<Unauthorized />} />
                        <Route path="*"                element={<h1>Page Not Found</h1>} />
                        {/*   Forget Password */}
                        <Route path="/forget-password" element={<ForgetPassword />} />
                        <Route path="/set-new-password" element={<SetNewPassword />} />
                        <Route path="/change-password" element={<ChangePassword/>} />
                        

                        {/* ###################  Admin  ################# */}
                        {/*  only for admin - Need authentication */}
                        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>    
                            <Route path="/admin-layout"    element={<AdminLayout />}>
                                {/* dashboard */}
                                {/* <Route path="dashboard-page" element={<AdminDashboard />} /> */}
                                {/* --user service -- */}
                                {/* user  */}
                                <Route path="user-list"            element={<AdminUserList />} />
                                <Route path="user-detail/:id"      element={<AdminUserDetail />} />
                                <Route path="user-update/:id"      element={<AdminUserUpdate />} /> 
                                
                                {/* --meal service -- */}
                                {/* tag */}
                                <Route path="tag-create"        element={<AdminTagCreate />} />
                                <Route path="tag-list"          element={<AdminTagList />} />
                                <Route path="tag-detail/:id"    element={<AdminTagDetail />} />
                                <Route path="tag-update/:id"    element={<AdminTagUpdate />} />
                                {/*  main-meal */}
                                <Route path="main-meal-create"         element={<AdminMainMealCreate />} />
                                <Route path="main-meal-list"           element={<AdminMainMealList />} />
                                <Route path="main-meal-detail/:id"     element={<AdminMainMealDetail />} /> 
                                <Route path="main-meal-update/:id"     element={<AdminMainMealUpdate />} />
                                {/*  side-meal*/}
                                <Route path="side-meal-create"         element={<AdminSideMealCreate />} />
                                <Route path="side-meal-list"           element={<AdminSideMealList />} />
                                <Route path="side-meal-detail/:id"     element={<AdminSideMealDetail />} /> 
                                <Route path="side-meal-update/:id"     element={<AdminSideMealUpdate />} />
                            </Route> 
                        </Route>

                    </Routes>


                </SideMealsProvider>    
                </MainMealProvider>
                </UserProvider>
                </TokenProvider>
                
            
            </BrowserRouter> 
    
        )
}

export default App;