import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';
import listingRouter from  './routes/listing.route.js';

dotenv.config();




mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
});

//dynamic directory name 
const __dirname=path.resolve();


const app=express();

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});

app.use(cookieParser()); 

//allows json data input 
app.use(express.json());



app.use("/api/user",userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);


app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
   
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal server error';

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});

// app.get('/test',(req,res)=>{
//     res.end("hello ");
// })