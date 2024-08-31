import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddPolicyForm = () => {
  const initialValues = {
    customerName: '',
    phoneNo: '',
    email: '',
    policyNo: '',
    renewalDate: '',
  };

  const validationSchema = Yup.object({
    customerName: Yup.string()
      .max(50, 'Name must be 50 characters or less')
      .required('Customer name is required'),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    policyNo: Yup.string()
      .required('Policy number is required'),
    renewalDate: Yup.date()
      .required('Renewal date is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const policyData = {
      ...values,
      date: currentDate,
    };

    axios.post('http://localhost:5000/api/policies', policyData)
      .then(response => {
        resetForm();
        alert(`Policy added successfully:\nCustomer Name: ${response.data.customerName}\nPolicy Number: ${response.data.policyNo}`);
      })
      .catch(error => {
        console.error('There was an error adding the policy!', error);
      });
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-gray-100 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Policy</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="customerName" className="block text-gray-700 font-medium mb-2">Customer Name</label>
              <Field
                id="customerName"
                name="customerName"
                type="text"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNo" className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <Field
                id="phoneNo"
                name="phoneNo"
                type="text"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage name="phoneNo" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="policyNo" className="block text-gray-700 font-medium mb-2">Policy Number</label>
              <Field
                id="policyNo"
                name="policyNo"
                type="text"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage name="policyNo" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="renewalDate" className="block text-gray-700 font-medium mb-2">Renewal Date</label>
              <Field
                id="renewalDate"
                name="renewalDate"
                type="date"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage name="renewalDate" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-200 w-full"
              disabled={isSubmitting}
            >
              Add Policy
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPolicyForm;
