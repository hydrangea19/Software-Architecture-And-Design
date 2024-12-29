import React, { useState, useEffect } from 'react';
import { getIssuer, updateIssuer } from '../../repository/issuerService';
import { useParams, useNavigate } from 'react-router-dom';
import './EditIssuer.css'

export default function EditIssuer() {
     const { id } = useParams();
  const [formData, setFormData] = useState({
    code: '',
    date: '',
    last_transaction_price: '',
    max_price: '',
    min_price: '',
    avg_price: '',
    percentage_change: '',
    quantity: '',
    best_traded: '',
    total_traded: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssuer = async () => {
      try {
        const data = await getIssuer(id);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching issuer:', error);
        alert('Failed to load issuer data.');
      }
    };
    fetchIssuer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateIssuer(id, formData);
      alert('Issuer updated successfully!');
      navigate('/issuers/');
    } catch (error) {
      console.error('Error updating issuer:', error);
      alert('Failed to update issuer.');
    }
  };
   return (
      <div className="edit-issuer-container">
      <h2 className="edit-issuer-header">Edit Issuer</h2>
      <form onSubmit={handleSubmit} className="edit-issuer-form">
        {[
          { label: 'Code', name: 'code', type: 'text' },
          { label: 'Date', name: 'date', type: 'date' },
          { label: 'Last Transaction Price', name: 'last_transaction_price', type: 'number' },
          { label: 'Max Price', name: 'max_price', type: 'number' },
          { label: 'Min Price', name: 'min_price', type: 'number' },
          { label: 'Average Price', name: 'avg_price', type: 'number' },
          { label: 'Percentage Change', name: 'percentage_change', type: 'number' },
          { label: 'Quantity', name: 'quantity', type: 'number' },
          { label: 'Best Traded', name: 'best_traded', type: 'number' },
          { label: 'Total Traded', name: 'total_traded', type: 'number' },
        ].map(({ label, name, type }) => (
          <div className="form-group" key={name}>
            <label htmlFor={name} className="form-label">{label}:</label>
            <input
              id={name}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-button">Update Issuer</button>
      </form>
    </div>
  );
}
