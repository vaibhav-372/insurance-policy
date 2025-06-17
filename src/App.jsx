import React, { useState } from 'react';
import Sidebar from './admin/Sidebar';
import PoliciesTable from './admin/PoliciesTable';
import RenewalPoliciesTable from './admin/RenewalPoliciesTable';
import AddAgentForm from './admin/AddAgentForm';
import AgentList from './admin/AgentsList';
import Dashboard from './admin/AdminDashboard';

function App() {
  const [activeComponent, setActiveComponent] = useState('AddPolicy');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'AllPolicies':
        return <PoliciesTable />;
      case 'Renewals':
        return <RenewalPoliciesTable />
      case 'AddAgent':
        return <AddAgentForm />
      case 'AgentList':
        return <AgentList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="fixed h-full">
        <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      </div>
      <div className="ml-[20%] w-3/4 m-10 p-10">
        {renderComponent()}
      </div>
    </div>

  );
}

export default App;
