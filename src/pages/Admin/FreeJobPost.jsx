import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import Layout from '../../component/Layout/Layout';
import { useAuth } from '../../context/auth';
import Loading from '../../component/Loading';


const FreeJobPost = () => {
  const [auth, setAuth] = useAuth();
  // name, description, phone, category,user,address,countryname,salary,overtimehours,overtimesalary
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");  
  const user = auth?.user?._id
  const [photo, setPhoto] = useState("");

 //get all category from backend
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;


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


  //create product function
  const handelcategorize = (e) => {
    setCategory(e.target.value);
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
  
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("user", user);
      productData.append("photo", photo);
  
      const { data } = await axios.post(`${baseUrl}/api/v1/client/client-post`, productData);

      if (data?.success) {
        setLoading(false);
        toast.success("Job Posted Successfully");
        removData();
      } else {
        setLoading(false);
        toast.error(data?.message || "Failed to post Blog");
        removData();
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong while posting Blog");
    }
  };


  const removData = () => {
    setName("");
    setDescription("");
    setCategory("");
    setPhoto("");
  };
  



  return (
    <Layout title={"Free Job Post"}>
      {
        loading && (<Loading/>)
      }
      <div className="min-h-screen flex justify-center items-center bg-gray-100 ">
        <div className="max-w-lg w-full p-8 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Create a Blog Post</h2>

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
                  photo && (
                    <div className="w-72 max-w-full mx-auto">
                      <img src={URL.createObjectURL(photo)} alt="Product photo" height={"200px"} />
                    </div>
                  )
                }
              </div>
              <label htmlFor="">blog Title</label>
              <div className="">
                  <input type="text" className="w-72 max-w-full mx-auto p-3 text-black border" value={name} onChange={(e) => setName(e.target.value)} placeholder="blog Title"/>
              </div>

              <label htmlFor="">enter your description</label>
              <div className="">
                  <textarea shape="" coords="" href="" alt="" className="w-72 max-w-full mx-auto p-3 text-black border" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description"/>
              </div>

          </div>
            
          {
            !auth?.user ?(
            <div>
              <p className='text-red-500 mb-2'>You must be logged in to post a job</p>
              <Link to={"/login"} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">
                Log in
              </Link>
            </div>
            ):
            <button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">
              blog Post
            </button>
          }

        </div>
      </div>
    </Layout>
  );
};

export default FreeJobPost;