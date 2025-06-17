import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RenewalPoliciesTable = () => {
  const [renewals, setRenewals] = useState([]);

  useEffect(() => {
    const admintoken = localStorage.getItem('adminToken');
    if (admintoken) {
      axios.get('http://localhost:5050/api/policies', {
        headers: {
          'Authorization': `Bearer ${admintoken}`
        }
      })
        .then(response => {
          const currentDate = new Date();
          const endDate = new Date();
          endDate.setDate(currentDate.getDate() + 30);

          const currentRenewals = response.data.filter(policy => {
            const renewalDate = new Date(policy.renewalDate);
            return (
              renewalDate >= currentDate &&
              renewalDate <= endDate
            );
          });

          // Sort the renewals by renewalDate in ascending order
          currentRenewals.sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));

          setRenewals(currentRenewals);
        })
        .catch(error => {
          console.error('Error fetching renewals:', error);
        });
    }
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Renewals In Next 10 Days</h2>
      <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {renewals.length > 0 ? (
          renewals.map(policy => (
            <li key={policy._id} className="mb-4 p-3 border-dark-200 border-4 flex flex-col items-center">
              <p><strong>Customer Name:</strong> {policy.customerName}</p>
              <p><strong>Policy Number:</strong> {policy.policyNo}</p>
              <p><strong>Phone Number:</strong> {policy.phoneNo}</p>
              <p><strong>Renewal Date:</strong> {new Date(policy.renewalDate).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>No renewals in the next 10 days.</p>
        )}
      </ul>
    </div>
  );
};

export default RenewalPoliciesTable;
