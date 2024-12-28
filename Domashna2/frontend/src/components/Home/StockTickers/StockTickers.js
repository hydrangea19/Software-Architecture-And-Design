import React from 'react';
import './StockTickers.css';

function StockTickers ()  {
  const topTickers = [
    { symbol: 'KMB', id: 1 },
    { symbol: 'ALMA', id: 2 }
  ];

  const middleTickers = [
    { symbol: 'EVRO', id: 3 },
    { symbol: 'FROT', id: 4 }
  ];

  const bottomTickers = [
    { symbol: 'LOTO', id: 5 }
  ];

  return (
    <div className="tickerContainer">
      <div className="tickerRow">
        {topTickers.map(ticker => (
          <div key={ticker.id} className="ticker">
            {ticker.symbol}
          </div>
        ))}
      </div>
      <div className="tickerRow">
        {middleTickers.map(ticker => (
          <div key={ticker.id} className="ticker">
            {ticker.symbol}
          </div>
        ))}
      </div>
      <div className="tickerRow">
        {bottomTickers.map(ticker => (
          <div key={ticker.id} className="ticker">
            {ticker.symbol}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockTickers;