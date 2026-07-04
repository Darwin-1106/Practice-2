import { useEffect, useState } from "react";
import axios from "axios";

function useDepartments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9999/departments")
      .then((res) => setDepartments(res.data));
  }, []);

  return departments;
}

export default useDepartments;
