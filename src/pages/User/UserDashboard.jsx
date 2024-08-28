import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Layout from './../../component/Layout/Layout';
import UserMenu from './../../component/Layout/UserMenu';
import Loading from '../../component/Loading';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserDashboard = () => {
    const [auth, setAuth] = useAuth();
    const id = auth?.user?._id;
    const [ima, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleImageChange = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', ima);
            const response = await axios.put(`${baseUrl}/api/v1/auth/profile-pic/${id}`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setAuth({ ...auth, user: { ...auth.user, image: response.data.user.image } });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            // toast.error("Something went wrong" + error.message);
        } finally {
            setLoading(false);
            setImage(null)
        }
    };


    return (
      <Layout title={"User Dashboard"}>
        <div className='max-w-screen-xl mx-auto px-4  md:px-8 mt-4'>
            {
              loading?<><Loading/></>:  <></>
            }
          <div className='flex'>
              <div>
                  <UserMenu />
              </div>
               
              <div className="w-full text-center">
                 <h3 className='text-2xl font-bold '>Welcome to your Profile</h3>
                  <section className="py-14">
                      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                          <div className="max-w-3xl mx-auto text-center">
                            <div className="mt-6">
                                {/* <img src={auth?.user?.image} className="w-16 h-16 mx-auto rounded-full" alt={auth?.user?.name[0]}/> */}

                                <form action="" onSubmit={handleImageChange} className="flex items-center justify-center gap-2 text-white">
                                    <label htmlFor="file" className="block mt-5 cursor-pointer px-2 bg-green-600 hover:bg-green-700  rounded">
                                       <div className="flex items-center justify-center gap-2">
                                        <h6>Upload Profile Pic</h6>
                                         <svg className="w-4 h-4  dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                         </svg>
                                       </div>
                                        <input type="file" className="hidden" id="file" onChange={(e) => setImage(e.target.files[0])} />
                                    </label>
                                    <button type="submit" className="block mt-5 cursor-pointer px-2 bg-green-600 hover:bg-green-700  rounded">Save</button>
                                </form>
                                
                                <div className="mt-6">
                                  {
                                    ima && (
                                      <div className="w-72 max-w-full mx-auto">
                                        <img src={URL.createObjectURL(ima)} alt="Product photo" height={"200px"} />
                                      </div>
                                    )
                                  }
                                </div>

                                <div className="mt-3">
                                    <span className="block  font-semibold capitalize">Name : {auth?.user?.name}</span>
                                    <span className="block  text-sm mt-0.5 mb-2">Email : {auth?.user?.email}</span>
                                    <Link to={'/dashboard/user/profile'} className='bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded text-sm mt-4 text-white'>Edit Profile</Link>
                                    {/* <span className="block  text-sm mt-0.5">Role :{auth?.user?.role}</span> */}
                                </div>
                            </div>
                          </div>
                      </div>
                  </section>
              </div>
          </div> 
      </div>

     
    </Layout>
    );
};

export default UserDashboard;