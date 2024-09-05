import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';


const AgentLoginForm = ({ onSubmit }) => {

    const navigate = useNavigate();

    const openAdminLogin = () => {
      navigate('/admin/login');
    }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, values, isSubmitting }) => (
        <>
          <Form className="p-7 w-1/3 max-w-sm bg-gray-200 h-80 rounded-xl shadow-2xl shadow-gray-500">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                Login
              </button>
              <div className="text-end font-semibold mt-4 text-sm hover:text-base">
                <a className="cursor-pointer" onClick={openAdminLogin}>login as ADMIN</a>
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default AgentLoginForm;
