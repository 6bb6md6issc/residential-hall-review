import React, {useState, useEffect } from 'react'
import sideImage from "../assets/register_img.png"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import FormSubmissionMessage from '../component/form/FormSubmissionMessage'
import FieldErrorMessage from '../component/form/FieldErrorMessage'
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [outcome, setOutcome] = useState({success: false, message: ""});

  useEffect(() => {
  
    const error = {};
    // check valid email
    if (!email.includes('@')) {
      error.emailError = 'Invalid email address';
    }
    
    if (password.length <= 5) {
      error.passwordError = 'must be at least 6 characters';
    }

    if (password !== confirmPassword){
      error.confirmPasswordError = "Password must match";
    }

    setFieldErrors(error)

    const isEmailValid = email.includes('@');
    const isPasswordValid = password.length > 5;
    const isConfirmPasswordValid = confirmPassword === password;

    setIsFormValid(
      isEmailValid && isPasswordValid && isConfirmPasswordValid
    );

  }, [email, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    // todo
    try {
      const response = await axios.post("/api/v1/auth/signup", payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If request is successful
      navigate("/verify-account");
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        console.log(data);
        if (data === "User Already Exists") {
          setOutcome({
            success: false,
            message: "This email is already registered",
          });
        }
      } else {
        console.log("Network or server error:", error);
        setOutcome({
            success: false,
            message: "An error occurred",
          });
      }
    }

  }

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className='flex justify-center md:w-1/2 '>
        <form onSubmit={handleSubmit} className="mt-20 md:mt-20">
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
            className='outline-none border-2 mb-1 border-black rounded-lg px-2 h-10 w-70'
          />
          <FieldErrorMessage fieldError={fieldErrors} field="emailError" />


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
            className='outline-none border-2 border-black rounded-lg px-2 h-10 w-70'
          />
          <FieldErrorMessage fieldError={fieldErrors} field="passwordError" />

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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='outline-none border-2 border-black rounded-lg px-2 h-10 w-70'
          />
          <Link className="my-2 font-bold underline block" to={"/login"}>Login</Link>
          <FieldErrorMessage fieldError={fieldErrors} field="confirmPasswordError" />
          <FormSubmissionMessage outcome={outcome} />
          

          <button
            type='submit'
            disabled={!isFormValid}
            className={`block ${isFormValid ? 'bg-[#0F2439] text-white  hover:bg-[#1d4165] shadow-md shadow-black/40 cursor-pointer' : 'bg-gray-300 text-gray-400'} text-2xl font-bold px-6 py-2 rounded-2xl mt-8 mx-auto`}
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