import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      axios.post('http://localhost:5000/api/admin/login', values)
        .then(response => {
          alert('Login successful');
          localStorage.setItem('adminToken', response.data.token); // Store the JWT token
          navigate('/admin/dashboard'); // Redirect to admin dashboard
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-4 text-center font-semibold">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500 text-xs italic">{formik.errors.username}</p>
            ) : null}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
