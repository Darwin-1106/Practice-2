import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DepartmentList from "./component/DepartmentList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DepartmentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
