import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';

const PolicyChart = () => {
  const [policies, setPolicies] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/policies')
      .then(response => {
        setPolicies(response.data);
      })
      .catch(error => {
        console.error('Error fetching policies:', error);
      });
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
          { headerName: 'Renewal Date', field: 'renewalDate', filter: 'agDateColumnFilter' },
          { headerName: 'Status', field: 'status' }
        ]}
        defaultColDef={{ sortable: true, filter: true }}
      />
    </div>
  );
};

export default PolicyChart;
