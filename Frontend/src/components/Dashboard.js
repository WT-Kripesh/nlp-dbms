import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [databases, setDatabases] = useState([]);
  const [selectedDB, setSelectedDB] = useState('');
  const [tables, setTables] = useState([]);
  const [query, setQuery] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [results, setResults] = useState([]);

  // Fetch available databases on mount
  useEffect(() => {
    axios.get('/api/databases') // Adjust the endpoint based on your backend
      .then(response => setDatabases(response.data))
      .catch(error => console.error('Error fetching databases:', error));
  }, []);

  // Fetch tables & attributes when a database is selected
  useEffect(() => {
    if (selectedDB) {
      axios.get(`/api/tables?database=${selectedDB}`)
        .then(response => setTables(response.data))
        .catch(error => console.error('Error fetching tables:', error));
    }
  }, [selectedDB]);

  // Handle query submission
  const handleQuerySubmit = () => {
    axios.post('/api/query', { database: selectedDB, query })
      .then(response => {
        setSqlQuery(response.data.sql);
        setResults(response.data.results);
      })
      .catch(error => console.error('Error executing query:', error));
  };

  return (
    <div className="dashboard">
      <h1>Database Dashboard</h1>

      {/* Database Selection */}
      <label>Select Database:</label>
      <select value={selectedDB} onChange={(e) => setSelectedDB(e.target.value)}>
        <option value="">-- Select --</option>
        {databases.map((db, index) => (
          <option key={index} value={db}>{db}</option>
        ))}
      </select>

      {/* Tables & Attributes */}
      {selectedDB && (
        <div className="tables-section">
          <h2>Tables in {selectedDB}</h2>
          <ul>
            {tables.map((table, index) => (
              <li key={index}>
                <strong>{table.name}</strong> ({table.attributes.join(', ')})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Query Input */}
      <div className="query-section">
        <label>Enter English Query:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Show all employees earning more than $5000"
        />
        <button onClick={handleQuerySubmit}>Execute</button>
      </div>

      {/* Query Results */}
      {sqlQuery && (
        <div className="results-section">
          <h3>Converted SQL Query:</h3>
          <code>{sqlQuery}</code>

          <h3>Results:</h3>
          <table>
            <thead>
              <tr>
                {results.length > 0 && Object.keys(results[0]).map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((val, colIndex) => (
                    <td key={colIndex}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
