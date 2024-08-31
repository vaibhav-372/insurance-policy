import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [policyData, setPolicyData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [totalPolicies, setTotalPolicies] = useState(0);
  const [monthlyPolicies, setMonthlyPolicies] = useState(0);
  const [yearlyPolicies, setYearlyPolicies] = useState(0);

  useEffect(() => {
    // Fetch policy data
    axios.get('http://localhost:5000/api/policies')
      .then(response => {
        setPolicyData(response.data);
        calculatePolicyStats(response.data);
      })
      .catch(error => console.error('Error fetching policy data:', error));

    // Fetch agent data
    axios.get('http://localhost:5000/api/agents')
      .then(response => {
        setAgentData(response.data);
      })
      .catch(error => console.error('Error fetching agent data:', error));
  }, []);

  const calculatePolicyStats = (policies) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthly = policies.filter(policy =>
      new Date(policy.date).getMonth() === currentMonth &&
      new Date(policy.date).getFullYear() === currentYear
    ).length;

    const yearly = policies.filter(policy =>
      new Date(policy.date).getFullYear() === currentYear
    ).length;

    setTotalPolicies(policies.length);
    setMonthlyPolicies(monthly);
    setYearlyPolicies(yearly);
  };

  const policyDataForChart = {
    labels: ['Total Policies', 'Monthly Policies', 'Yearly Policies'],
    datasets: [{
      data: [totalPolicies, monthlyPolicies, yearlyPolicies],
      backgroundColor: ['#FF6384', '#36A2EB ', '#FFCE56']
    }]
  };

  const agentDataForChart = {
    labels: ['Total Agents'],
    datasets: [{
      data: [agentData.length],
      backgroundColor: ['#FF6384']
    }]
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <Pie data={policyDataForChart} />
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <Pie data={agentDataForChart} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
