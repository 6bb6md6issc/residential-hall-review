import React, {useState, useEffect } from 'react'
import sideImage from "../../assets/register_img.png"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import FormSubmissionMessage from '../../component/form/FormSubmissionMessage'
import { useAuth } from '../../provider/authProvider'
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate();

  const { setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [outcome, setOutcome] = useState({success: false, message: ""});
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {

    const isEmailValid = email.includes('@');
    const isPasswordValid = password.length > 5;

    setIsFormValid(
      isEmailValid && isPasswordValid
    );

  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };

    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/v1/auth/login', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = response.data;
      setToken(data.token);
      navigate("/");

    } catch (error) {
      if (error.response) {
        const data = error.response.data;

        if (data.message === "User Not Found") {
          setOutcome({ success: false, message: "Please Register Account First" });
        } else {
          setOutcome({ success: false, message: "Invalid Email or Password" });
        }
      } else {
        console.error("Network or server error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className='flex justify-center md:w-1/2 '>
        <form onSubmit={handleSubmit} className="mt-20 md:mt-20">
          <h2 className='text-3xl mb-5 text-center font-bold'>Login</h2>
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
            className='outline-none border-2 mb-8 border-black rounded-lg px-2 h-10 w-70'
          />

          {/* password */}
          <label 
            htmlFor="password" 
            className='block my-2'
          >
            Password
          </label>
          <input 
            type = "password" 
            id = "password"
            placeholder = {""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='outline-none border-2 border-black rounded-lg px-2 h-10 w-70'
          />

          {/* Link to 1. register 2. forget password */}
          <Link className="mt-2 mb-1 font-bold underline block" to={"/request-reset"}>Forget Password</Link>
          <Link className="mt-1 mb-2 font-bold underline block" to={"/register"}>Register Account</Link>
          {/* Display error message */}
          <FormSubmissionMessage outcome={outcome}/>
          

          <button
            type='submit'
            disabled={!isFormValid || isSubmitting}
            className={`block ${isFormValid ? 'bg-[#0F2439] text-white hover:bg-[#3e4f5f] cursor-pointer' : 'bg-gray-300 text-gray-400'} text-2xl font-bold px-6 py-2 rounded-2xl mt-8 mx-auto`}
          >
            Login
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

export default LoginPage