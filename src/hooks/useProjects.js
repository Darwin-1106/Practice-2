import { useEffect, useState } from "react";
import axios from "axios";

function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9999/projects")
      .then((res) => setProjects(res.data));
  }, []);

  return projects;
}

export default useProjects;
