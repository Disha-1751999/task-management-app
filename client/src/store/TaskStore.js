import {create} from 'zustand';
import axios from  "axios"

const BASE_URL=import.meta.env.VITE_SERVER_URL

const TaskStore=create((set)=>({

   
    CreateTaskRequest:async(reqBody)=>{
        try {
            let res=await axios.post(`${BASE_URL}/api/create-Task`,reqBody,{withCredentials : true});
            return res.data['status'] === "success";
        }catch (error) {
           
        }
    },
    UpdateTaskRequest:async(reqBody,id)=>{
        try {
            let res=await axios.post(`${BASE_URL}/api/update-Task/${id}`,reqBody,{withCredentials : true});
            return res.data['status'] === "success";
        }catch (error) {
           
        }
    },
    
    TaskList:null,
    TaskListRequest:async()=>{
        try {
            let res=await axios.get(`${BASE_URL}/api/read-all-task`,{withCredentials : true});
            set({TaskList:res.data['data']})
            return res.data['status'] === "success";
        }catch (error) {
           
        }
    },
    RemoveTaskRequest:async(id)=>{
        try {
            let res=await axios.get(`${BASE_URL}/api/delete-task/${id}`,{withCredentials : true});
            return res.data['status'] === "success";
        }catch (error) {
           
        }
    },
   

   

}))

export default TaskStore;