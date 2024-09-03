import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const AgentList = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [columnDefs] = useState([
    { headerName: 'Agent Name', field: 'name', filter: true, cellStyle:{height:"40px"}},
    { headerName: 'Email', field: 'email', filter: true },
    {
      headerName: 'Update',
      field: 'update',
      cellRenderer: (params) => {
        return (
          <button
            // style={{ backgroundColor: 'blue', color: 'white', padding: '5px', borderRadius: '5px' }}
            className='bg-slate-500 text-white p-1 rounded-lg'
            onClick={() => handleUpdateClick(params.data)}
          >
            Update
          </button>
        );
      },
    }
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

  const handleUpdateClick = (agent) => {
    setSelectedAgent(agent);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/agents/${selectedAgent._id}`, values);
      setRowData(rowData.map((agent) => (agent._id === selectedAgent._id ? response.data : agent)));
      setSelectedAgent(null); // Close the form after successful update
    } catch (error) {
      console.error('Error updating agent:', error);
    }
  };

  return (
    <div className="w-full">
      <center className='font-bold text-3xl mb-7'>Agents List</center>
      <div className="ag-theme-balham h-96 mb-8">
        <AgGridReact
          // cellstyle={cellStyle}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
          pagination={true}
          paginationPageSize={10}
          onGridReady={onGridReady}
        />
      </div>

      {selectedAgent && (
        <div className="p-4 bg-gray-100 border rounded-md shadow-md">
          <Formik
            initialValues={{
              name: selectedAgent.name,
              email: selectedAgent.email,
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Name is required'),
              email: Yup.string().email('Invalid email address').required('Email is required'),
            })}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    disabled={isSubmitting}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => setSelectedAgent(null)}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default AgentList;
