import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Invalid date';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Invalid date';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};

const PolicyChart = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [editedPolicy, setEditedPolicy] = useState({});
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [selectNav, setSelectNav] = useState('update');

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const agentName = decodedToken.name;

      axios.get('http://localhost:5050/api/policies', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          const agentPolicies = response.data.filter(
            (policy) => policy.agentName === agentName
          );
          setPolicies(agentPolicies);
        })
        .catch((error) => {
          console.error('Error fetching policies:', error);
        });
    }
  }, []);

  const calculateMonthlyPolicies = () => {
    const currentMonth = new Date().getMonth();
    return policies.filter(
      (policy) => new Date(policy.renewalDate).getMonth() === currentMonth
    ).length;
  };

  const calculateYearlyPolicies = () => {
    const currentYear = new Date().getFullYear();
    return policies.filter(
      (policy) => new Date(policy.renewalDate).getFullYear() === currentYear
    ).length;
  };

  const handleUpdateClick = (policy) => {
    setSelectedPolicy(policy);
    setEditedPolicy({ ...policy });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPolicy({ ...editedPolicy, [name]: value });
  };

  const handleUpdateSubmit = () => {
    axios
      .put(`http://localhost:5050/api/policies/${editedPolicy._id}`, editedPolicy)
      .then(() => {
        setPolicies(
          policies.map((policy) =>
            policy._id === editedPolicy._id ? editedPolicy : policy
          )
        );
        setSelectedPolicy(null);
        alert('Policy updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating policy:', error);
        alert('Failed to update policy.');
      });
  };

  const handleCloseModal = () => {
    setSelectedPolicy(null);
  };

  return (
    <div className='w-full px-4'>
      <h2 className="text-2xl font-bold mb-4">Policy Summary</h2>

      <div className="mb-6 space-y-1">
        <p>Total Policies: <strong>{policies.length}</strong></p>
        <p>Policies This Month: <strong>{calculateMonthlyPolicies()}</strong></p>
        <p>Policies This Year: <strong>{calculateYearlyPolicies()}</strong></p>
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={policies}
          columnDefs={[
            { headerName: 'Customer Name', field: 'customerName' },
            { headerName: 'Policy Number', field: 'policyNo' },
            {
              headerName: 'Renewal Date',
              field: 'renewalDate',
              valueFormatter: (params) => formatDate(params.value),
            },
            { headerName: 'Premium Amount', field: 'amount' },
            {
              headerName: 'Details',
              field: 'update',
              cellRenderer: (params) => (
                <button
                  className="bg-slate-500 text-white w-24 h-9 flex items-center justify-center rounded-lg"
                  onClick={() => handleUpdateClick(params.data)}
                >
                  Details
                </button>
              ),
            },
          ]}
          defaultColDef={{ sortable: true, filter: true }}
        />
      </div>

      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-xl max-h-[90vh] overflow-y-auto">
            {/* Modal Navigation */}
            <div className="flex justify-around mb-6">
              {['update', 'renewals'].map((tab) => (
                <div
                  key={tab}
                  className={`text-lg font-medium px-5 py-2 rounded-full cursor-pointer ${
                    selectNav === tab ? 'bg-blue-400 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => setSelectNav(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              ))}
            </div>

            {/* Update Form */}
            {selectNav === 'update' && (
              <>
                <div className="flex items-center mb-4">
                  <label className="mr-3 font-medium">Enable Edit:</label>
                  <input
                    type="checkbox"
                    checked={isEditEnabled}
                    onChange={(e) => setIsEditEnabled(e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>

                <form className="space-y-4">
                  {[
                    { label: 'Customer Name', name: 'customerName', type: 'text' },
                    { label: 'Policy Number', name: 'policyNo', type: 'text', disabled: true },
                    { label: 'Renewal Date', name: 'renewalDate', type: 'date' },
                    { label: 'Premium Amount', name: 'amount', type: 'text' },
                    { label: 'Phone Number', name: 'phoneNo', type: 'text' },
                    { label: 'Email', name: 'mailId', type: 'email' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block font-semibold mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={
                          field.name === 'renewalDate'
                            ? editedPolicy[field.name]?.split('T')[0] || ''
                            : editedPolicy[field.name] || ''
                        }
                        onChange={handleInputChange}
                        disabled={field.disabled || !isEditEnabled}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>
                  ))}

                  <div className="flex justify-end gap-4 pt-4">
                    {isEditEnabled && (
                      <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleUpdateSubmit}
                      >
                        Update
                      </button>
                    )}
                    <button
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Renewals Table */}
            {selectNav === 'renewals' && (
              <>
                <h3 className="text-lg font-semibold mb-3">Renewal History</h3>
                <table className="table-auto w-full mb-4">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Renewal Date</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPolicy.renewals?.length > 0 ? (
                      selectedPolicy.renewals.map((renewal, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{formatDate(renewal.renewalDate)}</td>
                          <td className="border px-4 py-2">{renewal.amount || 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center border px-4 py-2">
                          No renewal history
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyChart;
