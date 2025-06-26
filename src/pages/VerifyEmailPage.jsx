import React, {useState, useEffect} from 'react'
import sideImage from "../assets/register_img.png"
import FieldErrorMessage from '../component/form/FieldErrorMessage';
import FormSubmissionMessage from '../component/form/FormSubmissionMessage';
import axios from 'axios';

const VerifyEmailPage = () => {

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [outcome, setOutcome] = useState({success: false, message: ""});

  useEffect(() => {
  
    const error = {};

    // check valid email
    if (!email.includes('@')) {
      error.email = 'Invalid email address';
    }
    // check valid code
    if (code.length !== 5) {
      error.code = 'Code must be 5 digit';
    }

    setFieldErrors(error)
    setIsFormValid(Object.keys(error).length === 0);

  }, [email, code])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, verification_code: code };
    // todo
    try {
      const response = await axios.post("api/v1/auth/verify", payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Successfully verified
      setOutcome({
        success: true,
        message: "Please Login"
      });

    } catch (error) {
      if (error.response) {
        const message = error.response.data;
        console.log("Error response data:", error.response.data);
        if (error.response.data?.message === "User Not Found") {
          setOutcome({
            success: false,
            message: "Please Register First"
          });
        } else if (message === "Verification Code Expired") {
          setOutcome({
            success: false,
            message: "Verification Code Expired"
          });
        } else if (message === "Invalid Credentials") {
          setOutcome({
            success: false,
            message: "Invalid Verification Code"
          });
        } else {
          setOutcome({ success: false, message: "An unexpected error occurred." });
          console.log("Unhandled error:", message);
        }
      } else {
        console.log("Network or server error:", error);
      }
    }
    
  }

  // resend the verification code
  const handleResend = async () => {
    try {
      const response = await axios.post("api/v1/auth/resend-verification", { email });

      // If request is successful
      setOutcome({
        success: true,
        message: response.data || "Please check email to see the verification code",
      });
    } catch (error) {
      if (error.response && error.response.data === "User Not Found") {
        setOutcome({ success: false, message: "Please register with this email first" });
      } else {
        console.log(error);
        setOutcome({ success: false, message: "An error occurred. Please try again later." });
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className='flex justify-center md:w-1/2 '>
        <form onSubmit={handleSubmit} className="mt-20 md:mt-20">
          <h2 className='text-3xl mb-5 text-center font-bold'>Verify Account</h2>
          
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
          <FieldErrorMessage fieldError={fieldErrors} field="email"/>

          <label 
            htmlFor="code" 
            className='block my-2'
          >
            Verification Code
          </label>
          <input 
            type = "text" 
            id = "code"
            placeholder = {"12345"}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='outline-none border-2 mb-2 border-black rounded-lg px-2 h-10 w-70'
          />
          <button 
            className='block font-bold underline cursor-pointer'
            onClick={handleResend}
          >
            resend
          </button>

          <FieldErrorMessage fieldError={fieldErrors} field="code"/>
          
          {/* Display error message */}
          <FormSubmissionMessage outcome={outcome}/>

          <button
            type='submit'
            disabled={!isFormValid}
            className={`block ${isFormValid ? 'bg-[#0F2439] hover:bg-[#1d4165] shadow-md shadow-black/40 text-white cursor-pointer' : 'bg-gray-300 text-gray-400'} text-2xl font-bold px-6 py-2 rounded-2xl mt-8 mx-auto`}
          >
            verify
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

export default VerifyEmailPage