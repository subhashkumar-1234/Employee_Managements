import React, { useState } from 'react';

const RadioButtonPage = () => {
  const [framework, setFramework] = useState('React');
  const [experience, setExperience] = useState('Intermediate');
  const [theme, setTheme] = useState('Glassmorphism');

  const frameworks = ['React', 'Angular', 'Vue', 'Svelte'];
  const experiences = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const themes = ['Light Theme', 'Dark Theme', 'Cyberpunk', 'Glassmorphism'];

  return (
    <div className="view-container">
      <h1 className="view-title">Radio Button Demonstrations</h1>
      <p className="view-description">
        Below are interactive radio button groups showing how selection states update active styles dynamically.
      </p>

      <div className="radio-grid">
        {/* Group 1: Frameworks */}
        <div className="radio-card">
          <h3 className="radio-card-title">Favorite Framework</h3>
          <div className="radio-group">
            {frameworks.map((fw) => (
              <label key={fw} className={`radio-label ${framework === fw ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="framework"
                  value={fw}
                  checked={framework === fw}
                  onChange={(e) => setFramework(e.target.value)}
                  className="radio-input"
                />
                <span className="custom-radio"></span>
                {fw}
              </label>
            ))}
          </div>
        </div>

        {/* Group 2: Experience level */}
        <div className="radio-card">
          <h3 className="radio-card-title">Experience Level</h3>
          <div className="radio-group">
            {experiences.map((exp) => (
              <label key={exp} className={`radio-label ${experience === exp ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="experience"
                  value={exp}
                  checked={experience === exp}
                  onChange={(e) => setExperience(e.target.value)}
                  className="radio-input"
                />
                <span className="custom-radio"></span>
                {exp}
              </label>
            ))}
          </div>
        </div>

        {/* Group 3: Themes */}
        <div className="radio-card">
          <h3 className="radio-card-title">UI Design Style</h3>
          <div className="radio-group">
            {themes.map((th) => (
              <label key={th} className={`radio-label ${theme === th ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="theme"
                  value={th}
                  checked={theme === th}
                  onChange={(e) => setTheme(e.target.value)}
                  className="radio-input"
                />
                <span className="custom-radio"></span>
                {th}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="radio-results-card">
        <h3 className="results-title">Selected Configuration</h3>
        <div className="results-content">
          <div className="result-item">
            <span className="result-label">Framework:</span>
            <span className="result-value badge-primary">{framework}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Experience:</span>
            <span className="result-value badge-secondary">{experience}</span>
          </div>
          <div className="result-item">
            <span className="result-label">UI Style:</span>
            <span className="result-value badge-dark">{theme}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioButtonPage;
