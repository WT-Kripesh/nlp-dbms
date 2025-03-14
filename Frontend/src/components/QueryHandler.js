// components/QueryHandler.js
import React, { useState } from "react";
import { Terminal, Play } from "lucide-react";
import axios from "axios";
import "./styles/QueryHandler.css"; // Import the CSS file

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const QueryHandler = ({ selectedDatabase}) => {
  const [query, setQuery] = useState("");
  const [sqlQuery1, setSqlQuery1] = useState("");
  const [sqlQuery2, setSqlQuery2] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");





  // Handle query submission
  const handleGenerate = async () => {
    setSqlQuery1("")
    setSqlQuery2("")
    setMessage("Translating into SQL...")
    if (!selectedDatabase) {
      alert("Please select a database first.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/generate_query`, {
        database: selectedDatabase,
        query: query
      });
      setSqlQuery1(response.data.sql_query_nlp);
      setMessage("")
      
    } catch (error) {
      console.error("Error translating query:", error);
      setMessage("NLP based system couldn't translate the query.")
    } 
  };

  const MLgenerate = async () => {
    setResults([])
    setSqlQuery1("")
    setSqlQuery2("")
    setMessage("Translating into SQL...")
    if (!selectedDatabase) {
      alert("Please select a database first.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/generate_query_ml`, {
        database: selectedDatabase,
        query: query
      });
      setSqlQuery2(response.data.sql_query_ml);
      setMessage("")
    } catch (error) {
      console.error("Error translating query:", error);
      setMessage("Error translating query")
    }
  };




  const handleQuerySubmit = async (qry) => {

    try{
      const response = await axios.post(`${API_BASE_URL}/execute_query`, {
        database: selectedDatabase,
        query: qry,
      });
      setResults(response.data.results);
      setMessage("")
    } catch (error) {
      console.error("Error executing query:", error);
      setMessage("Error executing query, syntax error");
      setResults([])
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
            <div className="input-bar">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="query-input"
              rows={2}
              placeholder="Example: show all products where price is greater than 100"
            />
            <button className="execute-button generate-button" onClick={handleGenerate}>
            <span>Generate Query</span>
          </button>
          </div>
          </div>

          {sqlQuery1 && (
            <div className="form-group">
              {/* NLP based query */}
              <label className="formlabel">SQL Query generated using NLP:</label>
              <div className="sql-display">
                <code className="sql-code" rows={3}>
                  {sqlQuery1}
                </code>
                <button className="execute-button" onClick={() => handleQuerySubmit(sqlQuery1)}>
            <Play className="w-4 h-4" />
            <span>Execute Query</span>
          </button>
              </div>
              
              </div>
          )}

          {(message === "NLP based system couldn't translate the query." || sqlQuery1) && (
            <div className="not-satisfied">
              <p>Not Satisfied? Generate with ML model: </p> 
              <button className="execute-button" onClick={MLgenerate}>
                <span>Generate</span>
              </button>
            </div>
          )}

          {sqlQuery2 && (
            <div className="form-group">

              {/* Machine learning based query */}
              <label className="formlabel">SQL Query generated using ML model:</label>
              <div className="sql-display">
                <code className="sql-code" rows={3}>
                  {sqlQuery2}
                </code>
                <button className="execute-button" onClick={() =>handleQuerySubmit(sqlQuery2)}>
                  <Play className="w-4 h-4" />
                  <span>Execute Query</span>
                </button>
              </div>
              </div>
          )}

        </div>
      </section>
      
      {message && (
        <h3 className="message">{message}</h3>
      )
      }

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