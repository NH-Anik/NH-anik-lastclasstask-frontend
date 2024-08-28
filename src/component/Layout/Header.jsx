import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from 'react-hot-toast';
import { useEffect, useRef, useState } from "react";
import SearchInput from './../From/SearchInput';


const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate=useNavigate()

  const handelLogout = () => {
    setAuth({
        ...auth,
        user:null,
        token:""
    })
    localStorage.removeItem("auth")
    setTimeout(() => {
        navigate("/"); 
     }, 1000)
    toast.success("Logout Successfully")
    setVisibleLogout(false);
  }

  const [isImageVisible, setIsImageVisible] = useState(false);
  const dropdownRef = useRef(null);
  
  const handleDropdownClick = () => {
    setIsImageVisible(!isImageVisible);
  };



  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsImageVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [visibleLogout,setVisibleLogout]=useState(false);
  // all device show menu 
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuNev = () => {
      setIsOpen(!isOpen);
  };

  


    return (
        <div>
           
          <div className="downShadow">

            <nav className="relative bg-white shadow dark:bg-gray-800">
                <div className="container px-6 py-4 mx-auto">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between">
                            <Link to={"/"}>
                                <p className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">Blog - $5</p>
                            </Link>
                            <div className="flex lg:hidden">
                                <button onClick={toggleMenuNev} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                    {!isOpen ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? 'block' : 'hidden'}`}>

                            <SearchInput />

                            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                                {
                                 !auth?.user ?(
                                  <div>
                                    <Link to={"/login"} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mr-2">Sign in</Link>
                                    <Link to={"/registration"} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Sign up</Link>
                                  </div>
                                  ):
                                  <div>
                                    <Link to={"/log-home"} className="px-6 py-2 font-medium hover:text-white tracking-wide capitalize transition-colors duration-300 transform border-2 border-sky-500 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80 mr-2">Home</Link>
                                  </div>
                                }
                                {
                                  !auth?.user?.role==0 ? (
                                    <>
                                      <Link to={"/dashboard/admin/myblogpost"} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">My Post</Link>
                                      <Link to={"/dashboard/admin/freeblogpost"} className="px-6 py-2 ml-6 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">Blog Create</Link>
                                    </>
                                  ):(
                                    <></>
                                    )
                                }
                            </div>

                            {
                              !auth?.user ? 
                              <></>
                              :

                              <div className="flex items-center mt-4 lg:mt-0">
                                  <button  onClick={handleDropdownClick} type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                      <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                          <img src={auth?.user?.image} className="object-cover w-full h-full" alt="avatar" />
                                      </div>
                                      <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden capitalize">{auth?.user?.name} </h3>
                                  </button>
  
                                  {isImageVisible && (
                                    <div className="absolute top-full right-0 z-50 mt-2 text-base bg-navup divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 w-48">
                                      <div className="px-4 py-3">
                                        <p className="text-sm text-white dark:text-white capitalize">
                                          {auth?.user?.name} 
                                        </p>
                                        <p className="text-sm font-medium text-white truncate dark:text-gray-300">
                                         {auth?.user?.email}
                                        </p>
                                      </div>
                                      <ul>
                                        <li>
                                          <Link to={`/dashboard/${auth?.user?.role===1 ? 'admin' : 'user'}`} className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-pro">Dashboard</Link>
                                        </li>
                                        <li>
                                          <button onClick={() => setVisibleLogout(true)} className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-pro">Sign out</button>
                                        </li>
                                      </ul>
                                    </div>
                                  )}

                                  
                                 

                              </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
            {
              visibleLogout && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="flex flex-col bg-black max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                        <div className="rounded-md shadow-lg px-4 py-6">
                            <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-red-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <h6 className="text-lg text-center text-white">Are you sure ?</h6>
                        </div>
                      <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                        <button onClick={()=>{setVisibleLogout(false)}} className="px-6 py-2 rounded-sm text-blue-600">Cancel</button>
                        <button onClick={handelLogout} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">LogOut</button>
                      </div>
                    </div>
                </div>
              )
            }
        </div>
      </div>
    );
};

export default Header;