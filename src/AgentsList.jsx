import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import axios from 'axios';

const AgentList = () => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { headerName: 'Agent Name', field: 'name', filter: true },
    { headerName: 'Phone Number', field: 'phoneNumber', filter: true },
    { headerName: 'Email', field: 'email', filter: true },
  ]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agents/');
        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching agents list', error);
      }
    };

    fetchAgents();
  }, []);

  const onGridReady = (params) => {
    gridRef.current = params.api;
    params.api.sizeColumnsToFit(); // Automatically size the columns to fit the grid
  };

  return (
    <div className="ag-theme-balham w-full h-96">
      <center className='font-bold text-3xl mb-7'>Agents List</center>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5,10, 25, 50]}
          onGridReady={onGridReady}
        />
    </div>
  );
};

export default AgentList;
