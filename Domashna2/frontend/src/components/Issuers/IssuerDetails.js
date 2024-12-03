import React, { useState, useEffect } from 'react';
import { getIssuer } from '../../repository/issuerService';
import { useParams, useNavigate } from 'react-router-dom';

export default function IssuerDetails() {
    const { id } = useParams();
  const [issuer, setIssuer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssuer = async () => {
      try {
        const data = await getIssuer(id);
        setIssuer(data);
      } catch (error) {
        console.error('Error fetching issuer details:', error);
        alert('Failed to load issuer details.');
      }
    };
    fetchIssuer();
  }, [id]);

  if (!issuer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Issuer Details</h2>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{issuer.id}</td>
          </tr>
          <tr>
            <th>Code</th>
            <td>{issuer.code}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{issuer.date}</td>
          </tr>
          <tr>
            <th>Last Transaction Price</th>
            <td>{issuer.last_transaction_price}</td>
          </tr>
          <tr>
            <th>Max Price</th>
            <td>{issuer.max_price}</td>
          </tr>
          <tr>
            <th>Min Price</th>
            <td>{issuer.min_price}</td>
          </tr>
          <tr>
            <th>Average Price</th>
            <td>{issuer.avg_price}</td>
          </tr>
          <tr>
            <th>Percentage Change</th>
            <td>{issuer.percentage_change}</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>{issuer.quantity}</td>
          </tr>
          <tr>
            <th>Best Traded</th>
            <td>{issuer.best_traded}</td>
          </tr>
          <tr>
            <th>Total Traded</th>
            <td>{issuer.total_traded}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => navigate('/issuers/')}>Back to List</button>
    </div>
  );
}