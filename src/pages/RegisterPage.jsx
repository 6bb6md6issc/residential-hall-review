import React, {useState, useEffect } from 'react'
import sideImage from "../assets/register_img.png"
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
  
    const error = {};
    // check valid email
    if (!email.includes('@')) {
      error.email = 'Invalid email address';
    }
    
    if (password.length <= 5) {
      error.password = 'must be at least 6 characters';
    }

    if (password !== confirmPassowrd){
      error.confirmPassowrd = "Password must match";
    }

    setFieldErrors(error)

    const isEmailValid = email.includes('@');
    const isPasswordValid = password.length > 5;
    const isConfirmPasswordValid = confirmPassowrd === password;

    setIsFormValid(
      isEmailValid && isPasswordValid && isConfirmPasswordValid
    );

  }, [email, password, confirmPassowrd])

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email, password };
    // todo
  }

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className='flex justify-center md:w-1/2 '>
        <form className="mt-20 md:mt-30">
          <h2 className='text-3xl mb-5 text-center font-bold'>Register</h2>
          <label 
            htmlFor="email" 
            className='block my-2'
          >
            Email
          </label>
          <input 
            type = "text" 
            name = "email"
            placeholder = {"example@gmail.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='outline-none border-2 mb-1 border-black rounded-sm px-2 h-10 w-70'
          />
          {!fieldErrors.email ? (<div className='mb-10'></div>) : (
            <h2 className='text-red-500 mb-4'>{fieldErrors.email}</h2>
          )}


          {/* password */}
          <label 
            htmlFor="password" 
            className='block my-2'
          >
            Password
          </label>
          <input 
            type = "password" 
            name = "passord"
            placeholder = {""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='outline-none border-2 border-black rounded-sm px-2 h-10 w-70'
          />
          {!fieldErrors.password ? (<div className='mb-10'></div>) : (
            <h2 className='text-red-500 mb-4'>{fieldErrors.password}</h2>
          )}

          {/* confirm password */}
          <label 
            htmlFor="confirm" 
            className='block my-2'
          >
            Confirm Password
          </label>
          <input 
            type = "password" 
            name = "confirm"
            placeholder = {""}
            value={confirmPassowrd}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='outline-none border-2 border-black rounded-sm px-2 h-10 w-70'
          />
          <Link className="my-2 font-bold underline block" to={"/login"}>Login</Link>
          {!fieldErrors.confirmPassowrd ? (<div className='mb-10'></div>) : (
            <h2 className='text-red-500 h-4'>{fieldErrors.confirmPassowrd}</h2>
          )}

          

          <button
            type='submit'
            disabled={!isFormValid}
            onClick={handleSubmit}
            className={`block ${isFormValid ? 'bg-[#0F2439] text-white' : 'bg-gray-300 text-gray-400'} text-2xl font-bold px-6 py-2 rounded-2xl mt-8 mx-auto`}
          >
            Register
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

export default RegisterPage