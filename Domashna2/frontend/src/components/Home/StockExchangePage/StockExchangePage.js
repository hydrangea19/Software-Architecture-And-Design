import React from 'react';
import Calendar from '../Calendar/Calendar';
import StockTickers from '../StockTickers/StockTickers';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import'./StockExchangePage.css';
import {useNavigate} from "react-router-dom";


function StockExchangePage () {
   const navigate = useNavigate();

  const handleClick = () => {
    navigate('/data-analysis');
  };
  return (
    <div className="page">
      <Header />

      <main className="mainContent">
        <div className="contentGrid">
          <section className="infoSection">
            <h1 className="title">
              Historical Data from the
              <br/>Macedonian Stock Exchange
            </h1>
            <p className="description">
              This dataset contains historical data from the Macedonian Stock Exchange,<br/>
              including detailed records for all listed companies and institutions.<br/>
              The data spans at least the last 10 years and includes daily metrics<br/>
              such as opening and closing prices, highest and lowest prices of the day,<br/>
              and trading volume. The dataset is organized chronologically and formatted<br/>
              to facilitate analysis, offering valuable insights into market trends<br/>
              and performance indicators.
            </p>
            <button className="seeMoreButton" onClick={handleClick}>See more...</button>
            <StockTickers />
          </section>
          <section className="calendarSection">
            <Calendar />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default StockExchangePage;