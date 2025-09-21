import EmployeeModel from "../models/employess.model.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, phone, department, salary } = req.body;
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  // Basic validation
  if (!name || !email || !phone || !department || !salary) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  // Check if employee with same email already exists
  const existing = await EmployeeModel.findOne({ email });
  if (existing) {
    return res.status(409).json({
      message: "Employee with this email already exists",
      success: false,
    });
  }

  // Handle Cloudinary image (if uploaded)
  const profileImage = req?.file?.path || null;

  // Create employee
  const newEmployee = new EmployeeModel({
    name,
    email,
    phone,
    department,
    salary,
    profileImage,
  });

  await newEmployee.save();

  res.status(201).json({
    message: "Employee created successfully",
    success: true,
    employee: newEmployee,
  });
});

export const getAllEmployees = asyncHandler(async (req, res) => {
  const allEmployees = await EmployeeModel.find({});

  res.status(200).json({
    message: "All employees fetched successfully",
    success: true,
    employees: allEmployees,
  });
});

export const getEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Employee ID is required",
      success: false,
    });
  }

  const employee = await EmployeeModel.findById(id);

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
      success: false,
    });
  }

  res.status(200).json({
    message: "Employee fetched successfully",
    success: true,
    employee: employee,
  });
});

export const deleteEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Employee ID is required",
      success: false,
    });
  }

  const employee = await EmployeeModel.findByIdAndDelete(id);

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
      success: false,
    });
  }

  res.status(200).json({
    message: "Employee deleted successfully",
    success: true,
    employee: employee,
  });
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Employee ID is required",
      success: false,
    });
  }

  const employee = await EmployeeModel.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
      success: false,
    });
  }

  res.status(200).json({
    message: "Employee updated successfully",
    success: true,
    employee: employee,
  });
});
