import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentMonthRenewals = () => {
  const [renewals, setRenewals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/policies')
      .then(response => {
        const currentMonth = new Date().getMonth();
        const currentRenewals = response.data.filter(policy => {
          const renewalDate = new Date(policy.renewalDate);
          return renewalDate.getMonth() === currentMonth;
        });
        setRenewals(currentRenewals);
      })
      .catch(error => {
        console.error('Error fetching renewals:', error);
      });
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Renewals This Month</h2>
      <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {renewals.length > 0 ? (
          renewals.map(policy => (
            <li key={policy._id} className="mb-4">
              <p><strong>Customer Name:</strong> {policy.customerName}</p>
              <p><strong>Policy Number:</strong> {policy.policyNo}</p>
              <p><strong>Renewal Date:</strong> {new Date(policy.renewalDate).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>No renewals this month.</p>
        )}
      </ul>
    </div>
  );
};

export default CurrentMonthRenewals;
