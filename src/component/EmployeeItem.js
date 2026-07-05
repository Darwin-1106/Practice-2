import Accordion from "react-bootstrap/Accordion";
import ProjectTable from "./ProjectTable";

function EmployeeItem({ emp, index, works, getProjectName, onViewDependents }) {
  const fullName = `${emp.empName.firstName} ${emp.empName.lastName}`;
  const isManager = emp.supervisorId === null;

  return (
    <Accordion.Item eventKey={String(index)} key={emp.id}>
      <Accordion.Header>
        #{emp.id} - {fullName}
        {isManager && (
          <span
            style={{
              marginLeft: "10px",
              backgroundColor: "#0d6efd",
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            Manager
          </span>
        )}
      </Accordion.Header>
      <Accordion.Body>
        <ul>
          <li><strong>EmployeeId:</strong> {emp.id}</li>
          <li><strong>Gender:</strong> {emp.empGender}</li>
          <li><strong>BirthDate:</strong> {emp.empBirthdate}</li>
        </ul>

        <button
          onClick={() => onViewDependents(emp)}
          style={{
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            padding: "5px 14px",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          View Dependents
        </button>

        <ProjectTable
          works={works}
          empSalary={emp.empSalary}
          getProjectName={getProjectName}
        />
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default EmployeeItem;
