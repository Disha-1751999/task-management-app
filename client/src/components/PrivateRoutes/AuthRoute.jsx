import UserStore from '../../store/UserStore'
import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'

function AuthRoute() {
  const {isLogin}=UserStore()

 
  // if (isLogin()) {
  //   return <Navigate to="/" />;
  // }
  // return <Outlet />;
  return (
    isLogin() ?  <Navigate to='/'/> : <Outlet />
  )
}

export default AuthRoute