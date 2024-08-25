import React, { useState } from 'react';
import AddPolicyForm from './AddPolicyForm';
import Sidebar from './Sidebar';
import PoliciesTable from './PoliciesTable';
import RenewalPoliciesTable from './RenewalPoliciesTable';
import AddAgentForm from './AddAgentForm';
import AgentProfile from './AgentProfile';

function App() {
  const [activeComponent, setActiveComponent] = useState('AddPolicy');

  const mockAgent = {
    name: 'John Doe',
    phoneNumber: '1234567890',
    email: 'johndoe@example.com',
    avatar: '', // URL of agent's avatar image
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'AddPolicy':
        return <AddPolicyForm />;
      case 'AllPolicies':
        return <PoliciesTable />;
      case 'Renewals':
        return <RenewalPoliciesTable />
      case 'AddAgent':
        return <AddAgentForm />
      case 'AgentProfile':
        return <AgentProfile agent={mockAgent} />;  
      default:
        return <AddPolicyForm />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 flex">
      <div>
        <Sidebar setActiveComponent={setActiveComponent} />
      </div>
      <div className="w-2/3 m-10 p-10 flex items-center justify-center">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
