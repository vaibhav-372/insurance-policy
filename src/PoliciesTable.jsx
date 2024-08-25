import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import axios from 'axios';

const PoliciesTable = () => {
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { headerName: 'Customer Name', field: 'customerName', filter: true },
    { headerName: 'Application Date', field: 'date', filter: true },
    { headerName: 'Phone No', field: 'phoneNo', filter: true },
    { headerName: 'Policy No', field: 'policyNo', filter: true },
    { headerName: 'Plan Type', field: 'planType', filter: true },
    { headerName: 'Mail ID', field: 'mailId', filter: true },
    { headerName: 'Renewal Date', field: 'renewalDate', filter: true },
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
      <center className='font-bold text-3xl '>All Policies</center>
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
