import {create} from 'zustand';
import axios from  "axios"

const TaskStore=create((set)=>({

   
    CreateTaskRequest:async(reqBody)=>{
        try {
            let res=await axios.post(`/api/create-Task`,reqBody,{withCredentials : true});
            return res.data['status'] === "success";
        }catch (error) {
           
        }
    },
    UpdateTaskRequest:async(reqBody,id)=>{
        try {
            let res=await axios.post(`/api/update-Task/${id}`,reqBody,{withCredentials : true});
            return res.data['status'] === "success";
        }catch (error) {
           
        }
    },
    
    TaskList:null,
    TaskListRequest:async()=>{
        try {
            let res=await axios.get(`/api/read-all-task`,{withCredentials : true});
            set({TaskList:res.data['data']})
            return res.data['status'] === "success";
        }catch (error) {
           
        }
    },
    RemoveTaskRequest:async(id)=>{
        try {
            let res=await axios.get(`/api/delete-task/${id}`,{withCredentials : true});
            return res.data['status'] === "success";
        }catch (error) {
           
        }
    },
   

   

}))

export default TaskStore;