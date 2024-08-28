import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from './../../component/Layout/Layout';
import AdminMenu from './../../component/Layout/AdminMenu';
import CategoryFrom from './../../component/From/CategoryFrom';

const CreateCategory = () => {
    // create category form
    const [name, setName] = useState("");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${baseUrl}/api/v1/category/create-category`, {
                name
            })

            if(data?.success){
                toast.success(`${name} is created`);
                setName("");
                getAllCategory();
            }
            else{
                toast.error(data?.message);
            }
        }
        catch (error) {
            toast.error("Something went wrong in creating category");
        }
    }

    //get all category from backend
    const [Categories, setCategories] = useState([]);
    
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/v1/category/get-category`);
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        // toast.error("Something went wrong in getting category");
      }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

   // update category
    const [visible,setVisible]=useState(false);
    const [updateName,setUpdateName]=useState("");
    const [selected,setSelected]=useState("");
    
    const handelUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
              `${baseUrl}/api/v1/category/update-category/${selected._id}`,
              { name: updateName }
            );
            if (data?.success) {
              toast.success(`${updateName} is updated`);
              setSelected(null);
              setUpdateName("");
              setVisible(false);
              getAllCategory();
            } else {
              toast.error(data.message);
            }
        } catch (error) {
          toast.error("Something went wrong in updating category");
        }
    }

    // delete category
    const [visibleDelete,setVisibleDelete]=useState(false);
    const [selectedDeleteId,setSelectedDeleteId]=useState("");
    const [deleteName,setDeleteName]=useState("");

    const handelDelete = async () => {
        try {
            const { data } = await axios.delete(`${baseUrl}/api/v1/category/delete-category/${selectedDeleteId._id}`);
            if (data?.success) {
              toast.success(`${deleteName} is Delete`);
              setVisibleDelete(false);
              getAllCategory();
            } else {
              toast.error(data.message);
            }
        } catch (error) {
          toast.error("Something went wrong in Delete category");
        }
    }

    return (
        <Layout title={"Create Category Admin Dashboard"}>
            <div className='max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8'>
                <div className='flex'>
                    <div>
                        <AdminMenu />
                    </div>
                     
                    <div>
                         <div className="max-w-screen-xl mx-auto px-4 md:px-8">

                            <div className="max-w-lg mb-4">
                                <h3 className=" text-xl font-bold sm:text-2xl">
                                    Create Category
                                </h3>                                
                            </div>
                            <div>
                                <CategoryFrom handelSubmit={handelSubmit} value={name} setValue={setName}/>
                            </div>

                            <div className="items-start justify-between md:flex mt-4">
                                <div className="max-w-lg">
                                    <h3 className=" text-xl font-bold sm:text-2xl">
                                        All Category List
                                    </h3>
                                </div>
                            </div>
                            
                            {/* Table */}
                            <div className="mt-4 shadow-sm border rounded-lg overflow-x-auto">
                                <table className="w-full table-auto text-sm text-left">
                                    <thead className="bg-gray-50 v font-medium border-b">
                                        <tr>
                                            <th className="py-3 px-6">Name</th>
                                            <th className="py-3 px-6">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className=" divide-y">
                                        {
                                            Categories?.map((item) => (
                                                <>
                                                    <tr>
                                                        <td key={item._id} className="px-6 py-4 ">{item.name}</td>
                                                        <td className="px-6 ">
                                                            <button onClick={()=>{setVisible(true); setUpdateName(item.name), setSelected(item)}} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                                Edit
                                                            </button>
                                                            <button onClick={()=>{setVisibleDelete(true); setDeleteName(item.name), setSelectedDeleteId(item)}}  className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div>

                              {
                                visible && (
                                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                                        <div className="absolute bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 ">
                                            <h6 className="text-lg ">Update Category - {updateName}</h6>
                                            <CategoryFrom handelSubmit={handelUpdate} value={updateName} setValue={setUpdateName}/>    
                                            <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                              <button onClick={()=>setVisible(false)} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                )
                              }

                              {
                                visibleDelete && (
                                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
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
                                                <h6 className="text-lg text-center ">Are you sure ?</h6>
                                                <p className="text-center text-2xl text-red-600">Want to Delete - {deleteName}</p>
                                
                                            </div>

                                          <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                            <button onClick={()=>setVisibleDelete(false)} className="px-6 py-2 rounded-sm text-blue-600">No</button>
                                            <button onClick={handelDelete} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Yes</button>
                                          </div>
                                        </div>
                                    </div>
                                )
                              }
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;