// components/QueryHandler.js
import React, { useState } from "react";
import { Terminal, Play } from "lucide-react";
import axios from "axios";
import "./QueryHandler.css"; // Import the CSS file

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const QueryHandler = ({ selectedDatabase }) => {
  const [query, setQuery] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [results, setResults] = useState([]);

  // Handle query submission
  const handleQuerySubmit = async () => {
    if (!selectedDatabase) {
      alert("Please select a database first.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/process_query`, {
        database: selectedDatabase,
        query: query,
      });
      setSqlQuery(response.data.sql_query);
      setResults(response.data.results);
    } catch (error) {
      console.error("Error executing query:", error);
      alert("An error occurred while executing the query.");
    }
  };

  return (
    <>
      {/* Query Input Section */}
      <section className="card">
        <div className="card-header">
          <Terminal className="card-icon" />
          <h2 className="card-title">Query Input</h2>
        </div>

        <div>
          <div className="form-group">
            <label className="formlabel">Enter your query in English:</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="query-input"
              rows={2}
              placeholder="Example: show all products where price is greater than 100"
            />
          </div>

          {sqlQuery && (
            <div className="form-group">
              <label className="formlabel">Generated SQL Query:</label>
              <div className="sql-display">
                <code className="sql-code" rows={3}>
                  {sqlQuery}
                </code>
              </div>
            </div>
          )}

          <button className="execute-button" onClick={handleQuerySubmit}>
            <Play className="w-4 h-4" />
            <span>Execute Query</span>
          </button>
        </div>
      </section>

      {/* Query Results Section */}
      {results.length > 0 && (
        <section className="card">
          <h2 className="card-title">Query Results</h2>
          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  {Object.keys(results[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default QueryHandler;