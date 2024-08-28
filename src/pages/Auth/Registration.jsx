import { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Layout from './../../component/Layout/Layout';

const Registration = () => {
  const navigate = useNavigate(false);
  const [loading, setLoading] = useState(false);
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

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // error start
  const [firstnameerror, setFirstNameError] = useState("");
  const [lastnameerror, setLastNameError] = useState("");
  const [usernameerror, setUserNameError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const [confirmerror, setConfirmError] = useState("");
  // error end
  const [randomUsernames, setRandomUsernames] = useState([]);
  console.log(randomUsernames);


  const handelFirstName = (e) => {
    setFirstName(e.target.value);
  }
  const handelLastName = (e) => {
    setLastName(e.target.value);
  }
  const handelUserName = (e) => {
    setUserName(e.target.value);
  }
  const handelEmail = (e) => {
    setEmail(e.target.value);
  }
  const handelPassword = (e) => {
    setPassword(e.target.value);
  }
  const handelConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  // random username create start

  const generateRandomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const generateRandomUsername = () => {
      const randomSuffix = generateRandomString(4); // Generates a random 4-letter string
      const usernameBase = `${firstname.toLowerCase()}${lastname.toLowerCase()}`;
      return `${usernameBase} , ${randomSuffix}`.replace(/\s/g, ''); // Removes any spaces
  };

  const generateRandomUsernames = () => {
      let usernames = [];
      for (let i = 0; i < 3; i++) {
          usernames.push(generateRandomUsername());
      }
      setRandomUsernames(usernames);
  };

  useEffect(() => {
    if (firstname && lastname) {
        generateRandomUsernames();
    }
  }, [firstname, lastname]);

  // random username create end

  const handelsubmit =async  (e) => {
    e.preventDefault();
    try {
      const res= await axios.post(
          `${baseUrl}/api/v1/auth/register`,
          {firstname,lastname,username,email,password}
      )
      if(res.data.success){
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/login"); 
          }, 2000);
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
        toast.error("Registration Failed");
    }
  }
  
  // check username
  const usernamecheck =async () => {
    try {
      const res= await axios.post(`${baseUrl}/api/v1/auth/checkUsername`,{username})
      setUserNameError(res.data.message);
    } catch (error) {
        toast.error("Registration Failed");
    }
  }

  useEffect(() => {
    if (username) {
      usernamecheck();
    }
  }, [username]);

  return (
    <Layout title={"Registration"}>
      {
        loading ? <div className="flex justify-center items-center h-screen"><RiseLoader color="#36d7b7" /></div> : ""
      }
      <section className="bg-white dark:bg-gray-900">
        <div className="flex justify-center min-h-screen">
          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
            <div className="flex justify-center mx-auto">
                <p className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">Blog - $5</p>
              </div>
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Get your free account now.
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Let’s get you all set up so you can verify your personal account and begin setting up your profile.
              </p>
              {
                randomUsernames.length==3 ? (<>
                <span className="text-green-500">You can use username: {randomUsernames}</span>
                </>):(<></>)
              }
              
              <form onSubmit={handelsubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">first Name</label>
                  <input type="text" onChange={handelFirstName} placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  <p className="text-red-500">{firstnameerror}</p>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">last Name</label>
                  <input type="text" onChange={handelLastName} placeholder="some" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  <p className="text-red-500">{lastnameerror}</p>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">username Name</label>
                  <input type="text" onChange={handelUserName} placeholder="user_name" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  <p className="text-green-500">{usernameerror}</p>
                </div>

                {/* <p className="text-green-500"></p> */}


                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                  <input onChange={handelEmail} type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  <p className="text-red-500">{emailerror}</p>
                </div>


                <div className="relative">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                  <input type={passwordType} onChange={handelPassword} placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  <button type="button" onClick={handelShowHide} className="absolute top-11 right-2">
                    {
                        passwordType=="password" ? <FaEyeSlash/>  : <FaEye/>
                    }
                  </button>  
                  <p className="text-red-500">{passworderror}</p>
                </div>


                <div className="relative">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm password</label>
                  <input type={passwordType} onChange={handelConfirmPassword} placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  <button type="button" onClick={handelShowHide} className="absolute top-11 right-2">
                    {
                        passwordType=="password" ? <FaEyeSlash/>  : <FaEye/>
                    }
                  </button>  
                  <p className="text-red-500">{confirmerror}</p>
                </div>


                <button type="submit" className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  <span>Sign Up </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>


              </form>
            </div>
          </div>
        </div>
      </section>
      
    </Layout>
  );
};

export default Registration;