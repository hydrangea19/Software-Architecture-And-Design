import React from 'react';

function SearchHistory() {
  const historyItems = [
    { searchTerm: 'KMB', date: '2024-12-15' },
    { searchTerm: 'ALKOLOID', date: '2024-12-10' },
    { searchTerm: 'FLO', date: '2024-12-05' }
  ];

  return (
    <div className="searchHistoryContainer">

      <ul>
        {historyItems.map((item, index) => (
          <li key={index} className="historyItem">
            <span className="searchTerm">{item.searchTerm}</span>
            <span className="searchDate">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
