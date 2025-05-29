import React from 'react';
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../api/auth';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const data = await login(values.username, values.password);
      // Store the token in local storage or a cookie
      localStorage.setItem('token', data.token);
      // Redirect to the home page or a protected route
      window.location.href = '/';
    } catch (error) {
      setFieldError('general', error.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div className="login-form-group">
              <label className="login-label" htmlFor="username">Username</label>
              <Field className="login-input" type="text" name="username" />
              <ErrorMessage className="login-error" name="username" component="div" />
            </div>
            <div className="login-form-group">
              <label className="login-label" htmlFor="password">Password</label>
              <Field className="login-input" type="password" name="password" />
              <ErrorMessage className="login-error" name="password" component="div" />
            </div>
            <button className="login-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <ErrorMessage className="login-error" name="general" component="div" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;