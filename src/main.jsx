// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import AgentApp from './agent/agentApp.jsx';
// import AdminLogin from './admin/AdminLogin.jsx';


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* <App /> */}
//     <AdminLogin/>
//     {/* <AgentApp /> */}
//   </StrictMode>,
// )



import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.jsx';
import AgentApp from './agent/agentApp.jsx';
import AgentLogin from './agent/agentLogin.jsx';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import AdminLogin from './admin/AdminLogin.jsx';
import AdminPrivateRoute from './admin/AdminPrivateRoute.jsx';
import LandingPage from './landing/LandingPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/agent/login" element={<AgentLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminPrivateRoute>
                <App />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/agent/dashboard"
            element={
              <PrivateRoute >
                <AgentApp />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);
