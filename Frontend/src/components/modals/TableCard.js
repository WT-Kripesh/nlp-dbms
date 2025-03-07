// components/TableCard.js
import React, { useState } from "react";
import { Plus, Edit } from "lucide-react";
import axios from "axios";
import "./TableCard.css"; // Import the CSS file
import "./Modals.css"; // Import the modals CSS

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const TableCard = ({ tableName, attributes, selectedDatabase }) => {
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [tableSchema, setTableSchema] = useState({}); // Store table schema
  const [rowData, setRowData] = useState({}); // Store row data for insert/update
  const [condition, setCondition] = useState(""); // Store condition for update

  // Fetch table schema
  const fetchTableSchema = async () => {
    try {
      console.log('Here am I')
      const response = await axios.post(`${API_BASE_URL}/get-table-schema`, {
        database: selectedDatabase,
        table: tableName,
      });
      setTableSchema(response.data.schema);
    } catch (error) {
      console.error("Error fetching table schema:", error);
    }
  };

  // Handle insert row
  const handleInsertRow = async (rowData) => {
    const columns = Object.keys(rowData).join(", ");
    const values = Object.values(rowData).map((val) => (`${val}`)).join(", ");
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`
    console.log(query)

    try {
      await axios.post(`${API_BASE_URL}/execute_query`, {
        database: selectedDatabase,
        query : query,
        exec_only : 1
      });
      alert("Row inserted successfully!");
    } catch (error) {
      console.error("Error inserting row:", error);
      alert("Failed to insert row.");
    }
  };

  // Handle update row
  const handleUpdateRow = async (rowData, condition) => {
    const query= `UPDATE ${tableName} SET ${Object.entries(rowData).map(([key, val]) => `${key}=${val}`).join(", ")} WHERE ${condition};`;
    console.log(query);
    try {
      await axios.post(`${API_BASE_URL}/execute_query`, {
        database: selectedDatabase,
        query: query,
        exec_only:1
      });
      alert("Row updated successfully!");
    } catch (error) {
      console.error("Error updating row:", error);
      alert("Failed to update row.");
    }
  };

  // Handle insert row submission
  const handleInsertSubmit = (e) => {
    e.preventDefault();
    handleInsertRow(rowData);
    setShowInsertModal(false);
    setRowData({}); // Reset row data
  };

  // Handle update row submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    handleUpdateRow(rowData, condition);
    setShowUpdateModal(false);
    setRowData({}); // Reset row data
    setCondition(""); // Reset condition
  };

  return (
    <div className="table-card">
      <h4 className="table-name">{tableName}</h4>
      <p className="table-attributes">{attributes.join(", ")}</p>
      <div className="table-actions">
        <button
          className="action-button insert-button"
          onClick={async () => {
            await fetchTableSchema();
            setShowInsertModal(true);
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Insert</span>
        </button>
        <button
          className="action-button"
          onClick={async () => {
            await fetchTableSchema();
            setShowUpdateModal(true);
          }}
        >
          <Edit className="w-4 h-4" />
          <span>Update</span>
        </button>
      </div>

      {/* Insert Row Modal */}
      {showInsertModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title">Insert Row into {tableName}</h2>
        <button
          className="modal-close-button"
          onClick={() => setShowInsertModal(false)}
        >
          &times;
        </button>
      </div>
      <form className="modal-form" onSubmit={handleInsertSubmit}>
        {tableSchema.map((columnObj) => {
          // Get the column name and type from the object
          const columnName = Object.keys(columnObj)[0];
          const columnType = columnObj[columnName];

          return (
            <div key={columnName} className="form-group">
              <label className="formlabel">
                {columnName} ({columnType})
              </label>
              <input
                type="text"
                placeholder={`Enter value for ${columnName}`}
                value={rowData[columnName] || ""}
                onChange={(e) =>
                  setRowData({ ...rowData, [columnName]: e.target.value })
                }
                required
              />
            </div>
          );
        })}
        <div className="form-actions">
          <button type="submit">Insert</button>
          <button type="button" onClick={() => setShowInsertModal(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Update Row Modal */}
      {showUpdateModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title">Update Row in {tableName}</h2>
        <button
          className="modal-close-button"
          onClick={() => setShowUpdateModal(false)}
        >
          &times;
        </button>
      </div>
      <form className="modal-form" onSubmit={handleUpdateSubmit}>
        {tableSchema.map((columnObj) => {
          // Get the column name and type from the object
          const columnName = Object.keys(columnObj)[0];
          const columnType = columnObj[columnName];

          return (
            <div key={columnName} className="form-group">
              <label className="formlabel">
                {columnName} ({columnType})
              </label>
              <input
                type="text"
                placeholder={`Enter new value for ${columnName}`}
                value={rowData[columnName] || ""}
                onChange={(e) =>
                  setRowData({ ...rowData, [columnName]: e.target.value })
                }
              />
            </div>
          );
        })}
        <div className="form-group">
          <label className="formlabel">Condition (e.g., id = 1)</label>
          <input
            type="text"
            placeholder="Enter condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default TableCard;