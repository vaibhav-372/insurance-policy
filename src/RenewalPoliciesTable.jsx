import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

const RenewalPoliciesTable = () => {
    const [rowData] = useState([
        {
            id: 1,
            customerName: 'EROTHI SANTHOSH KUMAR',
            renewalDate: '2024-08-22',
            phoneNo: '9493337173',
            policyNo: '31568375202302.00',
            planType: 'ReAssure Floater 10L ZZ 2A',
            mailId: 'santhu.erothi97@gmail.com',
            status: 'renewed',
        },
        // Add more data here as needed
    ]);

    const [columnDefs] = useState([
        { headerName: 'ID', field: 'id', filter: true },
        { headerName: 'Customer Name', field: 'customerName', filter: true },
        { headerName: 'Renewal Date', field: 'renewalDate', filter: true },
        { headerName: 'Phone No', field: 'phoneNo', filter: true },
        { headerName: 'Policy No', field: 'policyNo', filter: true },
        { headerName: 'Plan Type', field: 'planType', filter: true },
        { headerName: 'Mail ID', field: 'mailId', filter: true },
        { headerName: 'Status', field: 'status', filter: true },
        {
            headerName: 'Actions', field: 'actions', cellRendererFramework: (params) => (
                <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => alert(`Editing policy for ${params.data.customerName}`)}
                >
                    Edit
                </button>
            )
        },
    ]);

    return (
        <div className="ag-theme-balham w-full h-96">
            <center className='font-bold text-3xl '>Renewals</center>

            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ sortable: true, filter: true, resizable: true }}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default RenewalPoliciesTable;
