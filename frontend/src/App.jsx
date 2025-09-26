import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import EmployeeDetails from "./pages/EmployeeDetails";
import EmployeeManagementApp from "./components/EmployeeManagementApp";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="employee" />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
