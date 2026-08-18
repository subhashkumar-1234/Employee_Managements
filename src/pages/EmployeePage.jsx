import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const EmployeePage = () => {
  const {
    employees,
    addEmployee,
    editEmployee,
    deleteEmployee,
    countries,
    states,
    districts
  } = useContext(AppContext);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryId, setCountryId] = useState('');
  const [stateId, setStateId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [editId, setEditId] = useState(null);

  // Filtered dropdown selections
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  // Dynamically filter states when country changes
  useEffect(() => {
    if (countryId) {
      const filtered = states.filter((s) => s.countryId === Number(countryId));
      setFilteredStates(filtered);
    } else {
      setFilteredStates([]);
    }
  }, [countryId, states]);

  // Dynamically filter districts when state changes
  useEffect(() => {
    if (stateId) {
      const filtered = districts.filter((d) => d.stateId === Number(stateId));
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  }, [stateId, districts]);

  const handleCountryChange = (e) => {
    setCountryId(e.target.value);
    setStateId('');      // Clear state when country changes
    setDistrictId('');   // Clear district when country changes
  };

  const handleStateChange = (e) => {
    setStateId(e.target.value);
    setDistrictId('');   // Clear district when state changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !countryId || !stateId || !districtId) return;

    if (editId !== null) {
      editEmployee(editId, name.trim(), email.trim(), phone.trim(), countryId, stateId, districtId);
      setEditId(null);
    } else {
      addEmployee(name.trim(), email.trim(), phone.trim(), countryId, stateId, districtId);
    }

    handleReset();
  };

  const handleEditClick = (emp) => {
    setEditId(emp.id);
    setName(emp.name);
    setEmail(emp.email);
    setPhone(emp.phone);
    setCountryId(emp.countryId.toString());
    
    // We need to set state and district, but since filtered lists depend on useEffect,
    // we set them directly so that they are selected correctly in the DOM.
    setStateId(emp.stateId.toString());
    setDistrictId(emp.districtId.toString());
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCountryId('');
    setStateId('');
    setDistrictId('');
    setEditId(null);
  };

  // Helper resolvers for table display
  const resolveLocation = (emp) => {
    const country = countries.find((c) => c.id === emp.countryId);
    const state = states.find((s) => s.id === emp.stateId);
    const district = districts.find((d) => d.id === emp.districtId);

    const dName = district ? district.name : 'Unknown District';
    const sName = state ? state.name : 'Unknown State';
    const cName = country ? country.name : 'Unknown Country';

    return `${dName}, ${sName}, ${cName}`;
  };

  return (
    <div className="view-container">
      <h1 className="view-title">Manage Employees</h1>
      <p className="view-description">
        Create, edit, and delete employee profiles with connected location relationships.
      </p>

      <form onSubmit={handleSubmit} className="view-form">
        <div className="form-group-row">
          <div className="form-group flex-1">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Employee Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group flex-1">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group flex-1">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group flex-1">
            <label className="form-label">Country</label>
            <select
              className="form-control"
              value={countryId}
              onChange={handleCountryChange}
              required
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group flex-1">
            <label className="form-label">State</label>
            <select
              className="form-control"
              value={stateId}
              onChange={handleStateChange}
              disabled={!countryId}
              required
            >
              <option value="">Select State</option>
              {filteredStates.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group flex-1">
            <label className="form-label">District</label>
            <select
              className="form-control"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              disabled={!stateId}
              required
            >
              <option value="">Select District</option>
              {filteredDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!name.trim() || !email.trim() || !phone.trim() || !countryId || !stateId || !districtId}
          >
            {editId !== null ? 'Update Employee' : 'Add Employee'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '8%' }}>Id</th>
              <th style={{ width: '25%' }}>Employee Details</th>
              <th style={{ width: '17%' }}>Phone</th>
              <th style={{ width: '35%' }}>Location hierarchy</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No employee records added yet.</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{emp.name}</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{emp.email}</div>
                  </td>
                  <td>{emp.phone}</td>
                  <td>
                    <span style={{ fontSize: '0.9rem' }}>{resolveLocation(emp)}</span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePage;
