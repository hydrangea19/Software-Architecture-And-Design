import React, { useState, useEffect } from 'react';
import { getIssuer, updateIssuer } from '../../repository/issuerService';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Edit Issuer</h2>
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
            name="avg-price"
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
        <button type="submit">Update Issuer</button>
      </form>
    </div>
  );
}
