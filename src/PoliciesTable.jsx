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
    { headerName: 'Customer Name', field: 'customerName', filter: true },
    { 
      headerName: 'Application Date', 
      field: 'date', 
      filter: true,
      valueFormatter: params => formatDate(params.value) // Format the date
    },
    { headerName: 'Phone No', field: 'phoneNo', filter: true },
    { headerName: 'Policy No', field: 'policyNo', filter: true },
    { headerName: 'Plan Type', field: 'planType', filter: true },
    { headerName: 'Mail ID', field: 'mailId', filter: true },
    { 
      headerName: 'Renewal Date', 
      field: 'renewalDate', 
      filter: true,
      valueFormatter: params => formatDate(params.value) // Format the renewal date
    },
    { headerName: 'Status', field: 'status', filter: true },
    { headerName: 'message', field: 'message', filter: true },
  ]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/policies');
        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching policies', error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div className="ag-theme-balham w-full h-96">
      <center className='font-bold text-3xl mb-7'>All Policies</center>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[5,10, 25, 50]}

      />
    </div>
  );
};

export default PoliciesTable;
