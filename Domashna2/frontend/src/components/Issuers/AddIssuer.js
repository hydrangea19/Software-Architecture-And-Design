import React, { useState } from 'react';
import { addIssuer } from '../../repository/issuerService';
import { useNavigate } from 'react-router-dom';
import './AddIssuer.css'

export default function AddIssuer() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addIssuer(formData);
      alert('Issuer added successfully!');
      navigate('/issuers/');
    } catch (error) {
      console.error('Error adding issuer:', error);
      alert('Failed to add issuer.');
    }
  };
   return (
    <div className="add-issuer-container">
      <h2 className="add-issuer-header">Add New Issuer</h2>
      <form onSubmit={handleSubmit} className="add-issuer-form">
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
        <button type="submit" className="submit-button">Add Issuer</button>
      </form>
    </div>
  );
}