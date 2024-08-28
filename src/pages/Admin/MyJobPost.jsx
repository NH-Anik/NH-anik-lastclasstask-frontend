import { useEffect, useState } from 'react';
import Layout from '../../component/Layout/Layout';
import { useAuth } from '../../context/auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ModalImage from 'react-modal-image';
import Loading from '../../component/Loading';
import AdminMenu from '../../component/Layout/AdminMenu';

const MyJobPost = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useAuth();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    // Fetch all products
    const getAllProducts = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${baseUrl}/api/v1/client/client-alljobpost`);
          const filteredPosts = response.data.posts.filter(item => item.user._id === auth?.user?._id);
          if (filteredPosts.length === 0) {
            toast.error("No blog Post Found");
          } else {
            setAllProducts(filteredPosts);
          }  
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error("Something went wrong");
        }
    };
  
    // Lifecycle method
    useEffect(() => {
        getAllProducts();
    }, [])

    // Function to format the date part
    function formatDate(datetime) {
      const date = new Date(datetime);
      // `toLocaleDateString()` returns the date in the local format
      return date.toLocaleDateString(); 
    }
    
    // Function to format the time part
    function formatTime(datetime) {
      const date = new Date(datetime);
      // `toLocaleTimeString()` returns the time in the local format
      return date.toLocaleTimeString();
    }
    
    //delete a product
    const handleDelete = async (id) => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
    
            const { data } = await axios.delete(`${baseUrl}/api/v1/client/delete-product/${id}`);
    
            toast.success("Product Deleted Successfully");
            setTimeout(() => {
              window.location.reload()
              navigate("/dashboard/user/myjobpost");
            }, 1000);
          
        } catch (error) {
          toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Admin Dashboard"}>
        <div className='max-w-screen-xl mx-auto px-4  md:px-8 mt-4'>
          {
            loading ? <div className="flex justify-center items-center h-screen"><Loading /></div> : ""
          }
          <div className='flex'>
                <div>
                <AdminMenu />
                </div>
                 
                <div  className="container px-6 py-10 mx-auto">
                    <h3 className='text-2xl font-bold capitalize'>Create Blog post list</h3>
                    <section className="py-14">
  
                  
                      { 
                        allProducts.map((product) => (
                          <div key={product._id} className='mt-2'>
                              <ModalImage className="object-cover object-center w-full h-64 rounded-lg lg:h-80" small={`${baseUrl}/api/v1/client/client-jobpostphoto/${product._id}`} large={`${baseUrl}/api/v1/client/client-jobpostphoto/${product._id}`} alt/>
                              <div className="mt-8">
                                  <span className="text-blue-500 uppercase">category : {product?.category?.name}</span>
                                  <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{product?.name}</h1>
                                  <p className="mt-2 text-gray-500 dark:text-gray-400">{product?.description}</p>
                                  <div className="flex items-center justify-between mt-4">
                                    <div>
                                      <Link to={"#"} className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500 capitalize">
                                        Post By : {product?.user?.name}
                                      </Link>
                                      <div className='flex gap-4'>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                          Date: {formatDate(product?.updatedAt)} 
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                          Time: {formatTime(product?.updatedAt)}
                                        </p>
                                      </div>
                                    </div>
                                    {
                                      !auth?.user ? 
                                      <></>
                                      :
                                      <>
                                      <div className='flex gap-6'>
                                        <button onClick={() => navigate(`/dashboard/admin/editblogpost/${product.slug}`)} className='inline-block text-blue-500 underline hover:text-blue-400'>Edit</button>  

                                        <button onClick={() => handleDelete(product._id)} className='inline-block text-red-500 underline hover:text-red-400'>Delete</button>  
                                       
                                      </div>
                                      </>
                                    }
                                  </div>
                              </div>
                              <hr />
                          </div>
                        ))
                      }
                      
                    </section>
                </div>
          </div> 
      </div>
    </Layout>
    );
};

export default MyJobPost;