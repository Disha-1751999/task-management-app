import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IsEmail } from '../utility/ValidationHelper';
import UserStore from './../store/UserStore';
import toast from 'react-hot-toast';
import EmailStore from '../store/EmailStore';

function ChangePasswordPage() {

    const [email, setEmail] = useState("");
  const {SendOtpRequest}=UserStore()
  const {setUserEmail}=EmailStore()
  const navigate=useNavigate()

    const handleSubmit=async()=>{
      if(IsEmail(email)){
        setUserEmail(email)
       let res= await SendOtpRequest(email)       
       if(res){
         navigate('/otp')
       }else{
        toast.error("Error")
       }
      }
    }
  return (
    <>
    <div className="h-[98vh] w-[98vw] flex  justify-center items-center">
      <div className="h-[80vh] w-[80vw]  flex flex-col justify-center items-center ">
        
        <div className="max-w-sm mx-auto border border-gray-300 p-10 w-full rounded">
        <div className="mb-10 ">
            
            <button className="flex items-start gap-2 text-white  bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm  px-5 py-2.5 ">
            <IoArrowBackCircleSharp className='text-xl' />
               <Link className="text-white" to={'/'}> Back to Home </Link>
            </button>
          </div>
          <div className="mb-5">
            <label
              
              className="block mb-2 text-sm font-semibold text-white "
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              className=" border bg-gray-900 border-gray-400 text-white text-sm rounded-lg focus:border-teal-200 focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5 "
              placeholder="name@flowbite.com"
              required=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="w-full flex justify-center mb-5">
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-white  bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm mx-auto px-5 py-2.5 text-center "
            >
              Submit
            </button>
          </div>

        
        </div>
      </div>
    </div>
  </>
  )
}

export default ChangePasswordPage