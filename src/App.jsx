
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import PageError from './pages/PageError';
import Registration from './pages/Auth/Registration';
import Login from './pages/Auth/Login';
import Forgot from './pages/Auth/Forgot';
import PrivateRoute from './component/Routes/Private';
import AdminRoute from './component/Routes/AdminRoute';
import UserDashboard from './pages/User/UserDashboard';
import Profile from './pages/User/Profile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import Product from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Users from './pages/Admin/Users';
import AdminProfile from './pages/Admin/AdminProfile';
import Scripts from './pages/Scripts';
import Search from './pages/Search';
import VerifyEmail from './pages/VerifyEmail';
import { useAuth } from './context/auth';
import FreeJobPost from './pages/Admin/FreeJobPost';
import LogHome from './pages/LogHome';
import MyJobPost from './pages/Admin/MyJobPost';
import EditJobPost from './pages/Admin/EditJobPost';

function App() {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={auth?.user?<Navigate to="/log-home"/>:<Home/>}/>
        <Route path="/log-home" element={auth?.user?<LogHome/>:<Navigate to="/login"/>}/>
        
        <Route path="/registration" element={auth?.user?<Navigate to="/log-home"/>:<Registration/>}/>
        <Route path="/login" element={auth?.user?<Navigate to="/log-home"/>:<Login/>}/>
        <Route path="/forgot" element={auth?.user?<Navigate to="/log-home"/>:<Forgot/>}/>

        <Route path="/search" element={<Search />} />
        
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<UserDashboard/>}/>
          <Route path="user/profile" element={<Profile/>}/>
        </Route>

        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="admin/create-category" element={<CreateCategory/>}/>
          <Route path="admin/product" element={<Product/>}/>
          <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
          <Route path="admin/users" element={<Users/>}/>
          <Route path="admin/admin-profile" element={<AdminProfile />} />
          <Route path="admin/myblogpost" element={<MyJobPost/>}/>
          <Route path="admin/editblogpost/:slug" element={<EditJobPost/>}/> 
          <Route path="admin/freeblogpost" element={<FreeJobPost/>}/>
        </Route>

        <Route path="/script" element={<Scripts />} />
        <Route path="*" element={<PageError/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
       
      </Routes>
    </>
  )
}

export default App
