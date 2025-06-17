import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const CurrentMonthRenewals = () => {
  const [renewals, setRenewals] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const agentName = decodedToken.name;
  
      axios.get('http://localhost:5050/api/policies', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          const today = new Date();
          const tenDaysLater = new Date();
          tenDaysLater.setDate(today.getDate() + 10);
  
          const upcomingRenewals = response.data.filter(policy => {
            const renewalDate = new Date(policy.renewalDate);
            return (
              renewalDate >= today &&
              renewalDate <= tenDaysLater &&
              policy.agentName === agentName
            );
          });
  
          // Sort the renewals by renewalDate in ascending order
          upcomingRenewals.sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));
  
          setRenewals(upcomingRenewals);
        })
        .catch(error => {
          console.error('Error fetching renewals:', error);
        });
    }
  }, []);  

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Renewals This Month</h2>
      <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {renewals.length > 0 ? (
          renewals.map(policy => (
            <li key={policy._id} className="mb-4 p-3 border-dark-200 border-4 flex flex-col items-center">
              <p><strong>Customer Name:</strong> {policy.customerName}</p>
              <p><strong>Policy Number:</strong> {policy.policyNo}</p>
              <p><strong>Phone Number:</strong> {policy.phoneNo}</p>
              {/* <p><strong>Phone Number:</strong> {agentName  }</p> */}
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
