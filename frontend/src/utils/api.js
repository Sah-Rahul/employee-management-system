const BASE_URL = "http://localhost:4000";

// Get all employees with search and pagination
export const getAllEmployees = async (search = "", page = 1, limit = 5) => {
  try {
    const url = `${BASE_URL}/api/v1/employee/all-employees?search=${search}&page=${page}&limit=${limit}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return { success: false, error: error.message };
  }
};

export const getEmployeeDetailsById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/employees/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return { success: false, error: error.message };
  }
};

export const deleteEmployeeById = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/employee/delete-employees/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    return { success: false, error: error.message };
  }
};

// Create Employee
export const createEmployee = async (employeeData) => {
  try {
    const formData = new FormData();
    Object.keys(employeeData).forEach((key) => {
      if (employeeData[key] !== null) {
        formData.append(key, employeeData[key]);
      }
    });

    const response = await fetch(`${BASE_URL}/api/v1/employee/register`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating employee:", error);
    return { success: false, error: error.message };
  }
};

// Update Employee
export const updateEmployeeById = async (id, updatedData) => {
  try {
    const formData = new FormData();
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] !== null) {
        formData.append(key, updatedData[key]);
      }
    });

    const response = await fetch(
      `${BASE_URL}/api/v1/employee/update-employees/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating employee:", error);
    return { success: false, error: error.message };
  }
};
