import React from 'react';
import { ReportCard } from './ReportCard';
import './Reports.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const reportData = [
  {
    title: 'Annual Report for KMB',
    description: 'The Annual Report for KMB provides a comprehensive overview of the key activities, performance metrics, and strategic achievements for the year. This report aims to summarize financial data, highlight milestones, and provide insights into future goals.'
  },
  {
    title: 'Annual Report for FUBT',
    description: 'The Annual Report for FUBT provides a comprehensive overview of the key activities, performance metrics, and strategic achievements for the year. This report aims to summarize financial data, highlight milestones, and provide insights into future goals.'
  },
  {
    title: 'Annual Report for ELMA',
    description: 'The Annual Report for ELMA provides a comprehensive overview of the key activities, performance metrics, and strategic achievements for the year. This report aims to summarize financial data, highlight milestones, and provide insights into future goals.'
  }
];

export const Reports = () => {
  return (
      <div className="pageContainer">

        <Header/>
        <section className="filterSection">
          <h2 className="filterTitle">Sort By</h2>
          <div className="filterButtons">
            <button className="filterButton">Companies</button>
            <button className="filterButton">Type</button>
            <button className="filterButton">Date</button>
            <button className="filterButton">Price</button>
          </div>
        </section>

        <main className="mainContent">
          {reportData.map((report, index) => (
              <ReportCard
                  key={index}
                  title={report.title}
                  description={report.description}
              />
          ))}
        </main>

        <Footer/>
      </div>
  );
};