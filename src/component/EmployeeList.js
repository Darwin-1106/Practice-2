import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import useEmployees from "../hooks/useEmployees";
import useWorkons from "../hooks/useWorkons";
import useProjects from "../hooks/useProjects";
import EmployeeItem from "./EmployeeItem";

function EmployeeList({ departmentId }) {
  const employees = useEmployees();
  const workons = useWorkons();
  const projects = useProjects();

  const filteredEmployees = employees.filter(
    (emp) => String(emp.depId) === String(departmentId)
  );

  const getProjectName = (proId) => {
    const project = projects.find((p) => String(p.id) === String(proId));
    return project ? project.proName : "";
  };

  const getWorkons = (empId) =>
    workons.filter((w) => String(w.empId) === String(empId));

  return (
    <div>
      <h3>Employee List</h3>
      <Accordion>
        {filteredEmployees.map((emp, index) => (
          <EmployeeItem
            key={emp.id}
            emp={emp}
            index={index}
            works={getWorkons(emp.id)}
            getProjectName={getProjectName}
          />
        ))}
      </Accordion>
    </div>
  );
}

export default EmployeeList;
