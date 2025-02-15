import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IsEmail, IsEmpty } from "../utility/ValidationHelper";
import toast from "react-hot-toast";
import UserStore from "../store/UserStore";

function RegisterPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { UserRegisterRequest,GetUserInfoRequest ,setUserInfo} = UserStore();
  const navigate= useNavigate()

  const handleRegister = async () => {
    if (!IsEmpty(username) && IsEmail(email) && !IsEmpty(password)) {
      let res = await UserRegisterRequest({
        username: username,
        password: password,
        email: email,
      });

      if (res['status'] === "success") {
        toast.success("Registration Successful..!");        
        await GetUserInfoRequest()
        navigate('/')
        
      }else{
        toast.error(res.message)
      }
    } 
  };

  return (
    <>
      <>
        <div className="h-[98vh] w-[98vw] flex  justify-center items-center">
          <div className="h-[80vh] w-[80vw]  flex flex-col justify-center items-center ">
            <div className="text-white text-2xl font-semibold my-5">
              Register
            </div>
            <div className="max-w-sm mx-auto border border-gray-100 p-10 w-full rounded">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-semibold text-white ">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className=" border bg-gray-900 border-gray-400 text-white text-sm rounded-lg focus:border-teal-200 focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5 "
                  placeholder="username"
                  required
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-semibold text-white ">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  className=" border bg-gray-900 border-gray-400 text-white text-sm rounded-lg focus:border-teal-200 focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5 "
                  placeholder="name@flowbite.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-semibold text-white ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className=" border bg-gray-900 border-gray-400 text-white text-sm rounded-lg focus:border-teal-200 focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5 "
                  placeholder="....."
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="w-full flex justify-center mb-5">
                <button
                  onClick={handleRegister}
                  type="submit"
                  className="text-white  bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm mx-auto px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              </div>

              <div className="mb-5 text-center">
                <p className="mb-4">or</p>
                <p className="text-white text-sm ">
                  Already have an account?{" "}
                  <Link className="text-blue-500" to={"/login"}>
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default RegisterPage;
