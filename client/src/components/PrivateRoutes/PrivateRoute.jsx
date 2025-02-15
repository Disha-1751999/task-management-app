import React from 'react'
import UserStore from '../../store/UserStore'
import { Navigate ,Outlet} from 'react-router-dom'

function PrivateRoute() {

    const {isLogin}=UserStore()
  return (   
    isLogin() ? <Outlet /> : <Navigate to='/login' replace />
  
  )
}

export default PrivateRoute