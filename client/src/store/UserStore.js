import {create} from 'zustand';
import Cookies from "js-cookie";
import axios from  "axios"

const BASE_URL=import.meta.env.VITE_SERVER_URL

const UserStore=create((set)=>({

    isLogin:()=>{
        return !!Cookies.get('token');
    },
   

    UserRegisterRequest:async(reqBody)=>{
        try {
            let res=await axios.post(`${BASE_URL}/api/register`,reqBody,{withCredentials : true});
            Cookies.set('token',res.data.token);
            return res.data;
        }catch (error) {
            console.log((error));
        }
    },
    UserLoginRequest:async(reqBody)=>{
        try {
            let res=await axios.post(`${BASE_URL}/api/login`,reqBody,{withCredentials : true});
            Cookies.set('token',res.data.token);
            return res.data;
        }catch (error) {
            console.log((error));
        }
    },
    UserLogoutRequest:async()=>{
        try {
            let res=await axios.get(`${BASE_URL}/api/logout`,{withCredentials : true});
            Cookies.remove('token')
            return res.data['status'] === "success";
        }catch (error) {
            console.log((error));
        }
    },
    UserInfo:{},

    setUserInfo:(data)=>{
        set((state)=>({
            UserInfo:{
                ...(state.UserInfo || {}),
               ...data
            }
        }))
    },

    GetUserInfoRequest:async()=>{
        try {
            let res=await axios.get(`${BASE_URL}/api/get-user-info`,{withCredentials : true});
            if(res.data['status'] === "success"){
                
                const data={...res.data.data}
               set({UserInfo:{...data}})
                return true
            };
        }catch (error) {
            console.log((error));
        }
    },

    UpdateProfileRequest:async(reqBody)=>{
        try {
            let res=await axios.post(`${BASE_URL}/api/update-profile`,reqBody,{withCredentials : true});
            if(res.data['status'] === "success"){
              return true
            };
        }catch (error) {
           console.log((error));
           
        }
    },
    SendOtpRequest:async(email)=>{
        try {
            let res=await axios.post(`${BASE_URL}/api/send-otp`,{email:email},{withCredentials : true});
            console.log(res)
            if(res.data['status'] === "success"){
              return true
            };
        }catch (error) {
           console.log((error));
        }
    },
    VerifyOtpRequest:async(otp,email)=>{
        try {
            let res=await axios.post(`${BASE_URL}/api/verify-otp`,{otp:otp,email:email},{withCredentials : true});
            console.log(res)
            if(res.data['status'] === "success"){
              return true
            };
        }catch (error) {
           console.log((error));
        }
    },
    ConfirmPasswordRequest:async(password,email)=>{
        try {
            let res=await axios.post(`${BASE_URL}/api/change-password`,{password:password,email:email},{withCredentials : true});
            if(res.data['status'] === "success"){
              return true
            };
        }catch (error) {
           console.log((error));
        }
    },
   
   

}))

export default UserStore;