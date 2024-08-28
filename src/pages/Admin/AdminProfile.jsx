import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from 'react-hot-toast';
import Layout from './../../component/Layout/Layout';
import axios from "axios";
import AdminMenu from './../../component/Layout/AdminMenu';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const AdminProfile = () => {
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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address,setAddress]=useState("")
    const [country,setCountry]=useState("")
    const [phone,setPhone]=useState("")


    const baseUrl = import.meta.env.VITE_BASE_URL;
    //get user data
    useEffect(() => {
      const { email, name, address,country,phone} = auth?.user;
      setName(name);
      setEmail(email);
      setAddress(address);
      setCountry(country);
      setPhone(phone);
    }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(`${baseUrl}/api/v1/auth/profile`, {
          name,
          email,
          password,
          address,
          country,
          phone
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
    return (
        <Layout title={"Profile User"}>
            <div className='max-w-screen-xl mx-auto px-4  md:px-8'>
                <div className='flex'>
                    <div>
                        <AdminMenu />
                    </div>
                     
                    <div className="mt-10">
                       <h3 className='text-2xl font-bold'>Update to your Profile</h3>
                       <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label className="font-medium">
                                    Name
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
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

                            <div>
                                <label className="font-medium">
                                Phone
                                </label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="font-medium">
                                Country
                                </label>
                                <input
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            

                            <div>
                                <label className="font-medium">
                                    Address
                                </label>
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
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
        </Layout>
    );
};

export default AdminProfile;