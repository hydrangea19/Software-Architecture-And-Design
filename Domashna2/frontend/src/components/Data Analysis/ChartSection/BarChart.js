import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './BarChart.css';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {

  const yAxisLabels = [
    '40800000', '36720000', '32640000', '28560000',
    '24480000', '20400000', '16320000', '12240000',
    '8160000', '4080000', '0', '-4080000'
  ];

  const xAxisLabels = [
    'Last Transaction Price', 'Max Price', 'Min Price',
    'Average Price', '% Change', 'Quantity',
    'Turnover in BEST (in MKD)', 'Total Turnover (in MKD)'
  ];


  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label: 'Stock Data',
        data: [40800000, 36720000, 32640000, 28560000, 24480000, 20400000, 16320000, 12240000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };


  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Stock Data',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chartAxis">
      <div className="yAxis">
        {yAxisLabels.map(label => (
          <div key={label} className="yAxisLabel">{label}</div>
        ))}
      </div>
      <div className="chartArea">

        <Bar data={data} options={options} />
      </div>
      <div className="xAxis">
        {xAxisLabels.map(label => (
          <div key={label} className="xAxisLabel">{label}</div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;
