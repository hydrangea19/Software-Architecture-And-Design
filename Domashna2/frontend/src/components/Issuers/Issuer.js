import React, { useState, useEffect } from 'react';
import { getIssuers } from '../../repository/issuerService';
import {deleteIssuer} from "../../repository/issuerService";

export default function Issuer() {

  const [issuers, setIssuers] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ next: null, previous: null });


    useEffect(() => {
    async function fetchIssuers(){
        try {
            const data = await getIssuers(page);
            setIssuers(data.results);
            setPagination({ next: data.next, previous: data.previous });
        }
        catch (error) {
        console.error('Error fetching issuers:', error);
      }

    }
        fetchIssuers();
    }, [page]);
  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <button onClick={() => window.location.href = '/issuers/add/'}>Add Issuer</button>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {issuers.map((issuer) => (
            <tr key={issuer.id}>
              <td>{issuer.code}</td>
              <td>{issuer.date}</td>
              <td>
                <button onClick={() => window.location.href = `/issuers/${issuer.id}/`}>Details</button>
                <button onClick={() => window.location.href = `/issuers/update/${issuer.id}/`}>Edit</button>
                <button onClick={() => handleDelete(issuer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevious} disabled={!pagination.previous}>Previous</button>
        <button onClick={handleNext} disabled={!pagination.next}>Next</button>
      </div>
    </div>
  );
}

const handleDelete = async (id) => {
  try {
    await deleteIssuer(id);
    alert('Issuer deleted!');
    window.location.reload();
  } catch (error) {
    console.error('Error deleting issuer:', error);
  }
};

