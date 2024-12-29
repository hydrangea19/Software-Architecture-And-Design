import React, { useState, useEffect, useRef } from 'react';
import { getIssuerData } from '../../repository/issuerService';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Select from 'react-select';
import Papa from 'papaparse';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DataAnalysis() {
  const [issuers, setIssuers] = useState([]);
  const [selectedIssuer, setSelectedIssuer] = useState(null);
  const [dataFields] = useState([
    { value: 'last_transaction_price', label: 'Last Transaction Price' },
    { value: 'max_price', label: 'Max Price' },
    { value: 'min_price', label: 'Min Price' },
    { value: 'avg_price', label: 'Avg Price' },
    { value: 'percentage_change', label: 'Percentage Change' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'best_traded', label: 'Best Traded' },
    { value: 'total_traded', label: 'Total Traded' },
  ]);
  const [selectedDataField, setSelectedDataField] = useState(null);
  const [graphType, setGraphType] = useState('line');
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState([]);

  const chartRef = useRef(null);
  const getAuthHeader = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};
  useEffect(() => {
  async function fetchUniqueCodes() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/issuers/codes/', {
            headers: getAuthHeader(),
        });
      if (!response.ok) {
        throw new Error(`Failed to fetch unique codes: ${response.statusText}`);
      }
      const text = await response.text();
      console.log('Raw response:', text);

      const codes = JSON.parse(text);
      console.log('Parsed codes:', codes);

      const uniqueIssuers = codes.map((code) => ({
        value: code,
        label: code,
      }));
      setIssuers(uniqueIssuers);
    } catch (err) {
      console.error('Error fetching unique codes:', err);
      setError('Failed to load unique codes.');
    }
  }
  fetchUniqueCodes();
}, []);


  useEffect(() => {
    if (selectedIssuer && selectedDataField) {
      fetchIssuerData();
    }

  }, [selectedIssuer, selectedDataField, graphType]);

  const fetchIssuerData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIssuerData(selectedIssuer.value, selectedDataField.value);
      if (!Array.isArray(data) || data.length === 0) {
        setError('No data available for the selected criteria.');
        setChartData({});
        setRawData([]);
        setLoading(false);
        return;
      }

      const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
      const labels = sortedData.map((item) => item.date);
      const values = sortedData.map((item) => item[selectedDataField.value]);

       setRawData(sortedData);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: selectedDataField.label,
            data: values,
            backgroundColor: graphType === 'pie' ? generateColors(values.length) : 'rgba(75,192,192,0.4)',
            borderColor: graphType === 'pie' ? generateColors(values.length) : 'rgba(75,192,192,1)',
            borderWidth: 1,
            fill: graphType === 'line' ? false : true,
          },
        ],
      });
    } catch (err) {
      console.error('Error fetching issuer data:', err);
      setError('Failed to load data for the selected issuer.');
      setChartData({});
    } finally {
      setLoading(false);
    }
  };


  const generateColors = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
    }
    return colors;
  };
  const handleExportToCSV = () => {
    if (rawData.length === 0) {
      alert('No data available to export.');
      return;
    }

    const csvData = Papa.unparse(rawData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedIssuer.value}_${selectedDataField.value}_data.csv`;
    link.click();
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedIssuer || !selectedDataField) {
      setError('Please select both an issuer and a data field.');
      return;
    }
    fetchIssuerData();
  };

  return (
    <Container className="mt-5">
      <Header/>
      <h2 className="mb-4">Data Analysis</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4} sm={12} className="mb-3">
            <Form.Group controlId="issuerSelect">
            <Form.Label>Select Issuer</Form.Label>
            <Select
            options={issuers}
             value={selectedIssuer}
           onChange={setSelectedIssuer}
           placeholder="Choose an issuer..."
        />
          </Form.Group>
          </Col>
          <Col md={4} sm={12} className="mb-3">
            <Form.Group controlId="dataFieldSelect">
              <Form.Label>Select Data Field</Form.Label>
              <Select
                options={dataFields}
                value={selectedDataField}
                onChange={setSelectedDataField}
                placeholder="Choose a data field..."
              />
            </Form.Group>
          </Col>
          <Col md={2} sm={6} className="mb-3">
            <Form.Group controlId="graphTypeSelect">
              <Form.Label>Select Graph Type</Form.Label>
              <Form.Control
                as="select"
                value={graphType}
                onChange={(e) => setGraphType(e.target.value)}
              >
                <option value="line">Line</option>
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2} sm={6} className="mb-3 d-flex align-items-end">
            <Button variant="primary" type="submit" className="w-100">
              Generate
            </Button>
          </Col>
        </Row>
      </Form>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}

      {!loading && chartData.labels && chartData.labels.length > 0 && (
        <Row className="mt-5">
          <Col>
            {graphType === 'line' && <Line data={chartData} ref={chartRef} />}
            {graphType === 'bar' && <Bar data={chartData} ref={chartRef} />}
            {graphType === 'pie' && <Pie data={chartData} ref={chartRef} />}
          </Col>
        </Row>
      )}

       {!loading && rawData.length > 0 && (
        <Row className="mt-3">
          <Col>
            <Button variant="secondary" onClick={handleExportToCSV}>
              Export to CSV
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}