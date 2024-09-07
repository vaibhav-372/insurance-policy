import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './AgentDashboard';
import AddPolicyForm from './AddPolicyForm';
import PolicyChart from './PolicyChart';
import CurrentMonthRenewals from './agentCurrentMonthRenewals';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../AuthContext';


const AgentApp = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [user, setUser] = useState({ email: "", name: "" });
  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('Token');
    // console.log('Token in useEffect:', token);

    if (!token) {
      navigate('/agent/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        // console.log('Decoded Token:', decodedToken); // For debugging
        setUser({ email: decodedToken.email, name: decodedToken.name });
        // console.log('Decoded Token Name : ', decodedToken.name);
        navigate('/agent/dashboard')
      } catch (error) {
        console.error('Error decoding token:', error);
        // Optionally handle token decoding error or redirection here
        navigate('/agent/login');
      }
    }
  }, [navigate]);


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

  const handleLogout = () => {
    logout();
    navigate('/agent/login');
  };

  return (
    <div className="flex items-center w-full flex-col">
      {/* Sidebar Navigation */}
      <nav className="w-full h-24 flex bg-gray-800 text-white p-4 fixed z-10">
        <div className="mb-4 flex items-center">
          <img
            src="https://imgs.search.brave.com/D3N5sM1r3FBF29P55ZOmbDuDuiDxL-WBr6KElInf_BY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDUzMjkz/MzMuanBn"
            alt="agent avatar"
            className="w-52 h-24 p-3 rounded-full"
          />
          <div className='flex flex-col ml-3'>
            <p className="font-bold text-3xl text-nowrap">Welcome {user.name}</p>
            <p className='font-bold'>{user.email}</p>
          </div>
        </div>
        <ul className=' flex justify-end w-full items-center m-5'>
          <li
            className={`p-2  cursor-pointer hover:bg-gray-700 ${activeComponent === 'dashboard' ? 'bg-gray-700' : ''}`}           
            onClick={() => setActiveComponent('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={`p-2  cursor-pointer hover:bg-gray-700 ${activeComponent === 'addPolicy' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveComponent('addPolicy')}
          >
            Add Policy
          </li>
          <li
            className={`p-2  hover:"bg-gray-700 border-2" cursor-pointer ${activeComponent === 'policyChart' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveComponent('policyChart')}
          >
            Policy Chart
          </li>
          <li
            className={`p-2  hover:bg-gray-700 cursor-pointer ${activeComponent === 'renewals' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveComponent('renewals')}
          >
            Renewals
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-28 bg-red-500 py-2 rounded-lg hover:bg-red-600 transition duration-200">
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </li>
        </ul>
      </nav>
      {/* Main Content */}
      <main className="w-3/4 bg-gray-200 p-6 mt-32 flex justify-center">
        {renderComponent()}
      </main>
    </div>
  );
};

export default AgentApp;
