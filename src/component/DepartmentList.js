import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useDepartments from "../hooks/useDepartments";
import useEmployees from "../hooks/useEmployees";
import EmployeeList from "./EmployeeList";

function DepartmentList() {
  const departments = useDepartments();
  const employees = useEmployees();
  const [selectedDeptId, setSelectedDeptId] = useState(null);

  const getManagerName = (managerId) => {
    const manager = employees.find((emp) => String(emp.id) === String(managerId));
    return manager ? `${manager.empName.firstName} ${manager.empName.lastName}` : "";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>COMPANY MANAGEMENT</h2>

      <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
        {/* LEFT - Department Table */}
        <div style={{ minWidth: "280px" }}>
          <h3>Department List</h3>
          <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ padding: "6px 10px" }}>DepName</th>
                <th style={{ padding: "6px 10px" }}>Manager</th>
                <th style={{ padding: "6px 10px" }}>Employees</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td style={{ padding: "6px 10px" }}>{dept.depName}</td>
                  <td style={{ padding: "6px 10px" }}>{getManagerName(dept.managerId)}</td>
                  <td style={{ padding: "6px 10px" }}>
                    <button
                      onClick={() => setSelectedDeptId(dept.id)}
                      style={{
                        backgroundColor: selectedDeptId === dept.id ? "#0a58ca" : "#0d6efd",
                        color: "white",
                        border: "none",
                        padding: "4px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT - Employee List */}
        {selectedDeptId && (
          <div style={{ flex: 1 }}>
            <EmployeeList departmentId={selectedDeptId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DepartmentList;