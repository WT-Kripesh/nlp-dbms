// components/TableCard.js
import React from "react";
import { Plus, Edit } from "lucide-react";
import "./TableCard.css"; // Import the CSS file

const TableCard = ({ tableName, attributes, onInsert, onUpdate }) => {
  return (
    <div className="table-card">
      <h4 className="table-name">{tableName}</h4>
      <p className="table-attributes">{attributes.join(", ")}</p>
      <div className="table-actions">
        <button className="action-button" onClick={() => onInsert(tableName)}>
          <Plus className="w-4 h-4" />
          <span>Insert</span>
        </button>
        <button className="action-button" onClick={() => onUpdate(tableName)}>
          <Edit className="w-4 h-4" />
          <span>Update</span>
        </button>
      </div>
    </div>
  );
};

export default TableCard;