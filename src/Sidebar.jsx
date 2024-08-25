import React from 'react';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="w-64 bg-teal-600 text-white font-medium h-full">
      <div className="p-4 text-center flex flex-col items-center">
        <img
          src="https://imgs.search.brave.com/D3N5sM1r3FBF29P55ZOmbDuDuiDxL-WBr6KElInf_BY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDUzMjkz/MzMuanBn"
          alt="admin avatar"
          className="w-24 h-24 rounded-full"
        />
        <h3 className="mt-4 text-lg font-semibold">admin</h3>
        <p className="text-sm">Admin Dashboard</p>
      </div>
      <nav className="flex-grow mt-6">
        <ul>
          <li
            className="py-3 px-6 hover:bg-cyan-400 cursor-pointer transition-colors duration-200"
            onClick={() => setActiveComponent('Dashboard')}
          >
            <i className="fas fa-tachometer-alt mr-3"></i> Dashboard
          </li>
          <li
            className="py-3 px-6 hover:bg-cyan-400 cursor-pointer transition-colors duration-200"
            onClick={() => setActiveComponent('AddPolicy')}
          >
            <i className="fas fa-plus-circle mr-3"></i> Add Policy
          </li>
          <li
            className="py-3 px-6 hover:bg-cyan-400 cursor-pointer transition-colors duration-200"
            onClick={() => setActiveComponent('AllPolicies')}
          >
            <i className="fas fa-file-alt mr-3"></i> All Policies
          </li>
          <li
            className="py-3 px-6 hover:bg-cyan-400 cursor-pointer transition-colors duration-200"
            onClick={() => setActiveComponent('Renewals')}
          >
            <i className="fas fa-calendar-check mr-3"></i> Renewals
          </li>
          <li
            className="py-3 px-6 hover:bg-cyan-400 cursor-pointer transition-colors duration-200"
            onClick={() => setActiveComponent('AddAgent')}
          >
            <i className="fas fa-user-plus mr-3"></i> Add Agent
          </li>
          <li
            className="py-3 px-6 hover:bg-cyan-400 cursor-pointer transition-colors duration-200"
            onClick={() => setActiveComponent('AgentProfile')}
          >
            <i className="fas fa-user-circle mr-3"></i> Agent Profile
          </li>
          <li
            className="py-3 px-6 hover:bg-cyan-400 cursor-pointer transition-colors duration-200"
            onClick={() => setActiveComponent('ContactUsMessages')}
          >
            <i className="fas fa-envelope mr-3"></i> Contact Us Messages
          </li>
        </ul>
      </nav>
      <div className="p-6">
        <button className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition duration-200">
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
