import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};

const PolicyChart = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [editedPolicy, setEditedPolicy] = useState({});
  const [isEditEnabled, setIsEditEnabled] = useState(false); // New state to toggle edit mode
  const [selectNav, setSelectNav] = useState("update")

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const agentName = decodedToken.name;

      axios.get('http://localhost:5000/api/policies', {
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
      (policy) => new Date(policy.date).getMonth() === currentMonth
    ).length;
  };

  const calculateYearlyPolicies = () => {
    const currentYear = new Date().getFullYear();
    return policies.filter(
      (policy) => new Date(policy.date).getFullYear() === currentYear
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
      .put(`http://localhost:5000/api/policies/${editedPolicy._id}`, editedPolicy)
      .then((response) => {
        // Update the policy list with the updated policy
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
          {
            headerName: 'Renewal Date',
            field: 'renewalDate',
            filter: 'true',
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

      {selectedPolicy && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3 max-h-screen overflow-y-auto ">
            {/* <div> */}
            <div className="selection-nav flex justify-around my-5">
              <div className="text-xl font-semibold bg-sky-300 p-3 w-44 text-center rounded-2xl cursor-pointer" onClick={() => setSelectNav('update')}>Update</div>
              <div className="text-xl font-semibold bg-sky-300 p-3 w-44 text-center rounded-2xl cursor-pointer" onClick={() => setSelectNav('renewals')}>Renewals</div>
            </div>
            {selectNav === 'update' && (
              <div>
                <div className="mb-4 flex justify-start">
                  <label className="mr-2">Enable Edit:</label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isEditEnabled}
                      onChange={(e) => setIsEditEnabled(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <form>
                  <div className="mb-4">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      name="customerName"
                      value={editedPolicy.customerName}
                      onChange={handleInputChange}
                      disabled={!isEditEnabled}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Policy Number</label>
                    <input
                      type="text"
                      name="policyNo"
                      value={editedPolicy.policyNo}
                      onChange={handleInputChange}
                      disabled={!isEditEnabled}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Renewal Date</label>
                    <input
                      type="date"
                      name="renewalDate"
                      value={editedPolicy.renewalDate.split('T')[0]} // Ensure proper formatting for date input
                      onChange={handleInputChange}
                      disabled={!isEditEnabled}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Premium Amount</label>
                    <input
                      type="text"
                      name="amount"
                      value={editedPolicy.amount}
                      onChange={handleInputChange}
                      disabled={!isEditEnabled}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phoneNo"
                      value={editedPolicy.phoneNo}
                      onChange={handleInputChange}
                      disabled={!isEditEnabled}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Email</label>
                    <input
                      type="email"
                      name="mailId"
                      value={editedPolicy.mailId}
                      onChange={handleInputChange}
                      disabled={!isEditEnabled}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Plan Type</label>
                    <input
                      type="text"
                      name="planType"
                      value={editedPolicy.planType}
                      onChange={handleInputChange}
                      disabled="true"
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleUpdateSubmit}
                      disabled={!isEditEnabled}
                      className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                    >
                      Update Policy
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            {/* </div> */}

            {/* Renewal Section */}
            {selectNav === 'renewals' && (
              <div>
                <h4 className="font-semibold mb-2">Renewal</h4>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Registered Date</td>
                      <td className="border px-4 py-2">
                        {formatDate(selectedPolicy.date)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Policy Amount</td>
                      <td className="border px-4 py-2">
                        {selectedPolicy.amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyChart;
