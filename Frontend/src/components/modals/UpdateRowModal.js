// components/UpdateRowModal.js
import React from "react";

const UpdateRowModal = ({ tableName, attributes, onClose, onUpdate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const rowData = {};
    attributes.forEach((attr) => {
      rowData[attr] = e.target[attr].value;
    });
    const condition = e.target.condition.value;
    onUpdate(tableName, rowData, condition);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Row in {tableName}</h2>
        <form onSubmit={handleSubmit}>
          {attributes.map((attr) => (
            <input key={attr} type="text" name={attr} placeholder={attr} required />
          ))}
          <input type="text" name="condition" placeholder="Condition (e.g., id = 1)" required />
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRowModal;