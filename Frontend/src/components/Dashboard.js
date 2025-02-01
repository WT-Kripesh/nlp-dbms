import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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
                const response = await axios.post('http://localhost:3001/get-databases', formData);
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
            await axios.post('http://localhost:3001/select-database', { ...formData, database: dbName });

            // Fetch tables and attributes
            const response = await axios.post('http://localhost:3001/get-tables', { ...formData, database: dbName });
            setTables(response.data.tables);
        } catch (error) {
            console.error('Error selecting database:', error);
        }
    };

    // Handle query submission
    const handleQuerySubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3001/query', { ...formData, query });
            setSqlQuery(response.data.sql);
            setResults(response.data.results);
        } catch (error) {
            console.error('Error executing query:', error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            
            {/* Dropdown for databases */}
            <select onChange={(e) => handleDatabaseSelect(e.target.value)} value={selectedDatabase}>
                <option value="">Select a Database</option>
                {databases.map((db) => (
                    <option key={db} value={db}>{db}</option>
                ))}
            </select>

            {/* Show tables and attributes */}
            {tables.length > 0 && (
                <div>
                    <h2>Tables</h2>
                    <ul>
                        {tables.map((table) => (
                            <li key={table.name}>{table.name} ({table.columns.join(', ')})</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Query input and execution */}
            <textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter English query"></textarea>
            <button onClick={handleQuerySubmit}>Run Query</button>

            {/* Show converted SQL */}
            {sqlQuery && <p><b>SQL Query:</b> {sqlQuery}</p>}

            {/* Show query results */}
            {results.length > 0 && (
                <table>
                    <thead>
                        <tr>{Object.keys(results[0]).map((key) => <th key={key}>{key}</th>)}</tr>
                    </thead>
                    <tbody>
                        {results.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;
