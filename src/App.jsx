import React, { useState } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <div>
        <h1>🌾 Farm Employee Directory</h1>
        <p>Employee Information Management System</p>
      </div>
    </header>
  );
}

function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="employee-card">
      <div className="employee-top">
        <div className="avatar">
          {employee.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2>{employee.name}</h2>
          <span className="employee-id">
            ID: {employee.employeeId}
          </span>
        </div>
      </div>

      <div className="employee-details">
        <div>
          <span>Department</span>
          <strong>{employee.department}</strong>
        </div>

        <div>
          <span>Gender</span>
          <strong>{employee.gender}</strong>
        </div>

        <div>
          <span>Phone</span>
          <strong>{employee.phone}</strong>
        </div>

        <div>
          <span>Local Address</span>
          <strong>{employee.localAddress}</strong>
        </div>

        <div>
          <span>Permanent Address</span>
          <strong>{employee.permanentAddress}</strong>
        </div>
      </div>

      <div className="card-buttons">
        <button
          className="edit-btn"
          onClick={() => onEdit(employee)}
        >
          ✏️ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(employee.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

function EmployeeForm({
  formData,
  setFormData,
  onSubmit,
  editingId,
  onCancel,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>
          {editingId ? "✏️ Edit Employee" : "➕ Add Employee"}
        </h2>

        <p>
          {editingId
            ? "Update employee information"
            : "Enter employee information"}
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="input-group">
            <label>Employee Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter employee name"
              required
            />
          </div>

          <div className="input-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter employee ID"
              required
            />
          </div>

          <div className="input-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Animal Husbandry">
                Animal Husbandry
              </option>
              <option value="Irrigation">Irrigation</option>
              <option value="Farm Management">
                Farm Management
              </option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="input-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="input-group">
            <label>Local Address</label>
            <input
              type="text"
              name="localAddress"
              value={formData.localAddress}
              onChange={handleChange}
              placeholder="Enter local address"
              required
            />
          </div>

          <div className="input-group full-width">
            <label>Permanent Address</label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              placeholder="Enter permanent address"
              rows="3"
              required
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {editingId ? "💾 Update Employee" : "➕ Add Employee"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Das",
      employeeId: "EMP001",
      department: "Agriculture",
      gender: "Male",
      phone: "9876543210",
      localAddress: "Kolkata",
      permanentAddress: "Bardhaman, West Bengal",
    },
    {
      id: 2,
      name: "Priya Sharma",
      employeeId: "EMP002",
      department: "Farm Management",
      gender: "Female",
      phone: "9876543211",
      localAddress: "Howrah",
      permanentAddress: "Durgapur, West Bengal",
    },
    {
      id: 3,
      name: "Amit Roy",
      employeeId: "EMP003",
      department: "Irrigation",
      gender: "Male",
      phone: "9876543212",
      localAddress: "Kalyani",
      permanentAddress: "Nadia, West Bengal",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    gender: "",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  // Add / Update Employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId
            ? {
                ...employee,
                ...formData,
              }
            : employee
        )
      );

      setEditingId(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        ...formData,
      };

      setEmployees([...employees, newEmployee]);
    }

    setFormData({
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });
  };

  // Delete Employee
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter((employee) => employee.id !== id)
      );
    }
  };

  // Edit Employee
  const handleEdit = (employee) => {
    setEditingId(employee.id);

    setFormData({
      name: employee.name,
      employeeId: employee.employeeId,
      department: employee.department,
      gender: employee.gender,
      phone: employee.phone,
      localAddress: employee.localAddress,
      permanentAddress: employee.permanentAddress,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel Editing
  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });
  };

  // Search + Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(searchText) ||
      employee.employeeId.toLowerCase().includes(searchText) ||
      employee.department.toLowerCase().includes(searchText);

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="app">
      <Header />

      <main className="container">

        {/* Employee Count */}
        <div className="dashboard">
          <div className="count-card">
            <div className="count-icon">👥</div>

            <div>
              <span>Total Employees</span>
              <h2>{employees.length}</h2>
            </div>
          </div>

          <div className="count-card">
            <div className="count-icon">🔍</div>

            <div>
              <span>Showing</span>
              <h2>{filteredEmployees.length}</h2>
            </div>
          </div>
        </div>

        {/* Employee Form */}
        <EmployeeForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          editingId={editingId}
          onCancel={handleCancel}
        />

        {/* Search and Filter */}
        <div className="filter-section">
          <div className="search-box">
            <label>Search Employee</label>

            <input
              type="text"
              placeholder="Search by name, ID or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="department-box">
            <label>Department Filter</label>

            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(e.target.value)
              }
            >
              <option value="All">All Departments</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Animal Husbandry">
                Animal Husbandry
              </option>
              <option value="Irrigation">Irrigation</option>
              <option value="Farm Management">
                Farm Management
              </option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Employee List */}
        <div className="list-header">
          <div>
            <h2>Employee Directory</h2>
            <p>Manage all farm employees</p>
          </div>

          <span className="result-count">
            {filteredEmployees.length} Employees
          </span>
        </div>

        {filteredEmployees.length > 0 ? (
          <div className="employee-grid">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="no-data">
            <div>🔎</div>
            <h2>No Employees Found</h2>
            <p>
              Try changing your search or department filter.
            </p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          © 2026 Farm Employee Directory | React Assignment 3
        </p>
      </footer>
    </div>
  );
}

export default App;