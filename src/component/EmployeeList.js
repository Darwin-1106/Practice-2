import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import useEmployees from "../hooks/useEmployees";
import useWorkons from "../hooks/useWorkons";
import useProjects from "../hooks/useProjects";
import EmployeeItem from "./EmployeeItem";
import DependentsList from "./DependentsList";

function EmployeeList({ departmentId }) {
  const [employees, setEmployees] = useState(null);
  const rawEmployees = useEmployees();
  const workons = useWorkons();
  const projects = useProjects();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Reset when department changes
  useEffect(() => {
    setEmployees(null);
    setSelectedEmployee(null);
  }, [departmentId]);


  // Use local state if available (after update), otherwise use fetched data
  const displayEmployees = employees || rawEmployees;

  const filteredEmployees = displayEmployees.filter(
    (emp) => String(emp.depId) === String(departmentId)
  );

  const getProjectName = (proId) => {
    const project = projects.find((p) => String(p.id) === String(proId));
    return project ? project.proName : "";
  };

  const getWorkons = (empId) =>
    workons.filter((w) => String(w.empId) === String(empId));

  const handleViewDependents = (emp) => {
    setSelectedEmployee(emp);
  };

  const handleDependentsUpdated = (updatedEmp) => {
    // Update local employees state so UI refreshes immediately
    const baseList = employees || rawEmployees;
    const updatedList = baseList.map((e) =>
      String(e.id) === String(updatedEmp.id) ? updatedEmp : e
    );
    setEmployees(updatedList);
    setSelectedEmployee(updatedEmp);
  };

  return (
    <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
      {/* Employee List */}
      <div style={{ flex: 1 }}>
        <h3>Employee List</h3>
        <Accordion>
          {filteredEmployees.map((emp, index) => (
            <EmployeeItem
              key={emp.id}
              emp={emp}
              index={index}
              works={getWorkons(emp.id)}
              getProjectName={getProjectName}
              onViewDependents={handleViewDependents}
            />
          ))}
        </Accordion>
      </div>

      {/* Dependents Panel */}
      <div style={{ minWidth: "280px" }}>
        <DependentsList
          employee={selectedEmployee}
          onDependentsUpdated={handleDependentsUpdated}
        />
      </div>
    </div>
  );
}

export default EmployeeList;
