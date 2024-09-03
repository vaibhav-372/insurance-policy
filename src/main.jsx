import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import AgentApp from './agent/agentApp.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <AgentApp /> */}
  </StrictMode>,
)



// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './index.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import App from './App.jsx';
// import AgentApp from './agent/agentApp.jsx';
// import AgentLogin from './agent/agentLogin.jsx';
// import PrivateRoute from './PrivateRoute';
// import { AuthProvider } from './AuthContext'; // Import AuthProvider

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<AgentApp />} />
//           <Route path="/login" element={<AgentLogin />} />
//           <Route path="/dashboard" element={<PrivateRoute ><AgentApp /></PrivateRoute>} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   </StrictMode>
// );
