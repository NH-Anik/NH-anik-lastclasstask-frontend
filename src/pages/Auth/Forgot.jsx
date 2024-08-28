import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import RiseLoader from "react-spinners/RiseLoader";

import { toast } from 'react-hot-toast';
import { useState } from "react";
import axios from 'axios';
import Layout from "../../component/Layout/Layout";

const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(false);

  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPassworderror, setNewPasswordError] = useState("");

  const [newConfirmPassword, setConfirmNewPassword] = useState("");
  const [newConfirmPassworderror, setConfirmNewPasswordError] = useState("");

  const[otp, setotp] = useState("");
  const[securityQuestionerror, setSecurityQuestionError] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handlemail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }
  const handlNewPassword = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  }

  const handlConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
    setConfirmNewPasswordError("");
  }

  const handlSecurityOTP = (e) => {
    setotp(e.target.value);
    setSecurityQuestionError("");
  }

  const [mailMassage, setmailMassage] = useState("");

  // Submit Form  
  const handelforgot = async (e) => {
    e.preventDefault();
    if(email==""){
      setEmailError("Email is required");
    }else{
      setmailMassage("check your email");
      try {
        const res= await axios.post(
            `${baseUrl}/api/v1/auth/forgot-password`,
            {email}
        )
        if(res.data.success){
          toast.success(res.data.message);
          setOtpView(true);
          setLoading(false);
          setotp("");
        }else{
            toast.error(res.data.message);
            setLoading(false);
        } 
      } catch (error) {
          toast.error("Registration Failed");
          setLoading(false);
      }
    }
  }

  const handelSetPassword = async (e) => {
    e.preventDefault();
    try {
      if(newPassword==""){
        setNewPasswordError("New Password is required");
      }else if(newConfirmPassword==""){
        setConfirmNewPasswordError("Confirm Password is required");
      }else if(newPassword!=newConfirmPassword){
        setConfirmNewPasswordError("Password didn't match");
      }else if(newPassword.length<8){
        setConfirmNewPasswordError("Password must be at least 8 characters");
      }else{
        const response = await axios.post(`${baseUrl}/api/v1/auth/forgot-passwordOtp`, {
          email,
          otp,
          newPassword
        });
        if(response.data.success){
          toast.success(response.data.message);
          setTimeout(() => {
             navigate("/login"); 
          }, 2000);
          setLoading(false);
          setotp("");
          setNewPassword("");
          setConfirmNewPassword("");
          setEmail("");
        }else{
          toast.error(response.data.message);
          setLoading(false);
        } 
      }
    } catch (error) {
      toast.error("Change Password Failed");
      setLoading(false);
    }
  }
 
  const [viewpass, setViewPass] = useState(false);
  const [otpView, setOtpView] = useState(false);

  const handelCheckOtp = async(e) => {
    e.preventDefault();
    if(!otp){
      setSecurityQuestionError("OTP is required");
      return;
    }
    setOtpView(false);
    setViewPass(true);
  }

   // password show hide work start
   const [passwordType, setPasswordType] = useState("password");
   const handelShowHide = () => {
       if(passwordType==="password")
     {
      setPasswordType("text")
      return;
     }
     setPasswordType("password")
   }
   // password show hide work end
 
    return (
        <Layout title={"Forgot Password"}>
            <section className="bg-white dark:bg-gray-900">
              <div className="container px-6 py-24 mx-auto lg:py-32">
                <div className="lg:flex">
                  <div className="lg:w-1/2">
                  <h2 className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-2xl font-bold sm:text-3xl">Welcome to Blog - $5</h2>
                    <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
                      forgot to your account
                    </h1>
                  </div>
                  <div className="mt-8 lg:w-1/2 lg:mt-0">
                    <div className="w-full lg:max-w-xl">
                      <div className="relative flex items-center">
                        <span className="absolute">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <input onChange={handlemail} type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                        <p className="text-red-500">{emailerror}</p>
                      </div>
                      <div className="mt-8 md:flex md:items-center">
                        <button onClick={handelforgot} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {
              viewpass && (
                  <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                      <div className="flex flex-col bg-black max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">

                        <div className="rounded-md shadow-lg px-4 py-6">
                          <h6 className="text-lg text-center text-white">Chang Password</h6>
                          <div className="relative">
                            <label htmlFor="password" className="block text-white mb-2 text-sm font-medium  dark:text-white">New password</label>
                            <input onChange={handlNewPassword} type={passwordType}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your new password" />
                            <button type="button" onClick={handelShowHide} className="absolute top-11 right-2">
                              {
                                  passwordType=="password" ? <FaEyeSlash/>  : <FaEye/>
                              }
                            </button> 
                            <p className="text-red-700 mt-1">{newPassworderror}</p>
                          </div>
                          <div className="relative">
                            <label htmlFor="password" className="block text-white mb-2 text-sm font-medium  dark:text-white">Confirm password</label>
                            <input onChange={handlConfirmNewPassword} type={passwordType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your new password" />
                            <button type="button" onClick={handelShowHide} className="absolute top-11 right-2">
                              {
                                  passwordType=="password" ? <FaEyeSlash/>  : <FaEye/>
                              }
                            </button> 
                            <p className="text-red-700 mt-1">{newConfirmPassworderror}</p>
                          </div> 
                        </div>

                        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                          <button onClick={handelSetPassword} className="px-6 py-2 text-blue-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Set-Password</button>
                          <button onClick={()=>{setViewPass(false), setOtpView(true)}} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Cancel</button>
                        </div>
                      </div>
                  </div>
              )
            }
            
            {
              otpView && (
                  <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                      <div className="flex flex-col bg-black max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                          <div className="rounded-md shadow-lg px-4 py-6">
                            <h6 className="text-lg text-center text-white">Check OTP</h6>
                            <p className="text-green-500 text-center">{mailMassage}</p>
                            <div className="text-center">
                              <label htmlFor="securityQuestion" className="block text-white mb-2 text-sm font-medium text-center  dark:text-white">4 Digit OTP</label>
                              <input onChange={handlSecurityOTP} value={otp} type="number" max="4" min={1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your OTP" />
                              <p className="text-red-700 mt-1">{securityQuestionerror}</p>
                              <button onClick={handelCheckOtp} className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">
                                  {
                                    loading ? <RiseLoader color="#36d7b7" />: "Check OTP"
                                  } 
                              </button>

                              <button onClick={handelforgot} className="text-blue-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Resend OTP</button>
                              <button onClick={()=>{setOtpView(false),setotp("")}} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Cancel</button>
                            </div>
                          </div>
                      </div>
                  </div>
              )
            }
      </Layout>
    );
};

export default Forgot;