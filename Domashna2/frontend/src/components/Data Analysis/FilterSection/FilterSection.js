import React from 'react';
import styles from './FilterSection.css';

const filterButtons = ['Companies', 'Type', 'Date', 'Price'];
const chartTypes = ['Line Chart', 'Bar Chart', 'Pie Chart', 'Histogram', 'Box Plot'];

 function FilterSection() {
  return (
    <div className="filterContainer">
      <div className="filterGroup">
        <h2 className="filterTitle">Sort By</h2>
        <div className="buttonGroup">
          {filterButtons.map(button => (
            <button
              key={button}
              className="filterButton"
              aria-label={`Sort by ${button}`}
            >
              {button}
            </button>
          ))}
        </div>
      </div>

      <div className="chartSelector">
        <h2 className="filterTitle">Choose chart</h2>
        <div className="buttonGroup">
          {chartTypes.map(type => (
            <button
              key={type}
              className="chartButton"
              aria-label={`Select ${type}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <h2 className="stockTitle">KMB</h2>
    </div>
  );
}
export default FilterSection;