import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
        if(data){

          setIsLoading(false);
        }

      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
      }
    }
    fetchData();
  }, [query, url]);
  return { isLoading, data };
}
