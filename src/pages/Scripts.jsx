import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import { useCart } from "../context/CartProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../Lotianimation/notfound.json";
import Loading from "../component/Loading";

const Scripts = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [categoryId, setCategoryId] = useState("");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    //get all category
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

    //get products
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${baseUrl}/api/v1/product/product-list/${page}`);
        setLoading(false);
        setProducts(data.products);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong in getting products");
      }
    };
    useEffect(() => {
      getAllProducts();
    },[]);

    const handelBtn = () => {
      setCategoryId("")
      getAllProducts();
    };
  
    //getTotal Count of Products
    const getTotal = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/v1/product/product-count`);
        setTotal(data?.total);
      } catch (error) {
        toast.error("Something went wrong in getting products");
      }
    };
  
    useEffect(() => {
      if (page === 1) return;
      loadMore();
    }, [page]);

    //load more down single products
    const loadMore = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${baseUrl}/api/v1/product/product-list/${page}`);
        setLoading(false);
        setProducts([...products, ...data?.products]);
      } catch (error) {
        toast.error("Empty in getting products");
        setLoading(false);
      }
    };

    // documentation search 
    const handleFilterValue = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/product/search/${categoryId}`);
        setProducts(res.data?.products);
      } catch (error) {
        toast("Not Found");
      }
    }

    useEffect(() => {
      if (categoryId) {
        handleFilterValue();
      }
    }, [categoryId]);

    return (
        <Layout title={"Scripts"}>
            <div>
                <div>
                    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
                        <div className="text-center mb-4"> 
                          <h1 className="text-3xl font-black">Server and Scripts All Product List</h1>
                          <p className=" font-light">Select one item to view the product</p>
                          <div className="flex justify-center items-center my-4">
                            <div className="flex sm:flex-row flex-col">
                              <button onClick={handelBtn} type="button" className="capitalize text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-bold">All Products</button>

                              {
                                categories?.map((c) => (
                                    <div key={c._id}>
                                      <button onClick={() => setCategoryId(c._id)}  type="button" className="capitalize text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-bold">{c.name}</button>
                                    </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                        {
                          loading ? <><Loading/></>  : <>
                          {
                            products.length === 0 ? (
                            <>
                            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
                              <div className="flex justify-center items-center text-white">
                                <div>
                                  <h6 className="text-3xl font-bold text-center mt-6 text-blue-500">Product Not Found</h6>
                                  <Lottie className="w-96" animationData={groovyWalkAnimation} loop={true} />
                                </div>
  
                              </div>
                            </div>
                            </>):(<></>)
                          }

                          <div className="flex flex-wrap md:flex-row  sm:flex-row flex-col p-2 bg-navup gap-2 ">

                          {
                            products.map((items, key) => (   
                             
                              <div key={key} className="w-full sm:w-1/2 md:w-1/3 lg:w-[32%] bg-navup border border-sky-500 borderGlow">
                                  <div className="p-2">
                                      <img className="" src={`${baseUrl}/api/v1/product/product-photo/${items._id}`} alt="Script image" />
                                      <div className="flex gap-2 mt-2 items-center justify-between">
                                          <img className="w-10 h-10 rounded-full" src="https://res.cloudinary.com/dpdqebrhk/image/upload/v1707296847/tmfgmguurdmv2svyunjy.png" alt="pic" />
                                          <div className="">
                                              <h6 className="font-bold capitalize">{items.name.substring(0, 20)}</h6>
                                              <p>12h/day Support</p>
                                          </div>
                                          <div className="px-4 py-1 bg-teal-500 rounded-md text-center flex items-center border-dashed border-2 border-sky-500">$ {items.price}</div>
                                      </div>
                                      <div className="flex my-2 justify-between items-center">
                                          <h6 className="font-bold">Product Information :</h6>
                                          <div className="flex gap-2">
                                              <div className="px-4 py-1 bg-green-500 rounded-md text-center flex items-center ">ESX</div>
                                              <div className="px-4 py-1 bg-blue-500 rounded-md text-center flex items-center ">QBCore</div>
                                          </div>
                                      </div>
                                      <div className="my-2">
                                          <p className="text-white">Product Description :</p>
                                          <p className="text-white">{items.description.substring(0, 100)}...</p>
                                      </div>
                                      <div className="flex gap-4">
                                          <button onClick={() => navigate(`/product/${items.slug}`)} className="text-white bg-sky-500 px-4 py-2 btn w-[100%]">Check Product</button>
                                          <button onClick={() => {
                                             setCart([...cart, items]);
                                             localStorage.setItem("cart",JSON.stringify([...cart, items]));
                                             toast.success("Item Added to cart");
                                             }}  className="text-white bg-sky-500 px-4 py-2 btn w-[100%] flex gap-2 items-center"> Add to basket
                                             <svg width={18} height={19} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <line x1={9} y1="0.5" x2={9} y2="18.5" stroke="white" strokeWidth={2} />
                                               <line x1={18} y1={9} y2={9} stroke="white" strokeWidth={2} />
                                             </svg>
                                          </button>
                                      </div>                    
                                  </div>
                              </div>
                            ))
                          }
                          </div>
                        </>
                        }
                    </div>
                </div>

                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
                  <div className="flex justify-center">
                  {
                    products && products.length < total && (
                      <div className="flex gap-4">
                        <button onClick={(e) => {
                            e.preventDefault();
                            setPage(page - 1);
                          }} className="px-4 py-2 text-sm text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
                            {loading ? <><Loading/></> : "< Load Previous"}
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            setPage(page + 1);
                          }} className="px-4 py-2 text-sm text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
                            {loading ? <><Loading/></>  : "Load Next >"}
                        </button>
                      </div>
                    )
                  }
                  </div>
                </div>
            </div>
        </Layout>
    );
};

export default Scripts;



