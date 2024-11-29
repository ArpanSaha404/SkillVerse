import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(url, { withCredentials: true })
        .then((res) => setData(res.data))
        .catch((err) => console.error(err));
    };

    fetchData();
  }, [url]);
  return [data];
};

export default useFetch;
