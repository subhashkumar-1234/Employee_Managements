import React, { useState, useMemo } from 'react';

const mockEmployees = [
  { id: 1, name: 'Amit Sharma', email: 'amit@example.com', dept: 'Engineering', city: 'Mumbai' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', dept: 'Design', city: 'Delhi' },
  { id: 3, name: 'John Doe', email: 'john@example.com', dept: 'Engineering', city: 'New York' },
  { id: 4, name: 'Sarah Connor', email: 'sarah@example.com', dept: 'Sales', city: 'Los Angeles' },
  { id: 5, name: 'Rajesh Kumar', email: 'rajesh@example.com', dept: 'HR', city: 'Bangalore' },
  { id: 6, name: 'Sofia Lopez', email: 'sofia@example.com', dept: 'Design', city: 'Madrid' },
  { id: 7, name: 'Neha Gupta', email: 'neha@example.com', dept: 'Marketing', city: 'Delhi' },
  { id: 8, name: 'David Miller', email: 'david@example.com', dept: 'Sales', city: 'Chicago' },
  { id: 9, name: 'Vikram Singh', email: 'vikram@example.com', dept: 'Engineering', city: 'Pune' },
  { id: 10, name: 'Elena Rostova', email: 'elena@example.com', dept: 'HR', city: 'Moscow' },
];

const SearchingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Filter items
  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = selectedDept === 'All' || emp.dept === selectedDept;

      return matchesSearch && matchesDept;
    });
  }, [searchTerm, selectedDept]);

  const departments = ['All', 'Engineering', 'Design', 'Sales', 'HR', 'Marketing'];

  return (
    <div className="view-container">
      <h1 className="view-title">Search & Filter Directory</h1>
      <p className="view-description">
        Instantly search across employee names, emails, cities, or filter by specific department categories.
      </p>

      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by name, email, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-dropdown-wrapper">
          <select
            className="form-control filter-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept} Department
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="search-meta">
        Found <strong className="text-highlight">{filteredEmployees.length}</strong> matching records out of {mockEmployees.length}.
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '30%' }}>Name</th>
              <th style={{ width: '30%' }}>Email Address</th>
              <th style={{ width: '15%' }}>Department</th>
              <th style={{ width: '15%' }}>City</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center search-empty">No results found matching your search.</td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="search-row">
                  <td>{emp.id}</td>
                  <td>
                    <span className="emp-name">{emp.name}</span>
                  </td>
                  <td>{emp.email}</td>
                  <td>
                    <span className={`badge-dept ${emp.dept.toLowerCase()}`}>{emp.dept}</span>
                  </td>
                  <td>{emp.city}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchingPage;
