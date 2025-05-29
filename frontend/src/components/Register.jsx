import React from 'react';
import './Register.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../api/auth';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Register = () => {
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const data = await register(values.name, values.username, values.password);
      // Store the token in local storage or a cookie
      localStorage.setItem('token', data.token);
      // Redirect to the home page or a protected route
      window.location.href = '/';
    } catch (error) {
      setFieldError('general', error.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <Formik
        initialValues={{ name: '', username: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="register-form">
            <div>
              <label className="register-label" htmlFor="name">Name</label>
              <Field className="register-input" type="text" name="name" />
              <ErrorMessage className="register-error" name="name" component="div" />
            </div>
            <div>
              <label className="register-label" htmlFor="username">Username</label>
              <Field className="register-input" type="text" name="username" />
              <ErrorMessage className="register-error" name="username" component="div" />
            </div>
            <div>
              <label className="register-label" htmlFor="password">Password</label>
              <Field className="register-input" type="password" name="password" />
              <ErrorMessage className="register-error" name="password" component="div" />
            </div>
            <button className="register-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            <ErrorMessage className="register-error" name="general" component="div" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;