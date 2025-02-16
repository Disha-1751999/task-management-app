import { TokenEncode } from '../utilities/tokenUtility.js';
import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import EmailSend from '../utilities/emailUtility.js';

export const Register=async(req,res)=>{
   try{
    const {email,password,username}= req.body
    if(!email || !password || !username){
      return res.status(200).json({status:'success',message: 'Email, Password and Username is required'})
    }

    const isUserExist= await UserModel.findOne({email:email})
    
     if(isUserExist){
      
        return res.status(200).json({status:'fail',message: 'Email already registered'})
        
     }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user= await UserModel.create({email:email,password: hashedPassword, username: username})
    if(user){
        const token= TokenEncode(email, user._id)
        res.cookie('token',token,{
            maxAge:3*24*60*60*1000,
            secure:true,
            sameSite:'None',
            
        })
        return res.status(200).json({status:'success',message: 'Register Successful',data:user,token:token})
    }
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}


 export const Login=async(req,res)=>{
    try{
     const {email,password}= req.body
     if(!email || !password){
        return  res.status(200).json({status:'fail',message: 'Email and Password is required'})
     }     
 
     const user= await UserModel.findOne({email:email})

     if(!user){
        return  res.status(200).json({status:'fail',message: 'User not found'})
     }

     const passwordMatch = await bcrypt.compare(password, user.password);
     if (passwordMatch) {
         const token= TokenEncode(email, user._id)
         res.cookie('token',token,{
             maxAge:3*24*60*60*1000,
             secure:true,
             sameSite:'None'
         })
         return res.status(200).json({status:'success',message: 'login Successful',data:user,token:token})
     }
     else{
        return res.status(200).json({status:'fail',message: 'Wrong Password'})
     }
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }

 export const SendOtp=async(req,res)=>{
   try {
      let {email}=req.body;
      let user= await UserModel.findOne({email:email})
      if(user){
         let code=Math.floor(1000+Math.random()*9000);

      let EmailText=`Your Verification Code is= ${code}`
      let EmailSubject='Email Verification'
      await EmailSend(email,EmailText,EmailSubject);
      await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})
      return res.status(200).json({status:"success", message:"4 Digit OTP has been send"}) 
      }else{
         return  res.status(200).json({status:'fail',message: 'User not found'})
      }
      
  }catch(error){
   console.log(error)
   res.status(500).json({status:'fail',message: 'Internal server error'})
}

} 

export const VerifyOTP=async(req,res)=>{

   try {
      let {email,otp}=req.body;
       let user=await UserModel.find({email:email,otp:otp});
       if(user.length>0){
           return res.status(200).json({status:"success", message:"Valid OTP"}) 
        }
       else{
         res.status(200).json({status:'fail',message: 'Invalid OTP'})
         
       }

   }catch (error) {
      console.log(error)
      res.status(500).json({status:'fail',message: 'Internal server error'})
   }


}


export const ChangePassword=async(req,res)=>{
   try{
    const {password,email}= req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
        
    const data= await UserModel.updateOne({email},{ $set: {password:hashedPassword} },);
    return res.status(200).json({status:'success',message: ' Successful',data:data})
   
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}

export const UpdateProfile=async(req,res)=>{
   try{
    const {username,bio}= req.body;
   const data= await UserModel.updateOne({email:req.email},{ $set: {username:username, bio:bio} },);
    return res.status(200).json({status:'success',message: ' Successful',data:data})
   
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}


export const Logout=async(req,res)=>{
   try{
    
        res.clearCookie('token')
        return res.status(200).json({status:'success',message: 'Logged out successfully'})
   
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}

export const GetUserinfo=async(req,res)=>{
   try{ 
      let email=req.email;

      let data= await UserModel.findOne({email})
      return res.status(200).json({status:'success',data: data})
   
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}




 