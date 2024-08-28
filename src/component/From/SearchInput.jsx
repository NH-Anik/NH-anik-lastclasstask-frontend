import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
const SearchInput = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/client/all-search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      toast.error("Soothing went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md px-4 mx-auto">
        <div className="flex">
          <div className="relative md:block" >
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input onChange={(e) => setValues({ ...values, keyword: e.target.value })} type="text" id="search-navbar" className="lowercase block w-full p-2 ps-10 text-sm bg-transparent  border border-gray-300 rounded-lg outline-pro ring-pro focus:ring-pro focus:border-pro dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " placeholder="Search..." />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;