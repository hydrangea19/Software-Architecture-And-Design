import React from 'react';
import styles from './DataAnalysisLayout.css';
import Header from '../../Header/Header';
import FilterSection from '../FilterSection/FilterSection';
import DataTable from '../DataTable/DataTable';
import ChartSection from '../ChartSection/ChartSection';
import ExportButtons from '../ExportButtons/ExportButtons';
import Footer from '../../Footer/Footer';

function DataAnalysisLayout() {
    return (

    <div className="dataAnalysis">

        <div className="container">
                <Header/>

                <FilterSection/>
                <DataTable/>
                <ChartSection/>
                <ExportButtons/>
            </div>
            <Footer/>
        </div>
    );
}


export default DataAnalysisLayout;