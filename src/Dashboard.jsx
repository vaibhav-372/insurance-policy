import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [totalPolicies, setTotalPolicies] = useState(0);
  const [totalAgents, setTotalAgents] = useState(0);
  const [yearlyPolicies, setYearlyPolicies] = useState([]);
  const [monthlyPolicies, setMonthlyPolicies] = useState([]);

  useEffect(() => {
    // Fetch the total policies and agents, and the yearly and monthly data from your API or database
    setTotalPolicies(120); // Replace with API call
    setTotalAgents(50);    // Replace with API call
    setYearlyPolicies([
      { year: '2020', count: 80 },
      { year: '2021', count: 100 },
      { year: '2022', count: 120 },
    ]); // Replace with API call
    setMonthlyPolicies([
      { month: 'Jan', count: 10 },
      { month: 'Feb', count: 12 },
      { month: 'Mar', count: 15 },
      { month: 'apr', count: 37 },
      // Add more monthly data
    ]); // Replace with API call
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      
      <div className="flex justify-between mb-10">
        <div className="bg-blue-500 text-white p-5 rounded-lg shadow-md w-1/2 mr-2">
          <h3 className="text-lg font-semibold">Total Policies</h3>
          <p className="text-3xl">{totalPolicies}</p>
        </div>
        <div className="bg-green-500 text-white p-5 rounded-lg shadow-md w-1/2 ml-2">
          <h3 className="text-lg font-semibold">Total Agents</h3>
          <p className="text-3xl">{totalAgents}</p>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4">Yearly Policies</h3>
        <BarChart width={600} height={300} data={yearlyPolicies}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Monthly Policies</h3>
        <BarChart width={600} height={300} data={monthlyPolicies}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
