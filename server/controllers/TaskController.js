import mongoose from 'mongoose';
import TaskModel from '../models/TaskModel.js';

const ObjectId= mongoose.Types.ObjectId;

export const CreateTask=async(req,res)=>{
   try{
    const {title,desc,due_date}= req.body
    const userId =req.userId;
    if(!title || !desc || !due_date){
      return res.status(200).json({status:'fail',message: 'Please fill all field'})
    }
    
    const data= await TaskModel.create({ title, desc, due_date,userId });
       return res.status(200).json({status:'success',message: ' Successful',data:data})
   
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}

export const UpdateTask=async(req,res)=>{
    try{
     const reqBody= req.body;
     const id=req.params.id;
         
     const data= await TaskModel.updateOne({_id:id},{ $set: reqBody },);
     return res.status(200).json({status:'success',message: ' Successful',data:data})
    
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }

 export const ReadTask=async(req,res)=>{
    try{
     const id=req.params.id;
         
     const data= await TaskModel.findOne({_id:id});
     return res.status(200).json({status:'success',message: ' Successful',data:data})
    
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }


 export const ReadAllTask=async(req,res)=>{
    try{
     const userId=new ObjectId(req.userId);
      
         
     const data= await TaskModel.find({userId:userId});
     return res.status(200).json({status:'success',message: ' Successful',data:data})
    
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }
 

 export const DeleteTask=async(req,res)=>{
    try{
     
     const id=req.params.id;
         
     const data= await TaskModel.deleteOne({_id:id});
     return res.status(200).json({status:'success',message: ' Successful',data:data})
    
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }