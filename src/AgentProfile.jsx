import React from 'react';

const AgentProfile = ({ agent }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Agent Profile</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Name:</h3>
          <p className="text-gray-600">{agent.name}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Phone Number:</h3>
          <p className="text-gray-600">{agent.phoneNumber}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Email:</h3>
          <p className="text-gray-600">{agent.email}</p>
        </div>
        {/* Add more fields as needed */}
      </div>
      <div className="mt-6 text-center">
        <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-200">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AgentProfile;
