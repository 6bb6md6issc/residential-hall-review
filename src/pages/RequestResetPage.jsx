import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import sideImage from "../assets/register_img.png"
import axios from 'axios'

const RequestResetPage = () => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    // check valid email
    setIsFormValid(email.includes('@'));
    setError("");
    setSuccessMessage("");
  }, [email])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // todo
    try {
      const response = await axios.post('/api/v1/auth/reset-password-request', { email });

      // Successfully requested password reset
      setEmail('');
      setSuccessMessage('Please check email to reset password');
    } catch (error) {
      console.log(error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === 'User Not Found'
      ) {
        setError('Please Register Account First');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  }

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className='flex justify-center md:w-1/2 '>
        <form onSubmit={handleSubmit} className="mt-20 md:mt-20">
          <h2 className='text-3xl mb-5 text-center font-bold'>Send Reset Link</h2>
          <label 
            htmlFor="email" 
            className='block my-2'
          >
            Email
          </label>
          <input 
            type = "text" 
            id = "email"
            placeholder = {"example@gmail.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='outline-none border-2 mb-2 border-black rounded-lg px-2 h-10 w-70'
          />

          {/* Link to 1. register 2. login */}
          <Link className="mt-2 mb-1 font-bold underline block" to={"/login"}>Login</Link>
          <Link className="mt-1 mb-2 font-bold underline block" to={"/register"}>Register Account</Link>
          
          
          {/* Display error message */}
          <div className='mb-2'>
            <h2 className='text-red-500 h-4'>{error}</h2>
          </div>
          <div className='mb-2'>
            <h2 className='text-green-600 h-4'>{successMessage}</h2>
          </div>

          <button
            type='submit'
            disabled={!isFormValid}
            className={`block ${isFormValid ? 'bg-[#0F2439] text-white shadow-md shadow-black/40 hover:bg-[#1d4165] cursor-pointer' : 'bg-gray-300 text-gray-400'} text-2xl font-bold px-6 py-2 rounded-2xl mt-8 mx-auto`}
          >
            Send Reset Link
          </button>
        </form>
      </div>

      <img 
        src={sideImage} 
        alt="image of Utah state University on the side" 
        className='md:w-1/2 md:inline-block hidden object-cover'
      />
    </div>
  )
}

export default RequestResetPage

