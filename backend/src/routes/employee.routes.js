import express from "express";
import cloudinaryFileUploader from "../middleware/fileUpload.middleware.js";
import { createEmployee, deleteEmployeeById, getAllEmployees, getEmployeeById, updateEmployee } from "../controller/employee.controllers.js";
 
const employeeRouter = express.Router();

employeeRouter.post("/register", cloudinaryFileUploader.single('profileImage'), createEmployee);  
employeeRouter.get("/all-employees", getAllEmployees);  
employeeRouter.get("/get-employeesby/:id", getEmployeeById);  
employeeRouter.delete("/delete-employees/:id", deleteEmployeeById);  
employeeRouter.put("/update-employees/:id", updateEmployee);  
 
export default employeeRouter;
