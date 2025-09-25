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
  let { page, limit, search } = req.query;

  // Parse page and limit to integers
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  const skip = (page - 1) * limit;

  // Build search filter
  let searchFilter = {};
  if (search) {
    searchFilter = {
      name: {
        $regex: search,
        $options: "i", // case-insensitive match
      },
    };
  }

  // Get total matching employees count
  const totalEmployees = await EmployeeModel.countDocuments(searchFilter);

  // Handle edge case: page exceeds total employees
  if (skip >= totalEmployees && totalEmployees !== 0) {
    return res.status(200).json({
      message: "No employees found for this page.",
      success: true,
      data: {
        employees: [],
        pagination: {
          totalEmployees,
          totalPages: Math.ceil(totalEmployees / limit),
          currentPage: page,
          pageSize: limit,
        },
      },
    });
  }

  // Fetch employees with pagination
  const employees = await EmployeeModel.find(searchFilter)
    .skip(skip)
    .limit(limit)
    .sort({ updatedAt: -1 });

  // Calculate total pages
  const totalPages = Math.ceil(totalEmployees / limit);

 
  res.status(200).json({
    message: "All employees fetched successfully",
    success: true,
    data: {
      employees,
      pagination: {
        totalEmployees, 
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    },
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
