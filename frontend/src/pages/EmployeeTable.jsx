import { Link } from "react-router-dom";
import { deleteEmployeeById } from "../utils/api";
import { notify } from "../utils/toast.util";

function EmployeeTable({
  employees = [],
  pagination = { currentPage: 1, totalPages: 1 },
  fetchEmployees,
  handleUpdateEmployee,
}) {
  const headers = ["Name", "Email", "Phone", "Department", "Actions"];
  const { currentPage = 1, totalPages = 1 } = pagination;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handlePagination = (page) => {
    fetchEmployees("", page, 5);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const { success, message } = await deleteEmployeeById(id);
      if (success) {
        notify(message, "success");
        fetchEmployees();
      } else {
        notify(message || "Failed to delete employee", "error");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to delete Employee", "error");
    }
  };

 const TableRow = ({ employee }) => (
  <tr>
    <td>
      <Link
        to={`/employee/${employee._id}`}
        className="text-decoration-none"
      >
        {employee.name}
      </Link>
    </td>
    <td>{employee.email}</td>
    <td>{employee.phone}</td>
    <td>{employee.department}</td>
    <td>
      <button
        className="btn btn-sm btn-outline-warning me-2"
        onClick={() => handleUpdateEmployee(employee)}
        title="Edit"
      >
        <i className="bi bi-pencil-fill me-1"></i>
        Edit
      </button>

      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => handleDeleteEmployee(employee._id)}
        title="Delete"
      >
        <i className="bi bi-trash-fill me-1"></i>
        Delete
      </button>
    </td>
  </tr>
);


  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center text-muted">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((emp) => <TableRow employee={emp} key={emp._id} />)
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <span className="badge bg-primary">
          Page {currentPage} of {totalPages}
        </span>

        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`btn btn-outline-primary me-1 ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="btn btn-outline-primary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeTable;
