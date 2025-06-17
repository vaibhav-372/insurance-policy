import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AgentList = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [columnDefs] = useState([
    { headerName: 'Agent Name', field: 'name', filter: true, cellStyle: { height: "40px" } },
    { headerName: 'Email', field: 'email', filter: true },
    {
      headerName: 'Update',
      field: 'update',
      cellRenderer: (params) => (
        <button
          className="text-blue-600 hover:text-blue-900 underline"
          onClick={() => handleUpdateClick(params.data)}
        >
          Update
        </button>
      ),
    }
  ]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/agents/');
        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching agents list', error);
      }
    };

    fetchAgents();
  }, []);

  const onGridReady = (params) => {
    gridRef.current = params.api;
    params.api.sizeColumnsToFit();
  };

  const handleUpdateClick = (agent) => {
    setSelectedAgent(agent);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5050/api/agents/${selectedAgent._id}`, values);
      setRowData(rowData.map((agent) => (agent._id === selectedAgent._id ? response.data : agent)));
      setSelectedAgent(null);
    } catch (error) {
      console.error('Error updating agent:', error);
    }
  };

  return (
    <div className="w-full relative">
      <h1 className="font-bold text-3xl text-center mb-7">Agents List</h1>

      <div className="ag-theme-balham h-96 mb-8">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
          pagination={true}
          paginationPageSize={10}
          onGridReady={onGridReady}
        />
      </div>

      {/* Modal Popup */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Update Agent</h2>

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
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      disabled={isSubmitting}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => setSelectedAgent(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Optional: Close button in top right */}
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
              onClick={() => setSelectedAgent(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentList;
