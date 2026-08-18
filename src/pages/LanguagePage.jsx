import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const LanguagePage = () => {
  const { languages, addLanguage, editLanguage, deleteLanguage } = useContext(AppContext);
  const [langName, setLangName] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!langName.trim()) return;

    if (editId !== null) {
      editLanguage(editId, langName.trim());
      setEditId(null);
    } else {
      addLanguage(langName.trim());
    }
    setLangName('');
  };

  const handleEditClick = (lang) => {
    setEditId(lang.id);
    setLangName(lang.name);
  };

  const handleReset = () => {
    setLangName('');
    setEditId(null);
  };

  return (
    <div className="view-container">
      <h1 className="view-title">Manage Languages</h1>

      <form onSubmit={handleSubmit} className="view-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Language Name"
            value={langName}
            onChange={(e) => setLangName(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editId !== null ? 'Update Language' : 'Add Language'}
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
            {languages.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No languages added yet.</td>
              </tr>
            ) : (
              languages.map((lang) => (
                <tr key={lang.id}>
                  <td>{lang.id}</td>
                  <td>{lang.name}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(lang)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteLanguage(lang.id)}
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

export default LanguagePage;
