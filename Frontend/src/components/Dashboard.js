// Dashboard.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Database, Plus, Trash,Edit } from "lucide-react";
import QueryHandler from "./QueryHandler";
import CreateTableModal from "./modals/CreateTableModal";
import DeleteTableModal from "./modals/DeleteTableModal";
import TableCard from "./modals/TableCard";
import "./styles/Dashboard.css"; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const Dashboard = () => {
const location = useLocation();
const navigate = useNavigate();
const { formData } = location.state || {};
const [databases, setDatabases] = useState([]);
const [selectedDatabase, setSelectedDatabase] = useState("");
const [tables, setTables] = useState([]);
const [showCreateTableModal, setShowCreateTableModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal
const [selectedTable, setSelectedTable] = useState("");

// Fetch available databases
useEffect(() => {
  const fetchDatabases = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-databases`, formData);
      setDatabases(response.data.databases);
    } catch (error) {
      console.error("Error fetching databases:", error);
      // alert("Connection timed out! You have to re-login.")
      navigate('/get-started');
    }
  };
  fetchDatabases();
}, [formData]);

// Handle database selection
const handleDatabaseSelect = async (dbName) => {
  setSelectedDatabase(dbName);
  try {
    const response = await axios.post(`${API_BASE_URL}/get-tables`, {
      database: dbName,
    });
    setTables(response.data.tables);
  } catch (error) {
    console.error("Error selecting database:", error);
  }
};



  // Handle create table
  const handleCreateTable = async (tableName, columns) => {
  try {
    await axios.post(`${API_BASE_URL}/create-table`, {
      database: selectedDatabase,
      tableName,
      columns,
    });
    // Refresh tables
    const response = await axios.post(`${API_BASE_URL}/get-tables`, {
      database: selectedDatabase,
    });
    setTables(response.data.tables);
    setShowCreateTableModal(false);
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// Handle delete table with authentication
const handleDeleteTable = async (username, password) => {
  try {
    await axios.post(`${API_BASE_URL}/delete-table`, {
      database: selectedDatabase,
      tableName: selectedTable,
      username,
      password,
    });
    // Refresh tables
    const response = await axios.post(`${API_BASE_URL}/get-tables`, {
      database: selectedDatabase,
    });
    setTables(response.data.tables);
    setShowDeleteModal(false);
  } catch (error) {
    console.error("Error deleting table:", error);
  }
};




return (
  <div className="dashboard">
    <div className="container">
      {/* Header */}
      <header className="header">
        <Database className="header-icon" />
        <h1 className="header-title">NLP Database Query Interface</h1>
      </header>

      {/* Database Selection */}
      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Database Selection</h2>
        </div>

        <div className="form-group">
          <label className="formlabel">Select Database:</label>
          <select
            className="database-select"
            value={selectedDatabase}
            onChange={(e) => handleDatabaseSelect(e.target.value)}
          >
            <option value="">Choose a database</option>
            {databases.map((db) => (
              <option key={db} value={db}>
                {db}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Tables and Actions */}
      {selectedDatabase && (
        <section className="card">
          <div className="card-bar">
        
            <h2 className="card-title">Tables in {selectedDatabase}</h2>
            <>
            <button
              className="action-button"
              onClick={() => setShowCreateTableModal(true)}
            >
              <Plus className="w-4 h-4" />
              <span>Create Table</span>
            </button>
            <button
              className="action-button delete-button"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash className="w-4 h-4" />
              <span>Delete Table</span>
            </button>
            </>
          </div>
          <div className="tables-grid">
            {Object.keys(tables).map((key) => (
              <TableCard
                key={key}
                tableName={key}
                attributes={tables[key]}
                selectedDatabase={selectedDatabase}
              />
            ))}
          </div>

        </section>
      )}

      {/* Query Handler */}
      {selectedDatabase && <QueryHandler selectedDatabase={selectedDatabase} />}
    </div>

    {/* Modals */}
    {showCreateTableModal && (
      <CreateTableModal
        onClose={() => setShowCreateTableModal(false)}
        onCreate={handleCreateTable}
      />
    )}


    {showDeleteModal && (
      <DeleteTableModal
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteTable}
      />
    )}
  </div>
);
};

export default Dashboard;