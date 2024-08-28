import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RiseLoader from "react-spinners/RiseLoader";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import axios from 'axios';
import Layout from "../../component/Layout/Layout";
import { useAuth } from "../../context/auth";

const Login = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
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

  const [login, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");

  const handelEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const [password, setPassword] = useState("");
  const [passworderror, setPasswordError] = useState("");

  const handelPassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  }
 

  const navigate = useNavigate(false);

  const [loading, setLoading] = useState(false);

  const [auth,setAuth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(login==""){
      setEmailError("Email is required");
    }else if(password==""){
      setPasswordError("Password is required");
    }else {
      setLoading(true);
      try {
        const res= await axios.post(
          `${baseUrl}/api/v1/auth/login`,
          {login,password}
        )
        if(res.data.success){
          toast.success(res.data.message);
          setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token
          })
          
          localStorage.setItem("auth", JSON.stringify(res.data));
          setTimeout(() => {
             navigate(location.state || "/log-home"); 
          }, 2000);

          setLoading(false);

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

  return (
    <Layout title={"Login - 500 TK"}>
      {
        loading ? <div className="flex justify-center items-center h-screen"><RiseLoader color="#36d7b7" /></div> : ""
      }
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <p className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">Blog - $5</p>
                </div>
                <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
              </div>
              <div className="mt-8">

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email or Username</label>
                    <input type="text"  onChange={handelEmail} placeholder="enter your email" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    
                    <p className="text-red-500">{emailerror}</p>
                  </div>

                  <div className="mt-6 relative">

                    <div className="flex justify-between mb-2">
                      <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                      <Link to={"/forgot"} className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</Link>
                    </div>

                    <input type={passwordType} onChange={handelPassword} placeholder="enter your password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    <button type="button" onClick={handelShowHide} className="absolute top-11 right-2">
                      {
                          passwordType=="password" ? <FaEyeSlash/>  : <FaEye/>
                      }
                    </button>  

                    <p className="text-red-500">{passworderror}</p>

                  </div>

                  <div className="mt-6">
                    <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>

                </form>

                <p className="mt-6 text-sm text-center text-gray-400">Don't have an account yet? <Link to={"/registration"} className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </Layout>
  );
};

export default Login;