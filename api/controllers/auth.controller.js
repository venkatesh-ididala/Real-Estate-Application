import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup=async(req,res,next)=>{

    const {username,password,email}=req.body;

    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,password:hashedPassword,email});

    try{
        await newUser.save();

        res.status(201).json({
            status:'success',
            message:'user created successfully'
        });
    }catch(err){
        next(errorHandler(550,'error from the function')); 
    }
    
};
export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return next(errorHandler(404, 'User not found'));
      }
  
      // Compare entered password with the hashed password
      const isPasswordValid = bcryptjs.compareSync(password, user.password);
      if (!isPasswordValid) {
        return next(errorHandler(401, 'Wrong credentials'));
      }
  
      // Ensure JWT secret is available and valid
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }
  
      // Sign the token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
  
      // Send response with token as a cookie
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest); // Exclude password from response
    } catch (err) {
      next(err);
    }
  };
  

