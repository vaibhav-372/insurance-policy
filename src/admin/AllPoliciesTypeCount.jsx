import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllPolicyCount = ({ onPieDataReady }) => {
  const [policyCounts, setPolicyCounts] = useState({
    Car: 0,
    Bike: 0,
    Home: 0,
    Health: 0,
    Life: 0,
    Family: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('Token');

    if (token) {
      axios.get('http://localhost:5050/api/policies', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          const policies = response.data;
          calculatePolicyCounts(policies);
        })
        .catch(error => console.error('Error fetching policy data:', error));
    }
  }, []);

  const calculatePolicyCounts = (policies) => {
    const counts = {
      Car: 0,
      Bike: 0,
      Home: 0,
      Health: 0,
      Life: 0,
      Family: 0,
    };

    policies.forEach(policy => {
      const planType = policy.planType;
      if (planType && counts.hasOwnProperty(planType)) {
        counts[planType] += 1;
      }
    });

    setPolicyCounts(counts);

    const chartData = Object.entries(counts)
      .map(([type, count]) => ({
        name: type,
        value: count,
      }))
      .filter(entry => entry.value > 0);

    onPieDataReady(chartData); // Send data to AdminDashboard
  };

  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold mb-4">Insurance Type Counts</h3>

      <div className="grid grid-cols-2 gap-4 border-2 p-4 rounded-md">
        {Object.entries(policyCounts).map(([type, count]) => (
          <div key={type} className="border p-4 border-black shadow shadow-gray-400">
            <h4 className="text-md font-semibold">{type}</h4>
            <p>{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPolicyCount;
