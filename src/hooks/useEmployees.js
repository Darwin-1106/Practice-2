import { useEffect, useState } from "react";
import axios from "axios";

function useEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9999/employees")
      .then((res) => setEmployees(res.data));
  }, []);

  return employees;
}

export default useEmployees;
