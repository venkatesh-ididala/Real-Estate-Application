import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'


dotenv.config();
const app=express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})


app.listen(3000,()=>{
    console.log('server is running on port 3000');
});



app.use("/api/user",userRouter);


// app.get('/test',(req,res)=>{
//     res.end("hello ");
// })