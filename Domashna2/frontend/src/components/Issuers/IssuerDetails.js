import React, { useState, useEffect } from 'react';
import { getIssuer } from '../../repository/issuerService';
import { useParams, useNavigate } from 'react-router-dom';
import './IssuerDetails.css'

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
   <div className="issuer-details-container">
      <h2 className="issuer-details-header">Issuer Details</h2>
      <table className="details-table">
        <tbody>
          {[
            { label: 'ID', value: issuer.id },
            { label: 'Code', value: issuer.code },
            { label: 'Date', value: issuer.date },
            { label: 'Last Transaction Price', value: issuer.last_transaction_price },
            { label: 'Max Price', value: issuer.max_price },
            { label: 'Min Price', value: issuer.min_price },
            { label: 'Average Price', value: issuer.avg_price },
            { label: 'Percentage Change', value: issuer.percentage_change },
            { label: 'Quantity', value: issuer.quantity },
            { label: 'Best Traded', value: issuer.best_traded },
            { label: 'Total Traded', value: issuer.total_traded },
          ].map(({ label, value }) => (
            <tr key={label}>
              <th className="details-label">{label}</th>
              <td className="details-value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back-button" onClick={() => navigate('/issuers/')}>Back to List</button>
    </div>
  );
}