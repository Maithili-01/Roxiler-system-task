import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

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
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/auth/login', values);

        const { token } = res.data;
        localStorage.setItem('token', token);

        // Decode token to get role (if needed)
        const payload = JSON.parse(atob(token.split('.')[1])); // base64 decode
        const userRole = payload.role;

        // Redirect based on role
        if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else if (userRole === 'user') {
          navigate('/user/dashboard');
        } else if (userRole === 'storeOwner') {
          navigate('/store/dashboard');
        } else {
          alert('Unknown user role.');
        }

      } catch (error) {
        alert(error.response?.data?.message || 'Login failed.');
      }
    },
  });

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
