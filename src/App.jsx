import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import LanguagePage from './pages/LanguagePage';
import CountryPage from './pages/CountryPage';
import StatePage from './pages/StatePage';
import DistrictPage from './pages/DistrictPage';
import EmployeePage from './pages/EmployeePage';
import ImageUploadPage from './pages/ImageUploadPage';
import RadioButtonPage from './pages/RadioButtonPage';
import SearchingPage from './pages/SearchingPage';
import PaginationPage from './pages/PaginationPage';
import ExportCsvPage from './pages/ExportCsvPage';
import CheckboxPage from './pages/CheckboxPage';
import './App.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState('language');

  // Map active tab to component view
  const renderView = () => {
    switch (activeTab) {
      case 'language':
        return <LanguagePage />;
      case 'country':
        return <CountryPage />;
      case 'state':
        return <StatePage />;
      case 'district':
        return <DistrictPage />;
      case 'employee':
        return <EmployeePage />;
      case 'image-upload':
        return <ImageUploadPage />;
      case 'radio-button':
        return <RadioButtonPage />;
      case 'searching':
        return <SearchingPage />;
      case 'pagination':
        return <PaginationPage />;
      case 'export-csv':
        return <ExportCsvPage />;
      case 'checkbox':
        return <CheckboxPage />;
      default:
        return <LanguagePage />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
