import React, { useEffect, useState } from 'react'
import UserStore from '../../store/UserStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ToggleStore from "../../store/ToggleStore";
import { ImMenu } from "react-icons/im";

function Profile() {
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const {GetUserInfoRequest,UserInfo,UpdateProfileRequest}=UserStore()
  
  const {toggleOpen}= ToggleStore()

 useEffect(()=>{
        (async()=>{
         let res=await GetUserInfoRequest()
         if(res){
          setUsername(UserInfo.username)
          setBio(UserInfo.bio)
         }
        })()
      },[])
  
  const saveChanges= async ()=>{
    if(username.length<1){      
      toast.error("You can't set username empty")
      return;
    }else{
      let data= await UpdateProfileRequest({username:username,bio:bio})
     if(data){
      await GetUserInfoRequest()
      toast.success('Profile Information Updated')
     } 
    }
         
    }
 
 
 
  return (
    <div className=' h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-2 w-[80vw] md:w-max mt-10 md:mt-0'>
      <button>
          <ImMenu onClick={toggleOpen} className="text-4xl text-white cursor-pointer hover:text-gray-100 transition-all duration-300 md:hidden" />
      </button>
         <div className='grid grid-cols-1 md:grid-cols-2 mt-16 md:mt-5 gap-12 md:gap-0  items-center justify-center'>
              <div className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'> 
              <div className='h-32 w-32  rounded-full overflow-hidden cursor-pointer bg-[#4cc9f02a] text-[#4cc9f0] border-[2px] border-[#4cc9f0bb]'>
                {
                (<div className={`uppercase h-32 w-32  text-5xl border-[1px] flex items-center justify-center rounded-full `}>
                  {
                    UserInfo?.email.split("").shift()
                  }
                </div>)
                }
              </div>
            
              </div>
              <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center '>
                <div className='w-full'>
              <input
              placeholder='Email'
              type='email'
              disabled
              value={UserInfo?.email}
              className='rounded-lg p-4 bg-[#2c2e3b] border-none text-gray-300'
              />

                </div>

                <div className='w-full'>
              <input
              placeholder='Username'
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
              type='text'
              className='rounded-lg p-4 bg-[#2c2e3b] border-none focus:border-[#4cc9f0bb]'
              
              />

                </div>

                <div className='w-full'>
              <input
              placeholder='Short Bio'
              type='text'
              className='rounded-lg p-4 bg-[#2c2e3b] border-none'                         
              value={bio}
              onChange={(e)=>{setBio(e.target.value)}}
              />

                </div>
                
              </div>

         </div>
         <div className='w-full mt-10 flex flex-col items-center justify-center gap-10 '>
          <button onClick={saveChanges} className='h-10  p-2 px-4 rounded-md bg-cyan-500 hover:bg-cyan-600 transition-all duration-300'
          > Save Changes</button>
          <Link to={"/change-password"} className="text-blue-500 text-md text-right cursor-pointer">
              Change password?
              </Link>
         </div>
      </div>
    </div>
  )
}

export default Profile