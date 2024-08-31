import React, { useState } from 'react';
import Dashboard from './AgentDashboard';
import AddPolicyForm from './AddPolicyForm';
import PolicyChart from './PolicyChart';
import CurrentMonthRenewals from './agentCurrentMonthRenewals';

const AgentApp = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'addPolicy':
        return <AddPolicyForm />;
      case 'policyChart':
        return <PolicyChart />;
      case 'renewals':
        return <CurrentMonthRenewals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-1/4 bg-gray-800 text-white p-4">
        <ul>
          <li
            className={`p-2 cursor-pointer ${activeComponent === 'dashboard' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveComponent('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={`p-2 cursor-pointer ${activeComponent === 'addPolicy' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveComponent('addPolicy')}
          >
            Add Policy
          </li>
          <li
            className={`p-2 cursor-pointer ${activeComponent === 'policyChart' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveComponent('policyChart')}
          >
            Policy Chart
          </li>
          <li
            className={`p-2 cursor-pointer ${activeComponent === 'renewals' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveComponent('renewals')}
          >
            Renewals
          </li>
        </ul>
      </nav>
      {/* Main Content */}
      <main className="w-3/4 bg-gray-100 p-6">
        {renderComponent()}
      </main>
    </div>
  );
};

export default AgentApp;
