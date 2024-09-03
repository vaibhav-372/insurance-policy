import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AgentLoginForm from './AgentLoginForm';

const AgentLogin = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    axios.post('http://localhost:5000/api/agents/login', values)
      .then(response => {
        alert('Login successful');
        localStorage.setItem('Token', response.data.token); // Store token
        // setIsAuthenticated(true); // Update context state
        navigate('/dashboard'); // Redirect to dashboard
      })
      .catch(error => {
        if (error.response && error.response.data.message) {
          setErrors({ password: error.response.data.message });
        } else {
          console.error('There was an error during login:', error);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });

  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <AgentLoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AgentLogin;
