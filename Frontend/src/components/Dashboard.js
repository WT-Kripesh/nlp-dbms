// Dashboard.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Database, Plus, Trash } from "lucide-react";
import QueryHandler from "./modals/QueryHandler";
import CreateTableModal from "./modals/CreateTableModal";
import InsertRowModal from "./modals/InsertRowModal";
import UpdateRowModal from "./modals/UpdateRowModal";
import "./Dashboard.css"; // Import the CSS file

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const Dashboard = () => {
  const location = useLocation();
  const { formData } = location.state || {};
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [tables, setTables] = useState([]);
  const [showCreateTableModal, setShowCreateTableModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");

  // Fetch available databases
  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-databases`, formData);
        setDatabases(response.data.databases);
      } catch (error) {
        console.error("Error fetching databases:", error);
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
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  // Handle delete table
  const handleDeleteTable = async () => {
    try {
      await axios.post(`${API_BASE_URL}/delete-table`, {
        database: selectedDatabase,
        tableName: selectedTable,
      });
      // Refresh tables
      const response = await axios.post(`${API_BASE_URL}/get-tables`, {
        database: selectedDatabase,
      });
      setTables(response.data.tables);
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  // Handle insert row
  const handleInsertRow = async (tableName, rowData) => {
    try {
      await axios.post(`${API_BASE_URL}/insert-row`, {
        database: selectedDatabase,
        tableName,
        rowData,
      });
      // Refresh tables
      const response = await axios.post(`${API_BASE_URL}/get-tables`, {
        database: selectedDatabase,
      });
      setTables(response.data.tables);
    } catch (error) {
      console.error("Error inserting row:", error);
    }
  };

  // Handle update row
  const handleUpdateRow = async (tableName, rowData, condition) => {
    try {
      await axios.post(`${API_BASE_URL}/update-row`, {
        database: selectedDatabase,
        tableName,
        rowData,
        condition,
      });
      // Refresh tables
      const response = await axios.post(`${API_BASE_URL}/get-tables`, {
        database: selectedDatabase,
      });
      setTables(response.data.tables);
    } catch (error) {
      console.error("Error updating row:", error);
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
            <div className="card-header">
              <h2 className="card-title">Tables in {selectedDatabase}</h2>
            </div>

            <div className="tables-grid">
              {Object.keys(tables).map((key) => (
                <div key={key} className="table-card">
                  <h4 className="table-name">{key}</h4>
                  <p className="table-attributes">{tables[key].join(", ")}</p>
                  <div className="table-actions">
                    <button
                      className="action-button"
                      onClick={() => {
                        setSelectedTable(key);
                        setShowInsertModal(true);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Insert Row</span>
                    </button>
                    <button
                      className="action-button"
                      onClick={() => {
                        setSelectedTable(key);
                        setShowUpdateModal(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                      <span>Update Row</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="table-actions">
              <button
                className="action-button"
                onClick={() => setShowCreateTableModal(true)}
              >
                <Plus className="w-4 h-4" />
                <span>Create Table</span>
              </button>
              <button
                className="action-button"
                onClick={handleDeleteTable}
              >
                <Trash className="w-4 h-4" />
                <span>Delete Table</span>
              </button>
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

      {showInsertModal && (
        <InsertRowModal
          tableName={selectedTable}
          attributes={tables[selectedTable]}
          onClose={() => setShowInsertModal(false)}
          onInsert={handleInsertRow}
        />
      )}

      {showUpdateModal && (
        <UpdateRowModal
          tableName={selectedTable}
          attributes={tables[selectedTable]}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdateRow}
        />
      )}
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Database, Table2, Terminal, Play } from "lucide-react";
// import "./Dashboard.css";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

// const Dashboard = () => {
//   const location = useLocation();
//   const { formData } = location.state || {};
//   const [databases, setDatabases] = useState([]);
//   const [selectedDatabase, setSelectedDatabase] = useState("");
//   const [tables, setTables] = useState([]);
//   const [query, setQuery] = useState("");
//   const [sqlQuery, setSqlQuery] = useState("");
//   const [results, setResults] = useState([]);

//   // Fetch available databases
//   useEffect(() => {
//     const fetchDatabases = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/get-databases`,
//           formData
//         );
//         setDatabases(response.data.databases);
//       } catch (error) {
//         console.error("Error fetching databases:", error);
//       }
//     };
//     fetchDatabases();
//   }, [formData]);

//   // Handle database selection
//   const handleDatabaseSelect = async (dbName) => {
//     setSelectedDatabase(dbName);
//     try {
//       // Send `USE {database};` to backend
//       // await axios.post('http://localhost:3001/select-database', { ...formData, database: dbName });

//       // Fetch tables and attributes
//       const response = await axios.post(`${API_BASE_URL}/get-tables`, {
//         database: dbName,
//       });
//       setTables(response.data.tables);
//     } catch (error) {
//       console.error("Error selecting database:", error);
//     }
//   };

//   // Handle query submission
//   const handleQuerySubmit = async () => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/process_query`, {
//         database: selectedDatabase,
//         query: query,
//       });
//       setSqlQuery(response.data.sql_query);
//       setResults(response.data.results);
//     } catch (error) {
//       console.error("Error executing query:", error);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <div className="container">
//         {/* Header */}
//         <header className="header">
//           <Database className="header-icon" />
//           <h1 className="header-title">NLP Database Query Interface</h1>
//         </header>

//         {/* Database Selection & Schema */}
//         <section className="card">
//           <div className="card-header">
//             <Table2 className="card-icon" />
//             <h2 className="card-title">Database Selection</h2>
//           </div>

//           <div className="form-group">
//             <label className="formlabel">Select Database:</label>
//             <select
//               className="database-select"
//               value={selectedDatabase}
//               onChange={(e) => handleDatabaseSelect(e.target.value)}
//             >
//               <option value="">Choose a database</option>
//               {databases.map((db) => (
//                 <option key={db} value={db}>
//                   {db}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {selectedDatabase && (
//             <div>
//               <h3 className="card-title">Available Tables and Attributes:</h3>
//               <div className="tables-grid">
//                 {Object.keys(tables).map((key) => (
//                   <div key={key} className="table-card">
//                     <h4 className="table-name">{key}</h4>
//                     <p className="table-attributes">{tables[key].join(", ")}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </section>

//         {selectedDatabase && (
//           <>
//             {/* Query Input */}
//             <section className="card">
//               <div className="card-header">
//                 <Terminal className="card-icon" />
//                 <h2 className="card-title">Query Input</h2>
//               </div>

//               <div>
//                 <div className="form-group">
//                   <label className="formlabel">
//                     Enter your query in English:
//                   </label>
//                   <textarea
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     className="query-input"
//                     rows={2}
//                     placeholder="Example: show all products where price is greater than 100"
//                   />
//                 </div>

//                 {sqlQuery && (
//                   <div className="form-group">
//                     <label className="formlabel">Generated SQL Query:</label>
//                     <div className="sql-display">
//                       <code className="sql-code" rows={3}>
//                         {sqlQuery}
//                       </code>
//                     </div>
//                   </div>
//                 )}

//                 <button className="execute-button" onClick={handleQuerySubmit}>
//                   <Play className="w-4 h-4" />
//                   <span>Execute Query</span>
//                 </button>
//               </div>
//             </section>

//             {results && (
//               <section className="card">
//               <h2 className="card-title">Query Results</h2>
//               <div className="table-container">
//                 {results && results.length > 0 ? (
//                   <table className="results-table">
//                     <thead>
//                       <tr>
//                         {Object.keys(results[0]).map((key) => (
//                           <th key={key}>{key}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {results.map((row, index) => (
//                         <tr key={index}>
//                           {Object.values(row).map((val, i) => (
//                             <td key={i}>{val}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <p>No results to display</p>
//                 )}
//               </div>
//             </section>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
