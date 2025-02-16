import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import  dotenv from 'dotenv';
import router from './routes/api.js';
import path from 'path'

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app=express();

app.use(cors({ origin: "https://task-management-app-client-lake.vercel.app",
               credentials: true, 
               methods: "GET,POST,PUT,DELETE",
                allowedHeaders: ['Content-Type', 'Authorization'],}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/send-otp', (req, res, next) => {
    req.setTimeout(120000); // Set timeout for this route to 2 minutes
    next();
  });

app.use('/api',router);

// Database Connect
mongoose.connect(process.env.DATABASE,{autoIndex:true}).then(()=>{
    console.log("MongoDB connected");
}).catch(()=>{
    console.log("MongoDB disconnected");
})
app.get('/',function (req,res) {
    res.json('welcome')
})

app.use(express.static('client/dist'));

// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'../client','dist','index.html'))
})

app.listen(process.env.PORT,function(){
    console.log("Server started on port "+process.env.PORT)
})


export default app;





