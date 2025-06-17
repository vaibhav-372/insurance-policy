import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'AllPolicies', icon: 'fas fa-file-alt' },
    { name: 'AddAgent', icon: 'fas fa-user-plus' },
    { name: 'AgentList', icon: 'fas fa-user-circle' },
    { name: 'Renewals', icon: 'fas fa-calendar-check' },
    // { name: 'ContactUsMessages', icon: 'fas fa-envelope' },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove the admin token
    navigate('/admin/login'); // Redirect to the admin login page
  };

  return (
    <div className="w-64 bg-teal-400 text-black font-medium h-full">
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
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`py-3 px-6 cursor-pointer transition-colors duration-200 ${
                activeComponent === item.name
                  ? 'bg-teal-500' 
                  : 'hover:bg-teal-600'
              }`}
              onClick={() => setActiveComponent(item.name)}
            >
              <i className={`${item.icon} mr-3`}></i> {item.name}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6">
        <button
          className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition duration-200"
          onClick={handleLogout} // Handle logout
        >
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
