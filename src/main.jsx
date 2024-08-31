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
