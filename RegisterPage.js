import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(20, 'Name must be at least 20 characters')
        .max(60, 'Name cannot be more than 60 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      address: Yup.string()
        .max(400, 'Address cannot be more than 400 characters')
        .required('Address is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(16, 'Password cannot be more than 16 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/auth/register', values);
        alert('Registration Successful! You can now login.');
        window.location.href = '/login';  // Redirect to login after success
      } catch (error) {
        alert(error.response?.data?.message || 'Something went wrong.');
      }
    },
  });

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: 'red' }}>{formik.errors.name}</div>
          ) : null}
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label>Address:</label><br />
          <textarea
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          ></textarea>
          {formik.touched.address && formik.errors.address ? (
            <div style={{ color: 'red' }}>{formik.errors.address}</div>
          ) : null}
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
        </div>

        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
