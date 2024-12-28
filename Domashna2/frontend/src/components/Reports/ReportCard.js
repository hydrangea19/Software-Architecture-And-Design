import React from 'react';
import './Reports.css';

export const ReportCard = ({ title, description }) => {
  return (
    <div className="reportContainer">
      <div className="reportContent">
        <h2 className="reportTitle">{title}</h2>
        <p className="reportDescription">{description}</p>
      </div>
      <div className="reportActionButtons">
        <button className="pdfButton">

          <span>Save as PDF</span>
        </button>
        <button className="csvButton">

          <span>Save as CSV</span>
        </button>
      </div>
    </div>
  );
};