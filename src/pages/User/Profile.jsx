import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from 'react-hot-toast';
import Layout from './../../component/Layout/Layout';
import UserMenu from "../../component/Layout/UserMenu";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Profile = () => {
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

    //context
    const [auth, setAuth] = useAuth();

    //state
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id,setId]=useState("");

    const baseUrl = import.meta.env.VITE_BASE_URL;
    //get user data
    useEffect(() => {
      const { email, firstname,lastname,username,_id} = auth?.user;
      setFirstName(firstname);
      setLastName(lastname);
      setUserName(username);
      setEmail(email);
      setId(_id);
    }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${baseUrl}/api/v1/auth/profile`, {
              firstname,
              lastname,
              username,
              email,
              password,
            });
    
            if (data?.error) {
              toast.error(data?.error);
            } else {
              setAuth({ ...auth, user: data?.updatedUser });
              let ls = localStorage.getItem("auth");
              ls = JSON.parse(ls);
              ls.user = data.updatedUser;
              localStorage.setItem("auth", JSON.stringify(ls));
              toast.success("Profile Updated Successfully");
            }
        } catch (error) {
          toast.error("Something went wrong");
        }
    };

    const [visible,setVisible]=useState(false);
    const [visibletwo,setvisibletwo]=useState(false);

    const [usernamechange,setUserNameChange]=useState("")
    const [emailchange,setEmailChange]=useState("")



    const usernamechangefunctionOk =async (e) =>{
        e.preventDefault();
        try {
            const { data } = await axios.put(
              `${baseUrl}/api/v1/auth/updateusername/${id}`,
              { username: usernamechange }
            );
            if (data?.success) {
              
              setUserNameChange("")

              setAuth({ ...auth, username: data?.usernamechange });
              let ls = localStorage.getItem("auth");
              ls = JSON.parse(ls);
              ls.user = data.usernamechange;
              localStorage.setItem("auth", JSON.stringify(ls));
              toast.success(`${usernamechange} is updated`);

              setVisible(false);
            } else {
              toast.error(data.message);
            }
        } catch (error) {
          toast.error("Something went wrong in updating category");
        }
    }

    const emailchangefunctionOk =async (e) =>{
        e.preventDefault();
        try {
            const { data } = await axios.put(
              `${baseUrl}/api/v1/auth/updateemail/${id}`,
              { email: emailchange }
            );
            if (data?.success) {
              
              setEmailChange("")

              setAuth({ ...auth, email: data?.emailchange });
              let ls = localStorage.getItem("auth");
              ls = JSON.parse(ls);
              ls.user = data.emailchange;
              localStorage.setItem("auth", JSON.stringify(ls));
              toast.success(`${emailchange} is updated`);

              setvisibletwo(false);

            } else {
              toast.error(data.message);
            }
        } catch (error) {
          toast.error("Something went wrong in updating category");
        }
    }

    return (
        <Layout title={"Profile User"}>
            <div className='max-w-screen-xl mx-auto px-4 md:px-8 mt-4'>
                <div className='flex'>
                    <div>
                        <UserMenu />
                    </div>
                     
                    <div className=" w-full">
                       <h3 className='text-2xl font-bold text-center'>Update Profile</h3>
                       <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label className="font-medium">
                                firstname
                                </label>
                                <input
                                    value={firstname}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="font-medium">
                                lastname
                                </label>
                                <input
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="font-medium">
                                username
                                </label>
                                <input
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text"
                                    required
                                    disabled
                                    className="w-full mt-2 px-3 py-2  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                                <button onClick={()=>setVisible(true)} type="button" className="p-2 bg-green-400 rounded-lg text-white mt-2">Edit username</button>
                            </div>

                            <div>
                                <label className="font-medium">
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    required
                                    disabled
                                    className="w-full mt-2 px-3 py-2  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                                 <button onClick={()=>setvisibletwo(true)} type="button" className="p-2 bg-green-400 rounded-lg text-white mt-2">Edit email</button>
                            </div>
                            
                            <div className="relative">
                                <label className="font-medium">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={passwordType}
                                    required
                                    className="w-full mt-2 px-3 py-2  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                                <button type="button" onClick={handelShowHide} className="absolute top-11 right-2">
                                  {
                                      passwordType=="password" ? <FaEyeSlash/>  : <FaEye/>
                                  }
                                </button>  
                            </div>




                            <button
                                onClick={handleSubmit}
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            >
                                Update Profile
                            </button>
                        </form>  
                    </div>
                </div>
               
            </div>


            {
              visible && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                    <div className="absolute bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 ">
                        <h6 className="text-lg text-white">Update username</h6>
                        <input  onChange={(e) => setUserNameChange(e.target.value)} type="text" className="text-black rounded-lg"/>   
                        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                          <button onClick={usernamechangefunctionOk} type="button" className="p-2 bg-green-400 rounded-lg text-white mt-2">Ok</button>
                          <button onClick={()=>setVisible(false)} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Close</button>
                        </div>
                    </div>
                </div>
              )
            }
            
            {
              visibletwo && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                    <div className="absolute bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 ">
                        <h6 className="text-lg text-white">Update Email</h6>
                        <input  onChange={(e) => setEmailChange(e.target.value)} type="text" className="text-black rounded-lg"/>   
                        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                          <button onClick={emailchangefunctionOk} type="button" className="p-2 bg-green-400 rounded-lg text-white mt-2">Ok</button>
                          <button onClick={()=>setvisibletwo(false)} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Close</button>
                        </div>
                    </div>
                </div>
              )
            }

        </Layout>
    );
};

export default Profile;