const calcSalary = (empSalary, workHours) => {
  const hourly = empSalary / 176;
  return hourly * workHours;
};

const formatVND = (amount) => Math.round(amount).toLocaleString("vi-VN");

function ProjectTable({ works, empSalary, getProjectName }) {
  if (works.length === 0) return null;

  const totalSalary = works.reduce(
    (total, w) => total + calcSalary(empSalary, w.workHours),
    0
  );

  return (
    <>
      <p><strong>Work on projects</strong></p>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th style={{ padding: "6px 10px" }}>WorkId</th>
            <th style={{ padding: "6px 10px" }}>Project name</th>
            <th style={{ padding: "6px 10px" }}>Work hours</th>
            <th style={{ padding: "6px 10px" }}>Salary (VND)</th>
          </tr>
        </thead>
        <tbody>
          {works.map((w) => (
            <tr key={w.id}>
              <td style={{ padding: "6px 10px" }}>{w.id}</td>
              <td style={{ padding: "6px 10px" }}>{getProjectName(w.proId)}</td>
              <td style={{ padding: "6px 10px" }}>{w.workHours}</td>
              <td style={{ padding: "6px 10px" }}>
                {formatVND(calcSalary(empSalary, w.workHours))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "8px",
          backgroundColor: "#0d6efd",
          color: "white",
          padding: "6px 12px",
          borderRadius: "4px",
          display: "inline-block",
        }}
      >
        Projects Salary: {formatVND(totalSalary)} VND
      </div>
    </>
  );
}

export default ProjectTable;
