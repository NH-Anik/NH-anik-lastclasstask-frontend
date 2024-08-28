import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path="login"}) => {
  const [count,setCount]=useState(3);
  const navigate=useNavigate();
  const location=useLocation();
  useEffect(()=>{
      const interval=setInterval(()=>{
          setCount((prevValue)=>--prevValue);
      },1000);
      count ===0 && navigate(`/${path}`,{
          state:location.pathname
      });
      return ()=>clearInterval(interval);
  },[count,navigate,location,path]) 
  
  return (
    <> 
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col bg-black max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
          <div className="rounded-md shadow-lg px-4 py-6">
            <div className="flex flex-col justify-center items-center align-center">
                <h1 className="text-2xl mb-4 text-white">Redirecting to you in {count} seconds</h1>
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>   
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
