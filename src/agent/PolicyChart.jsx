import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};


const PolicyChart = () => {
  const [policies, setPolicies] = useState([]);

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
          setPolicies(agentPolicies);
        })
        .catch(error => {
          console.error('Error fetching policies:', error);
        });
    }
  }, []);

  const calculateMonthlyPolicies = () => {
    const currentMonth = new Date().getMonth();
    return policies.filter(policy => new Date(policy.date).getMonth() === currentMonth).length;
  };

  const calculateYearlyPolicies = () => {
    const currentYear = new Date().getFullYear();
    return policies.filter(policy => new Date(policy.date).getFullYear() === currentYear).length;
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <h2 className="text-2xl font-bold mb-4">Policy Summary</h2>
      <div className="mb-4">
        <p>Total Policies: {policies.length}</p>
        <p>Policies This Month: {calculateMonthlyPolicies()}</p>
        <p>Policies This Year: {calculateYearlyPolicies()}</p>
      </div>

      <AgGridReact
        rowData={policies}
        columnDefs={[
          { headerName: 'Customer Name', field: 'customerName' },
          { headerName: 'Policy Number', field: 'policyNo' },
          {
            headerName: 'Renewal Date',
            field: 'renewalDate',
            filter: 'true',
            valueFormatter: params => formatDate(params.value), // Format the date
          },
          { headerName: 'Status', field: 'status' }
        ]}
        defaultColDef={{ sortable: true, filter: true }}
      />
    </div>
  );
};

export default PolicyChart;
