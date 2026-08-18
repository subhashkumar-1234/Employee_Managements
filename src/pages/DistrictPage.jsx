import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const DistrictPage = () => {
  const { districts, states, countries, addDistrict, editDistrict, deleteDistrict } = useContext(AppContext);
  const [districtName, setDistrictName] = useState('');
  const [stateId, setStateId] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!districtName.trim() || !stateId) return;

    if (editId !== null) {
      editDistrict(editId, districtName.trim(), stateId);
      setEditId(null);
    } else {
      addDistrict(districtName.trim(), stateId);
    }
    setDistrictName('');
    setStateId('');
  };

  const handleEditClick = (dist) => {
    setEditId(dist.id);
    setDistrictName(dist.name);
    setStateId(dist.stateId.toString());
  };

  const handleReset = () => {
    setDistrictName('');
    setStateId('');
    setEditId(null);
  };

  // Find state and country details for listing
  const getStateDetails = (sid) => {
    const stateObj = states.find((s) => s.id === sid);
    if (!stateObj) return { stateName: 'Unknown State', countryName: 'Unknown Country' };

    const countryObj = countries.find((c) => c.id === stateObj.countryId);
    return {
      stateName: stateObj.name,
      countryName: countryObj ? countryObj.name : 'Unknown Country'
    };
  };

  return (
    <div className="view-container">
      <h1 className="view-title">Manage Districts</h1>

      <form onSubmit={handleSubmit} className="view-form">
        <div className="form-group-row">
          <div className="form-group flex-1">
            <select
              className="form-control"
              value={stateId}
              onChange={(e) => setStateId(e.target.value)}
            >
              <option value="">Select State</option>
              {states.map((s) => {
                const countryObj = countries.find((c) => c.id === s.countryId);
                const countryLabel = countryObj ? ` (${countryObj.name})` : '';
                return (
                  <option key={s.id} value={s.id}>
                    {s.name}{countryLabel}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group flex-1">
            <input
              type="text"
              className="form-control"
              placeholder="Enter District Name"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={!stateId || !districtName.trim()}>
            {editId !== null ? 'Update District' : 'Add District'}
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
              <th style={{ width: '30%' }}>District Name</th>
              <th style={{ width: '25%' }}>State</th>
              <th style={{ width: '20%' }}>Country</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {districts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No districts added yet.</td>
              </tr>
            ) : (
              districts.map((dist) => {
                const { stateName, countryName } = getStateDetails(dist.stateId);
                return (
                  <tr key={dist.id}>
                    <td>{dist.id}</td>
                    <td>{dist.name}</td>
                    <td>{stateName}</td>
                    <td>{countryName}</td>
                    <td className="actions-cell">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditClick(dist)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => deleteDistrict(dist.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistrictPage;
