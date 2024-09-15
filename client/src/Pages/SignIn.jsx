import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';

import { useDispatch, useSelector} from 'react-redux';

import { signInStart,signInSuccess,signinFailure } from '../redux/user/userSlice';




 function SignIn() {
  const [formData,setFormData]=useState({});
  
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading,error} =useSelector((state)=>state.user)
  const handleChange=(e)=>{
    setFormData(
      {
        ...formData,
        [e.target.id]:e.target.value,
      }
    )
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    dispatch(signInStart())
    try {
      // Logging formData inside the function
      console.log('Form Data Submitted:', formData);
  
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Make sure the content type is correct
        },
        body: JSON.stringify(formData), // Send formData as a string
      });

      const data=await res.json();
  
      // Check if the response is OK (status code in range 200–299)
      if (data.success ===false) {
        
        dispatch(signinFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
  
      // const data = await res.json(); // Parse the JSON from the response
      // console.log('Response Data:', data);
    } catch (error) {
     dispatch(signinFailure(error.message))
    }
  };
  


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       
        <input type="text" placeholder='email' className='border p-3 rounded-lg ' id='email' onChange ={handleChange} />
        <input type="text" placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-e-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'Loading..':'Sign In'}</button>
      </form>
 <div className='flex gap-2 mt-5'>
  <p>Don't have an account?</p>
  <Link to={"/sign-up"}>
  <span className='text-blue-700'>Sign Up</span>
  </Link>
 </div>
    </div>
  )
}

export default SignIn;