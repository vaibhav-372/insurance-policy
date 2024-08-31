import React from 'react';
import { useFormik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgentLogin = () => {
  const navigate = useNavigate(); // Hook for navigation

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      axios.post('http://localhost:5000/api/agents/login', values)
        .then(response => {
          alert('Login successful');
          console.log('Login successful:', response.data);

          // Redirect to dashboard
          navigate('/dashboard');
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
    },
  });

  return (
    <div className="w-full max-w-xs mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Agent Login</h2>
      <Form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
          />
          <ErrorMessage name="email" component="p" className="text-red-500 text-xs italic mt-2" />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <Field
            id="password"
            name="password"
            type="password"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
          />
          <ErrorMessage name="password" component="p" className="text-red-500 text-xs italic mt-2" />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AgentLogin;
