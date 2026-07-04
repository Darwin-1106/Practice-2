import { useEffect, useState } from "react";
import axios from "axios";

function useWorkons() {
  const [workons, setWorkons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9999/workons")
      .then((res) => setWorkons(res.data));
  }, []);

  return workons;
}

export default useWorkons;
