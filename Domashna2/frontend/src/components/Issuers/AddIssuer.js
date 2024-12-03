import React, { useState } from 'react';
import { addIssuer } from '../../repository/issuerService';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Add New Issuer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Code:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
          <div>
          <label>Last Transaction Price:</label>
          <input
            type="number"
            name="last_transaction_price"
            value={formData.last_transaction_price}
            onChange={handleChange}
            required
          />
        </div>
          <div>
          <label>Max Price:</label>
          <input
            type="number"
            name="max_price"
            value={formData.max_price}
            onChange={handleChange}
            required
          />
        </div>
          <div>
          <label>Min Price:</label>
          <input
            type="number"
            name="min_price"
            value={formData.min_price}
            onChange={handleChange}
            required
          />
        </div>
           <div>
          <label>Average Price:</label>
          <input
            type="number"
            name="avg_price"
            value={formData.avg_price}
            onChange={handleChange}
            required
          />
        </div>
           <div>
          <label>Percentage Change:</label>
          <input
            type="number"
            name="percentage_change"
            value={formData.percentage_change}
            onChange={handleChange}
            required
          />
        </div>
           <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
           <div>
          <label>Best traded:</label>
          <input
            type="number"
            name="best_traded"
            value={formData.best_traded}
            onChange={handleChange}
            required
          />
        </div>
           <div>
          <label>Total traded:</label>
          <input
            type="number"
            name="total_traded"
            value={formData.total_traded}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Issuer</button>
      </form>
    </div>
  );
}