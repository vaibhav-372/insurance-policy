import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddAgentForm = () => {
  // Formik hook to manage form state and validation
  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, 'Name must be 50 characters or less')
        .required('Name Required'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Ph.no Required'),
        email: Yup.string()
        .email()
        .required('Email Required'),
    }),
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
      // You can send form values to your backend or handle them as needed
    },
  });

  return (
    <div className="w-2/4  bg-gray-400 shadow-3xl rounded-lg p-10 ">
      <h2 className="text-xl font-bold mb-4">Add Agent</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
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
          <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            className={`w-full p-2 border rounded-lg ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
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

        <button
          type="submit"
          className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-200"
        >
          Add Agent
        </button>
      </form>
    </div>
  );
};

export default AddAgentForm;
