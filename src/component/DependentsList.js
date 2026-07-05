import { useState } from "react";
import axios from "axios";

const RELATIONSHIP_OPTIONS = [
  "Wife",
  "Son",
  "Daughter",
  "Father",
  "Mother",
  "Father in law",
  "Mother in law",
];

function DependentsList({ employee, onDependentsUpdated }) {
  const [fullname, setFullname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [relationship, setRelationship] = useState("");
  const [errors, setErrors] = useState([]);

  if (!employee) return null;

  const dependents = employee.dependents || [];

  const validate = () => {
    const errs = [];
    if (!fullname.trim()) errs.push("Fullname is required");
    if (!birthdate) {
      errs.push("Birthdate is required");
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const bd = new Date(birthdate);
      if (bd >= today) errs.push("Birthdate must be before today");
    }
    if (!relationship) errs.push("Please choose a relationship");
    return errs;
  };

  const handleAdd = () => {
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    const newDependent = {
      fullName: fullname.trim(),
      birthDate: birthdate,
      relationship: relationship,
    };

    const updatedDependents = [...dependents, newDependent];
    const updatedEmployee = { ...employee, dependents: updatedDependents };

    axios
      .put(`http://localhost:9999/employees/${employee.id}`, updatedEmployee)
      .then(() => {
        setErrors([]);
        setFullname("");
        setBirthdate("");
        setRelationship("");
        if (onDependentsUpdated) onDependentsUpdated(updatedEmployee);
      })
      .catch(() => {
        setErrors(["Failed to update. Please try again."]);
      });
  };

  return (
    <div style={{ minWidth: "260px", maxWidth: "320px" }}>
      <h3>Dependents List</h3>

      {dependents.length === 0 ? (
        <p style={{ color: "red", fontStyle: "italic" }}>No dependents</p>
      ) : (
        <table border="1" style={{ borderCollapse: "collapse", width: "100%", marginBottom: "16px" }}>
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th style={{ padding: "6px 8px" }}>No.</th>
              <th style={{ padding: "6px 8px" }}>Name</th>
              <th style={{ padding: "6px 8px" }}>Birthdate</th>
              <th style={{ padding: "6px 8px" }}>Relationship</th>
            </tr>
          </thead>
          <tbody>
            {dependents.map((dep, i) => (
              <tr key={i}>
                <td style={{ padding: "6px 8px" }}>{i + 1}</td>
                <td style={{ padding: "6px 8px" }}>{dep.fullName}</td>
                <td style={{ padding: "6px 8px" }}>{dep.birthDate}</td>
                <td style={{ padding: "6px 8px" }}>{dep.relationship}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h5>Add new dependents</h5>

      {errors.length > 0 && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c2c7",
            borderRadius: "4px",
            padding: "10px 14px",
            marginBottom: "10px",
            color: "#842029",
          }}
        >
          <strong>Errors:</strong>
          <ul style={{ margin: "4px 0 0 0", paddingLeft: "18px" }}>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: "8px" }}>
        <label style={{ display: "block", marginBottom: "2px" }}>Fullname</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          style={{ width: "100%", padding: "4px 8px", boxSizing: "border-box" }}
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        <label style={{ display: "block", marginBottom: "2px" }}>Birthdate</label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          style={{ width: "100%", padding: "4px 8px", boxSizing: "border-box" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "2px" }}>Relationship</label>
        <select
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          style={{ width: "100%", padding: "4px 8px", boxSizing: "border-box" }}
        >
          <option value="">--- Type of relationship ---</option>
          {RELATIONSHIP_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAdd}
        style={{
          backgroundColor: "#198754",
          color: "white",
          border: "none",
          padding: "6px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Add
      </button>
    </div>
  );
}

export default DependentsList;
