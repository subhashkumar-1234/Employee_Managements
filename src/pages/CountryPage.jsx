import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCountries,
  addCountryState,
  editCountryState,
  deleteCountryState
} from '../redux/countriesSlice';
import api from '../Api/axios';

const CountryPage = () => {
  const countries = useSelector((state) => state.countries.list);
  const dispatch = useDispatch();
  const [countryName, setCountryName] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch countries from API on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get('/Country');
        const mapped = response.data.map((c) => ({
          id: c.id,
          name: c.countryName
        }));
        dispatch(setCountries(mapped));
      } catch (error) {
        console.error('Error fetching countries from API:', error);
      }
    };
    fetchCountries();
  }, [dispatch]);

  const formatError = (error) => {
    if (error.response?.data) {
      return typeof error.response.data === 'object'
        ? JSON.stringify(error.response.data)
        : error.response.data;
    }
    return error.message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!countryName.trim()) return;

    if (editId !== null) {
      try {
        await api.put(`/Country/${Number(editId)}`, { Id: Number(editId), CountryName: countryName.trim() });
        dispatch(editCountryState({ id: editId, name: countryName.trim() }));
        setEditId(null);
      } catch (error) {
        console.error('Error editing country:', error);
        alert('Error editing country: ' + formatError(error));
      }
    } else {
      try {
        const response = await api.post('/Country', { CountryName: countryName.trim() });
        const newCountry = {
          id: response.data.id || response.data.Id,
          name: response.data.countryName || response.data.CountryName
        };
        dispatch(addCountryState(newCountry));
      } catch (error) {
        console.error('Error adding country:', error);
        alert('Error adding country: ' + formatError(error));
      }
    }
    setCountryName('');
  };

  const handleEditClick = (c) => {
    setEditId(c.id);
    setCountryName(c.name);
  };

  const handleReset = () => {
    setCountryName('');
    setEditId(null);
  };

  const handleDeleteClick = async (id) => {
    try {
      await api.delete(`/Country/${Number(id)}`);
      dispatch(deleteCountryState(id));
    } catch (error) {
      console.error('Error deleting country:', error);
      alert('Could not delete country: ' + formatError(error));
    }
  };

  return (
    <div className="view-container">
      <h1 className="view-title">Manage Countries</h1>

      <form onSubmit={handleSubmit} className="view-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Country Name"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editId !== null ? 'Update Country' : 'Add Country'}
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
              <th style={{ width: '60%' }}>Name</th>
              <th style={{ width: '30%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No countries added yet.</td>
              </tr>
            ) : (
              countries.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteClick(c.id)}
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

export default CountryPage;

