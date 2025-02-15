import mongoose from "mongoose";

const DataSchema= mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Username is required'],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Email is required'],
        lowercase:true,trim:true
    },
    password:{type:String,required:[true, 'Password is required'],trim:true},
    profilePicture:{
        type:String,trim:true
    }, 
    bio:{
        type:String,trim:true
    },
    otp: {
        type: String, // Use String to allow leading zeros
        trim: true,
        default: "0000", // Default value with leading zeros
    },

}, {timestamps: true, versionKey: false});

const UserModel=mongoose.model('users', DataSchema);

export default UserModel;