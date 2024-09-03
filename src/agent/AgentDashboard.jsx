import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AgentDashboard = () => {
  const [totalPolicies, setTotalPolicies] = useState(0);
  const [yearlyPolicies, setYearlyPolicies] = useState(0);
  const [currentMonthPolicies, setCurrentMonthPolicies] = useState(0);
  const [policiesByYear, setPoliciesByYear] = useState([]);
  const [monthlyPolicies, setMonthlyPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('Token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const agentName = decodedToken.name;

      axios.get('http://localhost:5000/api/policies', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          const agentPolicies = response.data.filter(policy => policy.agentName === agentName);
          calculateStats(agentPolicies);
        })
        .catch(error => console.error('Error fetching policy data:', error));
    } else {
      navigate("/login");
    }

  }, [navigate]);

  const calculateStats = (policies) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const yearly = policies.filter(policy =>
      new Date(policy.date).getFullYear() === currentYear
    ).length;

    const monthly = policies.filter(policy =>
      new Date(policy.date).getMonth() === currentMonth &&
      new Date(policy.date).getFullYear() === currentYear
    ).length;

    const policiesByYear = policies.reduce((acc, policy) => {
      const year = new Date(policy.date).getFullYear();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});

    const monthlyPolicies = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'long' }),
      count: policies.filter(policy =>
        new Date(policy.date).getFullYear() === currentYear &&
        new Date(policy.date).getMonth() === i
      ).length
    }));

    setTotalPolicies(policies.length);
    setYearlyPolicies(yearly);
    setCurrentMonthPolicies(monthly);
    setPoliciesByYear(Object.keys(policiesByYear).map(year => ({
      year,
      count: policiesByYear[year]
    })));
    setMonthlyPolicies(monthlyPolicies);
  };

  const pieData = [
    { name: 'Total Policies', value: totalPolicies },
    { name: 'Yearly Policies', value: yearlyPolicies },
    { name: 'Current Month Policies', value: currentMonthPolicies },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#e744ff'];

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-6">Agent Dashboard</h2>

      <div className="flex justify-center mb-10 w-[750px]">
        <PieChart width={700} height={400}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4">Policies by Year</h3>
        <BarChart width={600} height={300} data={policiesByYear}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Policies in Current Year by Month</h3>
        <BarChart width={600} height={300} data={monthlyPolicies}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default AgentDashboard;
