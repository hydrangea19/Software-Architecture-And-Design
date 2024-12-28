import React, { useState, useEffect } from 'react';
import { getIssuers } from '../../repository/issuerService';
import {deleteIssuer} from "../../repository/issuerService";
import './Issuer.css';
import Header from '../Header/Header';

export default function Issuer() {

    const [issuers, setIssuers] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({next: null, previous: null});
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        code: '',
        date: '',
        min_price: '',
        max_price: ''
    });


    useEffect(() => {
        async function fetchIssuers() {
            try {
                const data = await getIssuers(page, search, filters);
                setIssuers(data.results);
                setPagination({next: data.next, previous: data.previous});
            } catch (error) {
                console.error('Error fetching issuers:', error);
            }

        }

        fetchIssuers();
    }, [page, search, filters]);
    const handleNext = () => setPage((prev) => prev + 1);
    const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };
    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
        setPage(1);
    };
    const handleDelete = async (id) => {
        try {
            await deleteIssuer(id);
            alert('Issuer deleted!');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting issuer:', error);
        }
    };

    return (
        <div>
            <Header/>
        <div className="container">
            <h1 className="header">Issuers</h1>

            {/* Search and Filter Section */}
            <div className="search-filter">
                <input
                    type="text"
                    placeholder="Search by code..."
                    value={search}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    name="code"
                    placeholder="Filter by Code"
                    value={filters.code}
                    onChange={handleFilterChange}
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Filter by Date"
                    value={filters.date}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="min_price"
                    placeholder="Min Price"
                    value={filters.min_price}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="max_price"
                    placeholder="Max Price"
                    value={filters.max_price}
                    onChange={handleFilterChange}
                />
                <button onClick={() => setFilters({code: '', date: '', min_price: '', max_price: ''})}>
                    Reset Filters
                </button>
            </div>

            {/* Add Issuer Button */}
            <div className="add-button">
                <button onClick={() => window.location.href = '/issuers/add/'}>
                    Add Issuer
                </button>
            </div>

            {/* Issuers Table */}
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Code</th>
                        <th>Date</th>
                        <th>Last Transaction Price</th>
                        <th>Max Price</th>
                        <th>Min Price</th>
                        <th>Avg Price</th>
                        <th>Percentage Change</th>
                        <th>Quantity</th>
                        <th>Best Traded</th>
                        <th>Total Traded</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {issuers.length > 0 ? (
                        issuers.map((issuer) => (
                            <tr key={issuer.id}>
                                <td>{issuer.code}</td>
                                <td>{issuer.date}</td>
                                <td>{issuer.last_transaction_price}</td>
                                <td>{issuer.max_price}</td>
                                <td>{issuer.min_price}</td>
                                <td>{issuer.avg_price}</td>
                                <td>{issuer.percentage_change}</td>
                                <td>{issuer.quantity}</td>
                                <td>{issuer.best_traded}</td>
                                <td>{issuer.total_traded}</td>
                                <td className="actions">
                                    <button className="details"
                                            onClick={() => window.location.href = `/issuers/${issuer.id}/`}>
                                        Details
                                    </button>
                                    <button className="edit"
                                            onClick={() => window.location.href = `/issuers/update/${issuer.id}/`}>
                                        Edit
                                    </button>
                                    <button className="delete" onClick={() => handleDelete(issuer.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center">No issuers found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {}
            <div className="pagination">
                <button onClick={handlePrevious} disabled={!pagination.previous}>Previous</button>
                <button onClick={handleNext} disabled={!pagination.next}>Next</button>
            </div>
        </div>
        </div>
    );
}



