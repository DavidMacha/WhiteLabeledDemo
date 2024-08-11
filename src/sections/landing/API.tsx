
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TextField, Button, Stack, Alert, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    pers_fName: '',
    pers_mName: '',
    pers_lName: '',
    email: '',
    password: '',
    password_confirmation: '',
    pers_preferredTimezone: 'UTC',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const config = {
        method: 'post',
        url: 'http://13.212.101.33/api/auth/partner/register',
        headers: {
          'COMPANY-CODE': 'def-mc-partner',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        },
        data: formData,
      };

      const response = await axios(config);
      setSuccess(true);
      setFormData({
        pers_fName: '',
        pers_mName: '',
        pers_lName: '',
        email: '',
        password: '',
        password_confirmation: '',
        pers_preferredTimezone: 'UTC',
      });
      // Redirect after successful registration
      router.push('/login');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">Registration successful!</Alert>}

            <TextField
              label="First Name"
              name="pers_fName"
              value={formData.pers_fName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Middle Name"
              name="pers_mName"
              value={formData.pers_mName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="pers_lName"
              value={formData.pers_lName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              fullWidth
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <Link href="/login" style={{ textDecoration: 'none', color: 'primary' }}>
            Login here
          </Link>
        </Typography>

        <Stack spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Image src="/assets/images/auth/facebook.svg" alt="Facebook" width={16} height={16} />}
            fullWidth
          >
            Sign up with Facebook
          </Button>
          <Button
            variant="outlined"
            startIcon={<Image src="/assets/images/auth/twitter.svg" alt="Twitter" width={16} height={16} />}
            fullWidth
          >
            Sign up with Twitter
          </Button>
          <Button
            variant="outlined"
            startIcon={<Image src="/assets/images/auth/google.svg" alt="Google" width={16} height={16} />}
            fullWidth
          >
            Sign up with Google
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RegisterComponent;




/*
// sections/landing/ApiData.tsx

import React, { useState, useEffect } from 'react';
import styles from './ApiData.module.css'; // Import the CSS module

const ApiData: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://13.212.101.33/api/auth/partner/register';

      // Define the headers
      const myHeaders = new Headers();
      myHeaders.append("COMPANY-CODE", "def-mc-partner");
      myHeaders.append("FRONTEND-KEY", "XXX");
      myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com)");

      // Create the form data
      const formData = new FormData();
      formData.append("email", "clt@gmail.com");
      formData.append("password", "aAertyuiop@1");

      // Define the request options
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
      };

      try {
        // Perform the fetch request
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get the response text
        const result = await response.text();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className={styles.container}>
      <h2>API Response</h2>
      <div className={styles.response}>
        {data}
      </div>
    </div>
  );
};

export default ApiData;
*/