import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const AddAgentForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, 'Name must be 50 characters or less')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Submitting form:', values);
      axios.post('http://localhost:5050/api/agents', values)
        .then(response => {
          console.log('Response received:', response); // Log the entire response object
          resetForm();
          console.log('Agent added:', response.data);
        })
        .catch(error => {
          console.error('There was an error adding the agent!', error);
        });
    },
  });

  return (
    <div className='w-full flex justify-center'>
      <div className="w-2/4 bg-gray-400 shadow-3xl flex flex-col rounded-lg p-10">
        <h2 className="text-xl font-bold mb-4 text-center">Add Agent</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className={`w-full p-2 border rounded-lg ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full p-2 border rounded-lg ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">password</label>
            <input
              id="password"
              name="password"
              type="password"
              className={`w-full p-2 border rounded-lg ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            Add Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAgentForm;
