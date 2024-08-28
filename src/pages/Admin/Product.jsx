import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Layout from './../../component/Layout/Layout';
import AdminMenu from './../../component/Layout/AdminMenu';
import ModalImage from "react-modal-image";
import { useAuth } from '../../context/auth';

const Product = () => {
    const [allProducts, setAllProducts] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const getAllProducts = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/v1/client/client-alljobpost`);
          setAllProducts(response.data.posts);
        } catch (error) {
          toast.error("Something went wrong");
        }
    };
  
    //lifecycle method
    useEffect(() => {
      getAllProducts();
    }, []);

    // Function to format the date part
    function formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString(); 
    }
    
    // Function to format the time part
    function formatTime(datetime) {
      const date = new Date(datetime);
      return date.toLocaleTimeString();
    }

    return (
        <Layout title={"Users Admin Dashboard"}>
        <div className='max-w-screen-xl mx-auto px-4  md:px-8'>
            <div className='flex'>
                <div>
                    <AdminMenu />
                </div>
                 
                <div>
                    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
                        <div className="text-center">
                            <h1 className="text-3xl  font-semibold">
                                All Blogs List
                            </h1>
                            <p className="mt-3 ">
                              All Product that are loved by the community. Updated every hour.
                            </p>
                        </div> 
                    </section>

                    <section className="bg-white dark:bg-gray-900">
                        <div className="container px-6 py-2 mx-auto">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                            { 
                                allProducts.map((product) => (
                                    <div key={product._id}>
                                        <Link to={`/dashboard/admin/product/${product.slug}`}> 
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
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            } 
                            </div>
                        </div>
                    </section>
                </div>
            </div>
           
        </div>
    </Layout>
    );
};

export default Product;