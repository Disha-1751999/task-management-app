
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Tasks from './components/user/Tasks';
import Profile from './components/user/Profile';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import  { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import ChangePasswordPage from './pages/ChangePasswordPage';
import OtpVerificationPage from './pages/OtpVerificationPage';
import ConfirmPasswordPage from './pages/ConfirmPasswordPage';
import AuthRoute from './components/PrivateRoutes/AuthRoute';

function App() {

 return (
    <div className="h-auto min-h-screen bg-gray-900 text-white p-2 relative">
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute/>}>
        <Route path='/' exact element={<HomePage />}>
             <Route index element={<Tasks/>}/>
             <Route path='/profile' element={<Profile/>}/>
        </Route>
        </Route>
        
        <Route path="/login" element={<AuthRoute />}>
            <Route index element={<LoginPage />} />
          </Route>
       
        <Route path='/change-password' element={<ChangePasswordPage/>}/>        
        <Route path='/otp' element={<OtpVerificationPage/>}/>
        <Route path='/confirm-password' element={<ConfirmPasswordPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
     </BrowserRouter>
     <Toaster position="top-right"
           reverseOrder={false}/>
    </div>
  )
}

export default App
