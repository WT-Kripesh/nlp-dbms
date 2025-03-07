// components/CreateTableModal.js
import React, { useState } from "react";
import "./Modals.css";

const CreateTableModal = ({ onClose, onCreate }) => {
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const columnsArray = columns.split(",").map((col) => col.trim());
    onCreate(tableName, columnsArray);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Create Table</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Table Name"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
          <textarea
            placeholder="Column names (comma separated)"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            required
          />
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTableModal;