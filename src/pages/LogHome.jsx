
import {useEffect, useState } from 'react'
import Layout from '../component/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import ModalImage from "react-modal-image";
import RiseLoader from 'react-spinners/RiseLoader'


const LogHome = () => {

  const [allProducts, setAllProducts] = useState([]);
  console.log(allProducts);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");

  //get all category
  const [categories, setCategories] = useState([]);
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      // toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // category search
  const handleFilterValue = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseUrl}/api/v1/client/search/${categoryId}`);
      setAllProducts(res.data?.products);
      setLoading(false);
    } catch (error) {
      toast("Not Found");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (categoryId) {
      handleFilterValue();
    }
  }, [categoryId]);

  // Fetch all products
  const getAllProducts = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const { data } = await axios.get(`${baseUrl}/api/v1/client/product-list/${page}`);
        setLoading(false);
        setAllProducts(data.products);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
      }
  };


  // Lifecycle method
  useEffect(() => {
      getAllProducts();
  }, [])

  //get filter product by price
  const [radio, setRadio] = useState([]);
  useEffect(() => {
    if (radio.length) filterProduct();
  }, [ radio]);

  const filterProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/client/job-filters`, {
        radio,
      });
      if(data?.products?.length==0){
        toast.error("No job Found");
      }else{
        setAllProducts(data?.products);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

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

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  //getTotal Count of Products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/client/product-count`);
      setTotal(data?.total);
    } catch (error) {
      // toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/api/v1/client/product-list/${page}`);
      console.log(data);
      setLoading(false);
      if (data.products.length === 0) {
        toast.error("No more products available");
      } else {
        setAllProducts([...allProducts, ...data?.products]);
      }
    } catch (error) {
      toast.error("Failed to load more products");
      setLoading(false);
    }
  };

  return (
    <Layout title={"Home - Blog - $5"}>
      {
        loading && ( <div className="flex justify-center items-center h-screen"><RiseLoader color="#36d7b7" /></div>)
      }

      <div  className="container px-6 py-10 mx-auto">
          <h3 className='text-2xl font-bold capitalize'>Blogs list</h3>
          <section className="py-14">
            { 
              allProducts.map((product) => (
                <div key={product._id} className='mt-6'>
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
                    <hr />
                </div>
              ))
            } 
          </section>
      </div>
    


      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
        <div className="flex justify-center">
        {
          allProducts && allProducts.length < total && (
            <div className="flex gap-4">
              <button onClick={(e) => { e.preventDefault(); setPage(page - 1);}} 
                className="px-4 py-2 text-sm duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
                {loading ? <><div className="flex justify-center items-center h-screen"><RiseLoader color="#36d7b7" /></div></> : "< Load Previous"}
              </button>
              <button onClick={(e) => { e.preventDefault(); setPage(page + 1);}}
                className="px-4 py-2 text-sm duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
                {loading ? <><div className="flex justify-center items-center h-screen"><RiseLoader color="#36d7b7" /></div></>  : "Load Next >"}
              </button>
            </div>
          )
        }
        </div>
      </div>




    </Layout>
  )
};

export default LogHome;