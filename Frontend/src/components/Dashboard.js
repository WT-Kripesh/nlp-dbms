import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Database, Table2, Terminal, Play } from 'lucide-react';

const Dashboard = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    const [databases, setDatabases] = useState([]);
    const [selectedDatabase, setSelectedDatabase] = useState('');
    const [tables, setTables] = useState([]);
    const [query, setQuery] = useState('');
    const [sqlQuery, setSqlQuery] = useState('');
    const [results, setResults] = useState([]);

    // Fetch available databases
    useEffect(() => {
        const fetchDatabases = async () => {
            try {
                const response = await axios.get('http://localhost:3001/get-databases', formData);
                setDatabases(response.data.databases);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching databases:', error);
            }
        };
        fetchDatabases();
    }, [formData]);

    // Handle database selection
    const handleDatabaseSelect = async (dbName) => {
        setSelectedDatabase(dbName);
        try {
            // Send `USE {database};` to backend
            // await axios.post('http://localhost:3001/select-database', { ...formData, database: dbName });

            // Fetch tables and attributes
            const response = await axios.post('http://localhost:3001/get-tables', { ...formData, database: dbName });
            setTables(response.data.tables);
            console.log(tables)
        } catch (error) {
            console.error('Error selecting database:', error);
        }
    };

    // Handle query submission
    const handleQuerySubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3001/process_query', { database:selectedDatabase, query:query });
            console.log(response);
            setSqlQuery(response.data.sql_query);
            setResults(response.data.results);
        } catch (error) {
            console.error('Error executing query:', error);
        }
    };

//     return (
//         <div>
//             <h1>Dashboard</h1>
            
//             {/* Dropdown for databases */}
//             <select onChange={(e) => handleDatabaseSelect(e.target.value)} value={selectedDatabase}>
//                 <option value="">Select a Database</option>
//                 {databases.map((db) => (
//                     <option key={db} value={db}>{db}</option>
//                 ))}
//             </select>

//             {/* Show tables and attributes */}
//             {tables.length > 0 && (
//                 <div>
//                     <h2>Tables</h2>
//                     <ul>
//                         {tables.map((table) => (
//                             <li key={table.name}>{table.name} ({table.columns.join(', ')})</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* Query input and execution */}
//             <textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter English query"></textarea>
//             <button onClick={handleQuerySubmit}>Run Query</button>

//             {/* Show converted SQL */}
//             {sqlQuery && <p><b>SQL Query:</b> {sqlQuery}</p>}

//             {/* Show query results */}
//             {results.length > 0 && (
//                 <table>
//                     <thead>
//                         <tr>{Object.keys(results[0]).map((key) => <th key={key}>{key}</th>)}</tr>
//                     </thead>
//                     <tbody>
//                         {results.map((row, index) => (
//                             <tr key={index}>
//                                 {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };
return (
  <div className="dashboard">
    <div className="container">
      {/* Header */}
      <header className="header">
        <Database className="header-icon" />
        <h1 className="header-title">NLP Database Query Interface</h1>
      </header>

      {/* Database Selection & Schema */}
      <section className="card">
        <div className="card-header">
          <Table2 className="card-icon" />
          <h2 className="card-title">
            Current Database: <span className="database-name">{selectedDatabase}</span>
          </h2>
        </div>
        
        <div>
          <h3 className="card-title">Available Tables and Attributes:</h3>
          <div className="tables-grid">
            {Object.entries(tables).map(([tableName, attributes]) => (
              <div key={tableName} className="table-card">
                <h4 className="table-name">{tableName}</h4>
                <p className="table-attributes">{attributes.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Query Input */}
      <section className="card">
        <div className="card-header">
          <Terminal className="card-icon" />
          <h2 className="card-title">Query Input</h2>
        </div>
        
        <div>
          <div className="form-group">
            <label className="form-label">Enter your query in English:</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="query-input"
              rows={3}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Generated SQL Query:</label>
            <div className="sql-display">
              <code className="sql-code">{sqlQuery}</code>
            </div>
          </div>
          
          <button className="execute-button">
            <Play className="w-4 h-4" />
            <span>Execute Query</span>
          </button>
        </div>
      </section>

      {/* Results Table */}
      <section className="card">
        <h2 className="card-title">Query Results</h2>
        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Manager</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  <td>{row.location}</td>
                  <td>{row.manager}</td>
                  <td>{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
  );
}

export default Dashboard;
