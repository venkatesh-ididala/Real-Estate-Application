import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';




 function SignUp() {
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

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
    setLoading(true);
    try {
      // Logging formData inside the function
      console.log('Form Data Submitted:', formData);
  
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Make sure the content type is correct
        },
        body: JSON.stringify(formData), // Send formData as a string
      });
  
      // Check if the response is OK (status code in range 200–299)
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
        
      }
      setLoading(false);
      navigate('/sign-in');
  
      // const data = await res.json(); // Parse the JSON from the response
      // console.log('Response Data:', data);
    } catch (error) {
      console.error('Error during form submission:', error);
       // Log any errors
       setLoading(false);
    }
  };
  


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder='username' className='border p-3 rounded-lg ' id='username' onChange ={handleChange}/>
        <input type="text" placeholder='email' className='border p-3 rounded-lg ' id='email' onChange ={handleChange} />
        <input type="text" placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-e-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'Loading..':'Sign Up'}</button>
      </form>
 <div className='flex gap-2 mt-5'>
  <p>Have an account?</p>
  <Link to={"/sign-in"}>
  <span className='text-blue-700'>Sign in</span>
  </Link>
 </div>
    </div>
  )
}

export default SignUp;