import React, { useState } from 'react';
import AddPolicyForm from './AddPolicyForm';
import Sidebar from './Sidebar';
import PoliciesTable from './PoliciesTable';
import RenewalPoliciesTable from './RenewalPoliciesTable';
import AddAgentForm from './AddAgentForm';
import AgentList from './AgentsList';
import Dashboard from './AdminDashboard';

function App() {
  const [activeComponent, setActiveComponent] = useState('AddPolicy');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      // case 'AddPolicy':
      //   return <AddPolicyForm />;
      case 'AllPolicies':
        return <PoliciesTable />;
      case 'Renewals':
        return <RenewalPoliciesTable />
      case 'AddAgent':
        return <AddAgentForm />
      case 'AgentList':
        return <AgentList />;
      default:
        return <AddPolicyForm />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 flex">
      <div className="fixed w-1/4">
        <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      </div>
      <div className="ml-[25%] w-3/4 m-10 p-10">
        {renderComponent()}
      </div>
    </div>

  );
}

export default App;
