import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IsEmail, IsEmpty } from "../utility/ValidationHelper";
import toast from "react-hot-toast";
import UserStore from "../store/UserStore";

function LoginPage() {

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { UserLoginRequest,GetUserInfoRequest,setUserInfo } = UserStore();
  const navigate= useNavigate()

  const handleLogin = async () => {
    if (IsEmail(email) && !IsEmpty(password)) {
      let res = await UserLoginRequest({
        password: password,
        email: email,
      });

      if (res['status'] === "success") {
        toast.success("Login Successful..!");
        await GetUserInfoRequest()
        navigate('/')
        
      }else{
        toast.error(res.message)
      }
    } 
  };

  return (
    <>
      <div className="h-[98vh] w-[98vw] flex  justify-center items-center">
        <div className="h-[80vh] w-[80vw]  flex flex-col justify-center items-center ">
          <div className="text-white text-2xl font-semibold my-5">Login</div>
          <div className="max-w-sm mx-auto border border-gray-100 p-10 w-full rounded">
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-semibold text-white "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className=" border bg-gray-900 border-gray-400 text-white text-sm rounded-lg focus:border-teal-200 focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5 "
                placeholder="....."
                required=""
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="mb-5 w-full">
              <Link to={'/change-password'} className="text-blue-500 text-sm text-right w-full ms-auto">
                forget password?
              </Link>
            </div>
            <div className="w-full flex justify-center mb-5">
              <button
              onClick={handleLogin}
                type="submit"
                className="text-white  bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm mx-auto px-5 py-2.5 text-center "
              >
                Submit
              </button>
            </div>

            <div className="mb-5 text-center">
              <p className="mb-4">or</p>
              <p className="text-white text-sm ">
                Don't have an account? <Link className="text-blue-500" to={'/register'}>Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
