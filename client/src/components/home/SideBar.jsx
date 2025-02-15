import React, { useEffect } from 'react'
import { TbArticle  } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import UserStore from '../../store/UserStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SideBar() {

    const {UserLogoutRequest, UserInfo,GetUserInfoRequest}=UserStore()
    const navigate=useNavigate();

    useEffect(()=>{
        (async()=>{
         await GetUserInfoRequest()
        })()
      },[])

    const handleLogout=async()=>{
      const res=   await UserLogoutRequest()
      if(res){
        toast.success("Logged out successfully..! ")
        navigate('/login')
      }
    }

   


  return (
    <div className='flex flex-col gap-10  md:h-[90vh] bg-gray-900'>
        <div>
            <h2 className='text-xl font-semibold'>{UserInfo.username}</h2>
            <h4 className='mb-2 text-gray-400'>{UserInfo.email}</h4>
            <hr />
        </div>
        <div className='flex flex-col gap-4'>
            <NavLink to={'/'} className=' flex items-center gap-2 border border-gray-700 rounded-md p-3 cursor-pointer hover:bg-white hover:text-gray-900 transition-all duration-300'>
                <TbArticle />
                All Task
            </NavLink>
            <NavLink to={'/profile'} className=' flex items-center gap-2 border border-gray-700 rounded-md p-3 cursor-pointer hover:bg-white hover:text-gray-900 transition-all duration-300'>
                <FaUser />
                Profile
            </NavLink>
        </div>
        <div className='mt-auto'>
            <button onClick={handleLogout} className='bg-gray-600 w-full p-2 rounded cursor-pointer hover:bg-white hover:text-gray-900 transition-all duration-300'>Log Out</button>
        </div>
    </div>
  )
}

export default SideBar