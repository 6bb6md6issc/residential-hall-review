import React, { useEffect, useState } from 'react'
import sideImage from "../assets/register_img.png"
import { useParams, useNavigate } from 'react-router-dom';
import FormSubmissionMessage from '../component/form/FormSubmissionMessage';
import FieldErrorMessage from '../component/form/FieldErrorMessage';
import axios from 'axios';

const ResetPage = () => {
  const { code } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [outcome, setOutcome] = useState({success: false, message: ""});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {

    const errors = {};
    const isEmailValid = email.includes("@");
    const isPasswordValid = password.length > 5;
    const isConfirmPasswordValid = confirmPassword === password;

    if (!isEmailValid) {
      errors.emailError = "Please enter a valid email";
    }

    if (!isPasswordValid) {
      errors.passwordError = "Must be at least 6 characters";
    }

    if (!isConfirmPasswordValid) {
      errors.confirmPasswordError = "Passwords must match";
    }

    setFieldError(errors);
    setIsFormValid(isEmailValid && isPasswordValid && isConfirmPasswordValid);
  }, [email, password, confirmPassword])

    const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("api/v1/auth/reset-password", {
        email, new_password: confirmPassword, token: code
      });

      // successfully reset password
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setOutcome({success: true, message: "Password reset. Please Login" })
    } catch(error){
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "User Not Found"
      ) {
        setOutcome({ success: false, message: "Please Register Account First" });
      } else {
        console.error("Network or server error:", error);
        setOutcome({ success: false, message: "Some error occurred" });
      }
    }
  }

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className='flex justify-center md:w-1/2 '>
        <form
          onSubmit={handleSubmit} 
          className="mt-20 md:mt-20"
        >
          <h2 className='text-3xl mb-5 text-center font-bold'>Rest Password</h2>

          {/* email */}
          <label 
            htmlFor="email" 
            className='block my-2'
          >
            Email
          </label>
          <input 
            type = "text" 
            id = "email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='outline-none border-2 mb-2 border-black rounded-lg px-2 h-10 w-70'
          />
          <FieldErrorMessage fieldError={fieldError} field="emailError"/>

          {/* password */}
          <label 
            htmlFor="password" 
            className='block my-2'
          >
            New Password
          </label>
          <input 
            type = "password" 
            id = "password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='outline-none border-2 mb-2 border-black rounded-lg px-2 h-10 w-70'
          />
          <FieldErrorMessage fieldError={fieldError} field="passwordError"/>

          {/* confirm password */}
          <label 
            htmlFor="confirmPassword" 
            className='block my-2'
          >
            Confirm Password
          </label>
          <input 
            type = "password" 
            id = "confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='outline-none border-2 mb-2 border-black rounded-lg px-2 h-10 w-70'
          />
          <FieldErrorMessage fieldError={fieldError} field="confirmPasswordError"/>
          <FormSubmissionMessage outcome={outcome}/>

          <button
            type='submit'
            disabled={!isFormValid}
            className={`block ${isFormValid ? 'bg-[#0F2439] text-white hover:bg-[#1d4165] shadow-md shadow-black/40 cursor-pointer' : 'bg-gray-300 text-gray-400'} text-2xl font-bold px-6 py-2 rounded-2xl mt-8 mx-auto`}
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

export default ResetPage