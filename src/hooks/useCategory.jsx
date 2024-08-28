import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}