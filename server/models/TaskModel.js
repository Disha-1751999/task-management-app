import mongoose from "mongoose";

const DataSchema= mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    desc:{
        type:String,
        required:true,
        trim:true
    },
    due_date:{
        type:Date,
        required:true,
        trim:true
    },
    status:{
        type:String,
        default:'Pending',
        enum:['Pending','Completed'],
        trim:true
    },
   

}, {timestamps: true, versionKey: false});

const TaskModel=mongoose.model('tasks', DataSchema);

export default TaskModel;