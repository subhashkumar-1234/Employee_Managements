import React, { createContext, useState, useEffect } from 'react';
import api from '../Api/axios';

export const AppContext = createContext();

const initialLanguages = [
  { id: 1, name: 'English' },
  { id: 2, name: 'Hindi' },
  { id: 3, name: 'Spanish' }
];

const initialCountries = [
  { id: 1, name: 'India' },
  { id: 2, name: 'United States' },
  { id: 3, name: 'Spain' }
];

const initialStates = [
  { id: 1, name: 'Delhi', countryId: 1 },
  { id: 2, name: 'Maharashtra', countryId: 1 },
  { id: 3, name: 'California', countryId: 2 },
  { id: 4, name: 'Madrid', countryId: 3 }
];

const initialDistricts = [
  { id: 1, name: 'Central Delhi', stateId: 1 },
  { id: 2, name: 'Mumbai City', stateId: 2 },
  { id: 3, name: 'Los Angeles', stateId: 3 },
  { id: 4, name: 'Chamberí', stateId: 4 }
];

const initialEmployees = [
  { id: 1, name: 'Rahul Verma', email: 'rahul@example.com', phone: '9876543210', countryId: 1, stateId: 1, districtId: 1 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '5550199', countryId: 2, stateId: 3, districtId: 3 }
];

export const AppProvider = ({ children }) => {
  // State initialization with localStorage fallback
  const [languages, setLanguages] = useState(() => {
    const saved = localStorage.getItem('dashboard_languages');
    return saved ? JSON.parse(saved) : initialLanguages;
  });

  const [countries, setCountries] = useState([]);

  const [states, setStates] = useState([]);

  const [districts, setDistricts] = useState([]);

  const [employees, setEmployees] = useState([]);

  // Fetch countries, states, districts, and employees from API on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get('/Country');
        const mapped = response.data.map((c) => ({
          id: c.id,
          name: c.countryName
        }));
        setCountries(mapped);
      } catch (error) {
        console.error('Error fetching countries from API:', error);
      }
    };

    const fetchStates = async () => {
      try {
        const response = await api.get('/State');
        const mapped = response.data.map((s) => ({
          id: s.id,
          name: s.stateName,
          countryId: s.countryId
        }));
        setStates(mapped);
      } catch (error) {
        console.error('Error fetching states from API:', error);
      }
    };

    const fetchDistricts = async () => {
      try {
        const response = await api.get('/District');
        const mapped = response.data.map((d) => ({
          id: d.id,
          name: d.districtName,
          stateId: d.stateId
        }));
        setDistricts(mapped);
      } catch (error) {
        console.error('Error fetching districts from API:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await api.get('/Employee');
        const mapped = response.data.map((e) => ({
          id: e.id,
          name: e.fullName,
          email: e.email,
          phone: e.phone,
          countryId: e.countryId,
          stateId: e.stateId,
          districtId: e.districtId
        }));
        setEmployees(mapped);
      } catch (error) {
        console.error('Error fetching employees from API:', error);
      }
    };

    fetchCountries();
    fetchStates();
    fetchDistricts();
    fetchEmployees();
  }, []);

  // Keep state synced to localStorage
  useEffect(() => {
    localStorage.setItem('dashboard_languages', JSON.stringify(languages));
  }, [languages]);



  // Language CRUD
  const addLanguage = (name) => {
    setLanguages((prev) => [
      ...prev,
      { id: prev.length > 0 ? Math.max(...prev.map((l) => l.id)) + 1 : 1, name }
    ]);
  };

  const editLanguage = (id, newName) => {
    setLanguages((prev) =>
      prev.map((lang) => (lang.id === id ? { ...lang, name: newName } : lang))
    );
  };

  const deleteLanguage = (id) => {
    setLanguages((prev) => prev.filter((lang) => lang.id !== id));
  };

  const formatError = (error) => {
    if (error.response?.data) {
      return typeof error.response.data === 'object'
        ? JSON.stringify(error.response.data)
        : error.response.data;
    }
    return error.message;
  };

  // Country CRUD
  const addCountry = async (name) => {
    try {
      const response = await api.post('/Country', { CountryName: name });
      const newCountry = {
        id: response.data.id || response.data.Id,
        name: response.data.countryName || response.data.CountryName
      };
      setCountries((prev) => [...prev, newCountry]);
    } catch (error) {
      console.error('Error adding country:', error);
      alert('Error adding country: ' + formatError(error));
    }
  };

  const editCountry = async (id, newName) => {
    try {
      await api.put(`/Country/${Number(id)}`, { Id: Number(id), CountryName: newName });
      setCountries((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: newName } : c))
      );
    } catch (error) {
      console.error('Error editing country:', error);
      alert('Error editing country: ' + formatError(error));
    }
  };

  const deleteCountry = async (id) => {
    try {
      await api.delete(`/Country/${Number(id)}`);
      setCountries((prev) => prev.filter((c) => c.id !== id));
      // Cascade delete states
      setStates((prev) => prev.filter((s) => s.countryId !== id));
    } catch (error) {
      console.error('Error deleting country:', error);
      alert('Could not delete country: ' + formatError(error));
    }
  };

  // State CRUD
  const addState = async (name, countryId) => {
    try {
      const response = await api.post('/State', { StateName: name, CountryId: Number(countryId) });
      const newState = {
        id: response.data.id || response.data.Id,
        name: response.data.stateName || response.data.StateName,
        countryId: response.data.countryId || response.data.CountryId
      };
      setStates((prev) => [...prev, newState]);
    } catch (error) {
      console.error('Error adding state:', error);
      alert('Error adding state: ' + formatError(error));
    }
  };

  const editState = async (id, newName, countryId) => {
    try {
      await api.put(`/State/${Number(id)}`, { Id: Number(id), StateName: newName, CountryId: Number(countryId) });
      setStates((prev) =>
        prev.map((s) => (s.id === id ? { ...s, name: newName, countryId: Number(countryId) } : s))
      );
    } catch (error) {
      console.error('Error editing state:', error);
      alert('Error editing state: ' + formatError(error));
    }
  };

  const deleteState = async (id) => {
    try {
      await api.delete(`/State/${Number(id)}`);
      setStates((prev) => prev.filter((s) => s.id !== id));
      // Cascade delete districts
      setDistricts((prev) => prev.filter((d) => d.stateId !== id));
    } catch (error) {
      console.error('Error deleting state:', error);
      alert('Could not delete state: ' + formatError(error));
    }
  };

  // District CRUD
  const addDistrict = async (name, stateId) => {
    try {
      const response = await api.post('/District', { DistrictName: name, StateId: Number(stateId) });
      const newDistrict = {
        id: response.data.id || response.data.Id,
        name: response.data.districtName || response.data.DistrictName,
        stateId: response.data.stateId || response.data.StateId
      };
      setDistricts((prev) => [...prev, newDistrict]);
    } catch (error) {
      console.error('Error adding district:', error);
      alert('Error adding district: ' + formatError(error));
    }
  };

  const editDistrict = async (id, newName, stateId) => {
    try {
      await api.put(`/District/${Number(id)}`, { Id: Number(id), DistrictName: newName, StateId: Number(stateId) });
      setDistricts((prev) =>
        prev.map((d) => (d.id === id ? { ...d, name: newName, stateId: Number(stateId) } : d))
      );
    } catch (error) {
      console.error('Error editing district:', error);
      alert('Error editing district: ' + formatError(error));
    }
  };

  const deleteDistrict = async (id) => {
    try {
      await api.delete(`/District/${Number(id)}`);
      setDistricts((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error('Error deleting district:', error);
      alert('Could not delete district: ' + formatError(error));
    }
  };

  // Employee CRUD
  const addEmployee = async (name, email, phone, countryId, stateId, districtId) => {
    try {
      const response = await api.post('/Employee', {
        FullName: name,
        Email: email,
        Phone: phone,
        CountryId: Number(countryId),
        StateId: Number(stateId),
        DistrictId: Number(districtId)
      });
      const newEmployee = {
        id: response.data.id || response.data.Id,
        name: response.data.fullName || response.data.FullName,
        email: response.data.email || response.data.Email,
        phone: response.data.phone || response.data.Phone,
        countryId: response.data.countryId || response.data.CountryId,
        stateId: response.data.stateId || response.data.StateId,
        districtId: response.data.districtId || response.data.DistrictId
      };
      setEmployees((prev) => [...prev, newEmployee]);
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee: ' + formatError(error));
    }
  };

  const editEmployee = async (id, name, email, phone, countryId, stateId, districtId) => {
    try {
      await api.put(`/Employee/${Number(id)}`, {
        Id: Number(id),
        FullName: name,
        Email: email,
        Phone: phone,
        CountryId: Number(countryId),
        StateId: Number(stateId),
        DistrictId: Number(districtId)
      });
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === id
            ? {
                ...emp,
                name,
                email,
                phone,
                countryId: Number(countryId),
                stateId: Number(stateId),
                districtId: Number(districtId)
              }
            : emp
        )
      );
    } catch (error) {
      console.error('Error editing employee:', error);
      alert('Error editing employee: ' + formatError(error));
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/Employee/${Number(id)}`);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee: ' + formatError(error));
    }
  };

  return (
    <AppContext.Provider
      value={{
        languages,
        addLanguage,
        editLanguage,
        deleteLanguage,
        countries,
        addCountry,
        editCountry,
        deleteCountry,
        states,
        addState,
        editState,
        deleteState,
        districts,
        addDistrict,
        editDistrict,
        deleteDistrict,
        employees,
        addEmployee,
        editEmployee,
        deleteEmployee
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
