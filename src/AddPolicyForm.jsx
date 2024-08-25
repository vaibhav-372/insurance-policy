import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import * as Yup from 'yup';

const AddPolicyForm = () => {
  const initialValues = {
    customerName: '',
    renewalDate: '',
    phoneNo: '',
    policyNo: '',
    planType: '',
    mailId: '',
    status: '',
    message: '',
  };

  const validationSchema = Yup.object({
    customerName: Yup.string().required('Customer Name is required'),
    renewalDate: Yup.date().required('Renewal Date is required'),
    phoneNo: Yup.string()
      .required('Phone Number is required')
      .matches(/^[0-9]+$/, 'Phone Number must be digits only'),
    policyNo: Yup.string().required('Policy Number is required'),
    planType: Yup.string().required('Plan Type is required'),
    mailId: Yup.string().email('Invalid email').required('Mail ID is required'),
    status: Yup.string(),
    message: Yup.string(),
  });

  const onSubmit = async (values, { resetForm }) => {
    const formattedValues = {
      ...values,
      renewalDate: new Date(values.renewalDate)
    };

    try {
      const response = await axios.post('http://localhost:5000/api/policies', formattedValues);
      // console.log('Policy saved', response.data);
      resetForm();
    } catch (error) {
      console.error('Error saving policy', error);
    }
  };

  return (
    <div className="w-full bg-gray-400 shadow-3xl rounded-lg p-10 ">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Add New Policy</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, values, isSubmitting }) => (
          <Form>
            <div className="mb-6">
              <label htmlFor="customerName" className="block text-gray-800 font-medium mb-2">Customer Name</label>
              <Field
                type="text"
                id="customerName"
                name="customerName"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 focus:border-transparent transition duration-200"
              />
              <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <div className="mb-6">
              <label htmlFor="renewalDate" className="block text-gray-800 font-medium mb-2">Renewal Date</label>
              <Field
                type="date"
                id="renewalDate"
                name="renewalDate"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 focus:border-transparent transition duration-200"
              />
              <ErrorMessage name="renewalDate" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <div className="mb-6">
              <label htmlFor="phoneNo" className="block text-gray-800 font-medium mb-2">Phone No</label>
              <Field
                type="text"
                id="phoneNo"
                name="phoneNo"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 focus:border-transparent transition duration-200"
              />
              <ErrorMessage name="phoneNo" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <div className="mb-6">
              <label htmlFor="policyNo" className="block text-gray-800 font-medium mb-2">Policy No</label>
              <Field
                type="text"
                id="policyNo"
                name="policyNo"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 focus:border-transparent transition duration-200"
              />
              <ErrorMessage name="policyNo" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <div className="mb-6">
              <label htmlFor="planType" className="block text-gray-800 font-medium mb-2">Plan Type</label>
              <Field
                type="text"
                id="planType"
                name="planType"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 focus:border-transparent transition duration-200"
              />
              <ErrorMessage name="planType" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <div className="mb-6">
              <label htmlFor="mailId" className="block text-gray-800 font-medium mb-2">Mail ID</label>
              <Field
                type="email"
                id="mailId"
                name="mailId"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 focus:border-transparent transition duration-200"
              />
              <ErrorMessage name="mailId" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <div className="mb-6">
              <label htmlFor="status" className="block text-gray-800 font-medium mb-2">Status</label>
              <Field
                type="text"
                id="status"
                name="status"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 focus:border-transparent transition duration-200"
              />
              <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-800 font-medium mb-2">Message</label>
              <Field
                as="textarea"
                id="message"
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 focus:border-transparent transition duration-200 resize-none"
              />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPolicyForm;
