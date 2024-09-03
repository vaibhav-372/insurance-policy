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


const RenewalPoliciesTable = () => {
    const [rowData, setRowData] = useState([]);

    const [columnDefs] = useState([
        { headerName: 'Name', field: 'customerName', filter: true },
        { headerName: 'Phone No', field: 'phoneNo', filter: true, },
        {
            headerName: 'Renewal Date',
            field: 'renewalDate',
            filter: true,
            valueFormatter: params => formatDate(params.value), // Format the date
            sort: 'desc'
        },
    ]);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/policies', {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('Token')}`
                    }
                  });
                setRowData(response.data);
            } catch (error) {
                console.error('Error fetching policies:', error);
            }
        };

        fetchPolicies();
    }, []);

    return (
        <div className="ag-theme-balham w-full h-96">
            <center className='font-bold text-3xl '>Renewals</center>

            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ sortable: true, filter: true, resizable: true }}
                pagination={true}
                paginationPageSize={10}
                onGridReady={(params) => {
                    params.api.sizeColumnsToFit();
                    params.api.getSortModel().push({ colId: 'renewalDate', sort: 'asc' }); // Sort by renewalDate in ascending order
                }}
            />
        </div>
    );
};

export default RenewalPoliciesTable;
