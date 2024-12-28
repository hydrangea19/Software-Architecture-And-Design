import React from 'react';
import styles from './ExportButtons.css';

function ExportButtons() {
  return (
    <div className="exportContainer">
      <button
        className="pdfButton"
        onClick={() => {/* PDF export logic */}}
        aria-label="Save as PDF"
      >
        Save as PDF
      </button>
      <button
        className="pdfButton"
        onClick={() => {/* CSV export logic */}}
        aria-label="Save as CSV"
      >
        Save as CSV
      </button>
    </div>
  );
}
export default ExportButtons;