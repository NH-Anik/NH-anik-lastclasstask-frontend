
import Layout from './../../component/Layout/Layout';
import AdminMenu from './../../component/Layout/AdminMenu';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../component/Loading';
const Users = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [loading, setLoading] = useState(false);
    // const tableItems 
    const [allUsers, setAllUsers] = useState([]);
     //get all products
    const getAllUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/api/v1/auth/all-user`);
        setAllUsers(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Something Went Wrong");
      }
    };

    // lifecycle method
    useEffect(() => {
      getAllUser();
    }, []);

    // delete user 
    const [visibleDelete,setVisibleDelete]=useState(false);
    const [selectedDeleteId,setSelectedDeleteId]=useState("");
    const [deleteName,setDeleteName]=useState("");

    const handelDelete = async () => {
        try {
            const { data } = await axios.delete(`${baseUrl}/api/v1/auth/delete-user/${selectedDeleteId._id}`);
            if (data?.success) {
              toast.success(`${deleteName} is Delete`);
              setVisibleDelete(false);
              getAllUser();
            } else {
              toast.error(data.message);
            }
        } catch (error) {
          toast.error("Something went wrong in Delete category");
        }
    }

    // edit user admin panel
    const [visibleEdit,setVisibleEdit]=useState(false);
    const [selectedEditId,setSelectedEditId]=useState("");
    const [editName,setEditName]=useState("");
    const [editRole,setEditRole]=useState("");
    const [roleError,setRoleError]=useState("");

    const handelRoleInput = (e) =>{
        setEditRole(e.target.value);
        setRoleError(null);
    }

    const handelEdit = async () => {
        if(editRole <= 1){
            try {
                const { data } = await axios.put(`${baseUrl}/api/v1/auth/update-user/${selectedEditId._id}`,
                   { role: editRole }
                );
                if (data?.success) {
                    toast.success(`${editName} is updated`);
                    setVisibleEdit(false);
                    getAllUser();
                  } else {
                    toast.error(data.message);
                    setVisibleDelete(false);
                }
            }
            catch (error) {
                toast.error("Something went wrong in Edit user");
                setVisibleDelete(false);
            }
        }else{
            setRoleError("Role is Required");
        }
    }

    return (
        <Layout title={"Users Admin Dashboard"}>
            {
                loading ? <><Loading/></> :<>
                <div className='max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8'>
                    <div className='flex'>
                        <div>
                            <AdminMenu />
                        </div>
                         
                        <div>
                            <div>
                                <h1 className="text-3xl text-center "> Admin Users List</h1>
                            </div>
                      
                            <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto">
                                <table className="w-full table-auto text-sm text-left">
                                    <thead className="bg-gray-50 text-blue-600 font-medium border-b">
                                        <tr>
                                            <th className="py-3 px-6">Username</th>
                                            <th className="py-3 px-6">Email</th>
                                            <th className="py-3 px-6">Position</th>
                                            <th className="py-3 px-6">address</th>
                                            <th className="py-3 px-6">action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 divide-y">
                                        {
                                            allUsers.map((item,key) => (
                                                <tr key={key}>
                                                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                                        <img src={item.image} className="w-10 h-10 rounded-full" />
                                                        <div>
                                                            <span className=" block text-sm font-medium">{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" px-6 py-4 whitespace-nowrap">{item.email}</td>
                                                    <td className=" px-6 py-4 whitespace-nowrap">{item.role}</td>
                                                    <td className=" px-6 py-4 whitespace-nowrap capitalize">{item.address}</td>
                                                    <td className="text-right px-6 whitespace-nowrap">
                                                        <button onClick={()=>{setVisibleEdit(true); setEditName(item.name), setSelectedEditId(item)}} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                            Edit
                                                        </button>
                                                        <button onClick={()=>{setVisibleDelete(true); setDeleteName(item.name), setSelectedDeleteId(item)}}  className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
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
                          <button type='button' onClick={()=>setVisibleDelete(false)} className="px-6 py-2 rounded-sm text-blue-600">No</button>
                          <button type='button' onClick={handelDelete} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Yes</button>
                        </div>
                      </div>
                  </div>
              )
            }
            {
              visibleEdit && (
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
                              <h6 className="text-lg text-center  mt-2">Are you sure ? make Admin</h6>
                              <p className='text-red-600 capitalize text-center'> Change - Role {editName}</p>
                            <p className='text-center text-2xl text-red-600'>Now Role is {selectedEditId.role}</p>
                            <input onChange={handelRoleInput}  className='text-center w-full' min={0} max={1} placeholder='0 or 1 Enter 1 for Admin' type="number" />
                            <p className='text-red-600'>{roleError}</p>
              
                          </div>
                        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                          <button type='button' onClick={()=>setVisibleEdit(false)} className="px-6 py-2 rounded-sm text-blue-600">No</button>
                          <button type='button' onClick={handelEdit} className="px-6 py-2 text-red-600 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Yes</button>
                        </div>
                      </div>
                  </div>
              )
            }
        </Layout>
    );
};

export default Users;

