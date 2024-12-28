import React from 'react';
import styles from './DataTable.css';

const tableHeaders = [
  'Date', 'Last Transaction Price', 'Max price', 'Min price',
  'Average', '%', 'Quantity', 'Turnover in BEST', 'Total Turnover'
];

const tableData = [
  {
    date: '22.11.2024',
    lastPrice: '24,200.00',
    maxPrice: '24,300.00',
    minPrice: '24,200.00',
    average: '24,242.93',
    percentage: '-0.05',
    quantity: '323',
    turnoverBest: '7,830,466',
    totalTurnover: '7,830,466'
  },
   {
    date: '22.11.2024',
    lastPrice: '24,200.00',
    maxPrice: '24,300.00',
    minPrice: '24,200.00',
    average: '24,242.93',
    percentage: '-0.05',
    quantity: '323',
    turnoverBest: '7,830,466',
    totalTurnover: '7,830,466'
  },
     {
    date: '22.11.2024',
    lastPrice: '24,200.00',
    maxPrice: '24,300.00',
    minPrice: '24,200.00',
    average: '24,242.93',
    percentage: '-0.05',
    quantity: '323',
    turnoverBest: '7,830,466',
    totalTurnover: '7,830,466'
  },
     {
    date: '22.11.2024',
    lastPrice: '24,200.00',
    maxPrice: '24,300.00',
    minPrice: '24,200.00',
    average: '24,242.93',
    percentage: '-0.05',
    quantity: '323',
    turnoverBest: '7,830,466',
    totalTurnover: '7,830,466'
  }, {
    date: '22.11.2024',
    lastPrice: '24,200.00',
    maxPrice: '24,300.00',
    minPrice: '24,200.00',
    average: '24,242.93',
    percentage: '-0.05',
    quantity: '323',
    turnoverBest: '7,830,466',
    totalTurnover: '7,830,466'
  }, {
    date: '22.11.2024',
    lastPrice: '24,200.00',
    maxPrice: '24,300.00',
    minPrice: '24,200.00',
    average: '24,242.93',
    percentage: '-0.05',
    quantity: '323',
    turnoverBest: '7,830,466',
    totalTurnover: '7,830,466'
  },
];

function DataTable() {
  return (
    <div className="tableContainer">
      <table className="dataTable">
        <thead>
          <tr>
            {tableHeaders.map(header => (
              <th key={header} className="tableHeader">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="tableRow">
              <td>{row.date}</td>
              <td>{row.lastPrice}</td>
              <td>{row.maxPrice}</td>
              <td>{row.minPrice}</td>
              <td>{row.average}</td>
              <td>{row.percentage}</td>
              <td>{row.quantity}</td>
              <td>{row.turnoverBest}</td>
              <td>{row.totalTurnover}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default DataTable;