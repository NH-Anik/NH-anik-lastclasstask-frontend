import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import { useSearch } from "../context/search";


const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    return (
        <Layout title={"Search Result"}>
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Search Result</h1>
                <h6 className="mb-6">
                    {values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length}`}
                </h6>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {values.results.map((item, key) => (
                    <div key={key} className="border border-sky-500 p-2 rounded-md">
                        <div className="p-2">
                            <img 
                                className="w-full h-48 object-cover" 
                                src={`${baseUrl}/api/v1/client/client-jobpostphoto/${item._id}`} 
                                alt="Script image" 
                            />
                            <div className="flex gap-2 mt-2 items-center justify-between">
                                <img 
                                    className="w-10 h-10 rounded-full" 
                                    src={`${baseUrl}/api/v1/client/client-jobpostphoto/${item._id}`} 
                                    alt="Profile pic" 
                                />
                                <div className="">
                                    <h6 className="font-bold capitalize">
                                        Job Title: {item.name.substring(0, 20)}
                                    </h6>
                                </div>
                            </div>
                            <div className="my-2 capitalize">
                                <p>Product Description:</p>
                                <p>{item.description.substring(0, 100)}...</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
        
            </div>
        </div>
    </Layout>
    );
};

export default Search;