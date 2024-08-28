import { useEffect, useState } from 'react';
import Layout from '../../component/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Loading from '../../component/Loading';
import AdminMenu from '../../component/Layout/AdminMenu';

const EditJobPost = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");  
  const user = auth?.user?._id
  const [photo, setPhoto] = useState("");
  const [id,setId]= useState("");
  const params = useParams();

 //get all category from backend
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  //create product function
  const handelcategorize = (e) => {
    setCategory(e.target.value);
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true); 
  
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("user", user);
      photo && productData.append("photo", photo);
  
      const { data } = await axios.put(`${baseUrl}/api/v1/client/update-product/${id}`,productData);
      if (data?.success) {
        toast.success(data?.message);
        setLoading(false);
      } else {
        toast.success("blog Updated Successfully");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong while posting blog");
    }
  };

  //get all category from backend
  const [allCategories, setAllCategories] = useState([]);
  const getAllCategory = async () => {
     try {
       const { data } = await axios.get(`${baseUrl}/api/v1/category/get-category`);
       if (data?.success) {
        setAllCategories(data?.category);
       }
     } catch (error) {
      //  toast.error("Something went wrong in getting category");
     }
  }
  
  useEffect(() => {
    getAllCategory();   
  }, []); 


  //get single product
  const getSingleProduct = async () => {
      setLoading(true);
      try {
          const { data } = await axios.get(
            `${baseUrl}/api/v1/client/get-product/${params.slug}`
          );
          setId(data.product._id);
          setName(data.product.name);
          setDescription(data.product.description);
          setCategory(data.product.category._id);
          setPhoto(data.product.photo);
          setLoading(false);
      } catch (error) {
        toast.error("Something went wrong in getting single product");
        setLoading(false);
      }
  };
  
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
    
    return (
        <Layout title={"Edit Blog Post"}>
            <div className='max-w-screen-xl mx-auto px-4  md:px-8 mt-4'>
                {
                  loading ? <Loading /> : ""
                }
                <div className='flex'>
                    <div>
                    <AdminMenu />
                    </div>
                     
                    <div  className="container px-6 py-4 mx-auto">
                        <h3 className='text-2xl font-bold capitalize'>Edit Blog post</h3>
                        <section className="py-14">

                          <div>    
                              <select onChange={handelcategorize} value={category} className="mb-12 w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"  size={length} placeholder="Select a category">
                                <option value="">Select a category</option>
                                {
                                  allCategories?.map((c) => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                  ))
                                }
                              </select>
                            
                              <div className="mb-12 ">
                                  <label className="w-72 max-w-full mx-auto mt-12  bg-slate-500 p-3 border">
                                      {photo ? photo.name : "Upload Photo"}
                                      <input type="file" name="photo" accept="image/* " onChange={(e) => setPhoto(e.target.files[0])} hidden/>
                                  </label>
                                  <p className="text-green-500 mt-4">Select a photo less than 1Mb</p>
                              </div>
                              <div className="mb-12">
                                {
                                  photo ? (
                                    <div className="w-72 max-w-full mx-auto">
                                      <img src={URL.createObjectURL(photo)} alt="Product photo" height={"200px"} />
                                    </div>
                                  ):(
                                      <div className="w-72 max-w-full mx-auto">
                                      <img src={`${baseUrl}/api/v1/client/client-jobpostphoto/${id}`} alt="Product photo" height={"200px"} />
                                    </div>
      
                                  )
                                }
                              </div>
                              <label  className="text-gray-700 dark:text-gray-200" htmlFor="">enter your Blog title</label>
                              <div className="">
                                  <input type="text" className="w-72 max-w-full mx-auto p-3 text-black border" value={name} onChange={(e) => setName(e.target.value)} placeholder="blog Title"/>
                              </div>

                              <label  className="text-gray-700 dark:text-gray-200" htmlFor="">enter your description</label>
                              <div className="">
                                  <textarea shape="" coords="" href="" alt="" className="w-72 max-w-full mx-auto p-3 text-black border" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description"/>
                              </div>
                
                          </div>

                              
                          {
                            !auth?.user ?(
                            <div>
                              <p className='text-red-500 mb-2'>You must be logged in to post a blog</p>
                              <Link to={"/login"} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">
                                Log in
                              </Link>
                            </div>
                            ):
                            <button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">
                              Update blog Post
                            </button>
                          }
                   
                        </section>
                    </div>
                </div> 
            </div>
        </Layout>
    );
};

export default EditJobPost;