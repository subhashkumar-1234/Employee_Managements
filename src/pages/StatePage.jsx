import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const StatePage = () => {
  const { states, countries, addState, editState, deleteState } = useContext(AppContext);
  const [stateName, setStateName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!stateName.trim() || !countryId) return;

    if (editId !== null) {
      editState(editId, stateName.trim(), countryId);
      setEditId(null);
    } else {
      addState(stateName.trim(), countryId);
    }
    setStateName('');
    setCountryId('');
  };

  const handleEditClick = (st) => {
    setEditId(st.id);
    setStateName(st.name);
    setCountryId(st.countryId.toString());
  };

  const handleReset = () => {
    setStateName('');
    setCountryId('');
    setEditId(null);
  };

  // Find country name for listing
  const getCountryName = (cid) => {
    const country = countries.find((c) => c.id === cid);
    return country ? country.name : 'Unknown Country';
  };

  return (
    <div className="view-container">
      <h1 className="view-title">Manage States</h1>

      <form onSubmit={handleSubmit} className="view-form">
        <div className="form-group-row">
          <div className="form-group flex-1">
            <select
              className="form-control"
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
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
            <input
              type="text"
              className="form-control"
              placeholder="Enter State Name"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={!countryId || !stateName.trim()}>
            {editId !== null ? 'Update State' : 'Add State'}
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
              <th style={{ width: '10%' }}>Id</th>
              <th style={{ width: '35%' }}>State Name</th>
              <th style={{ width: '35%' }}>Country</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {states.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No states added yet.</td>
              </tr>
            ) : (
              states.map((st) => (
                <tr key={st.id}>
                  <td>{st.id}</td>
                  <td>{st.name}</td>
                  <td>{getCountryName(st.countryId)}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(st)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteState(st.id)}
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

export default StatePage;
