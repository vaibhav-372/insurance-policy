import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import axios from 'axios';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};

const PoliciesTable = () => {
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { headerName: 'Agent', field: 'agentName', filter: true },
    { headerName: 'Customer Name', field: 'customerName', filter: true },
    { 
      headerName: 'Application Date', 
      field: 'date', 
      filter: true,
      valueFormatter: params => formatDate(params.value)
    },
    { headerName: 'Phone No', field: 'phoneNo', filter: true },
    { headerName: 'Policy No', field: 'policyNo', filter: true },
    { headerName: 'Plan Type', field: 'planType', filter: true },
    { headerName: 'Mail ID', field: 'mailId', filter: true },
    { 
      headerName: 'Renewal Date', 
      field: 'renewalDate', 
      filter: true,
      valueFormatter: params => formatDate(params.value)
    },
    { headerName: 'Premium Amount', field: 'amount', filter: true },
  ]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/policies', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('Token')}`
          }
        });
        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching policies', error);
      }
    };

    fetchPolicies();
  }, []);

  return (
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
          All Policies
        </h1>
        
        <div className="ag-theme-balham" style={{ height: '600px', width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: true, filter: true, resizable: true }}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[5, 10, 25, 50]}
          />
        </div>
      </div>
  );
};

export default PoliciesTable;
