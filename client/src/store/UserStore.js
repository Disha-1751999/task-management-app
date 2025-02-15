import {create} from 'zustand';
import Cookies from "js-cookie";
import axios from  "axios"

const UserStore=create((set)=>({

    isLogin:()=>{
        return !!Cookies.get('token');
    },
   

    UserRegisterRequest:async(reqBody)=>{
        try {
            let res=await axios.post(`/api/register`,reqBody,{withCredentials : true});
            return res.data;
        }catch (error) {
            console.console.log((error));
        }
    },
    UserLoginRequest:async(reqBody)=>{
        try {
            let res=await axios.post(`/api/login`,reqBody,{withCredentials : true});
            return res.data;
        }catch (error) {
            console.console.log((error));
        }
    },
    UserLogoutRequest:async()=>{
        try {
            let res=await axios.get(`/api/logout`,{withCredentials : true});
            return res.data['status'] === "success";
        }catch (error) {
            console.console.log((error));
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
            let res=await axios.get(`/api/get-user-info`,{withCredentials : true});
            if(res.data['status'] === "success"){
                
                const data={...res.data.data}
               set({UserInfo:{...data}})
                return true
            };
        }catch (error) {
            console.console.log((error));
        }
    },

    UpdateProfileRequest:async(reqBody)=>{
        try {
            let res=await axios.post(`/api/update-profile`,reqBody,{withCredentials : true});
            if(res.data['status'] === "success"){
              return true
            };
        }catch (error) {
           console.console.log((error));
           
        }
    },
    SendOtpRequest:async(email)=>{
        try {
            let res=await axios.post(`/api/send-otp`,{email:email},{withCredentials : true});
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
            let res=await axios.post(`/api/verify-otp`,{otp:otp,email:email},{withCredentials : true});
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
            let res=await axios.post(`/api/change-password`,{password:password,email:email},{withCredentials : true});
            if(res.data['status'] === "success"){
              return true
            };
        }catch (error) {
           console.log((error));
        }
    },
   
   

}))

export default UserStore;