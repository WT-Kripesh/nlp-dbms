// components/InsertRowModal.js
import React from "react";

const InsertRowModal = ({ tableName, attributes, onClose, onInsert }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const rowData = {};
    attributes.forEach((attr) => {
      rowData[attr] = e.target[attr].value;
    });
    onInsert(tableName, rowData);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Insert Row into {tableName}</h2>
        <form onSubmit={handleSubmit}>
          {attributes.map((attr) => (
            <input key={attr} type="text" name={attr} placeholder={attr} required />
          ))}
          <button type="submit">Insert</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsertRowModal;