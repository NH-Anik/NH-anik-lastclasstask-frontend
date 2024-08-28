import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
    // variable verify email
    const [massage,setMassage] = useState('')
    const [error,setError] = useState('')
    const baseUrl = import.meta.env.VITE_BASE_URL;
    useEffect(() => {
        const verifyEmail = async()=>{
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token');
                const response = await axios.post(`${baseUrl}/api/v1/auth/verify-email`,{token})

                if(response.data.ok){
                    setMassage(response.data.message)
                }else{
                    setError(response.data.message)
                }
            } catch (error) {
                setError("Token not found or something went wrong please try again")
            }
        }
        verifyEmail();
        // eslint-disable-next-line
    },[])

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-3xl text-green-400 text-center align-middle">
                <div className="flex justify-center items-center">
                   <p className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">500 Tk</p>
                </div>

                <h1 className="my-6 ">{massage}</h1>
                <h2 className="my-6 text-green-600 w-[400px]">{error}</h2>
                <div>
                    <Link to='/login' className="btn rounded px-1 py-1">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;