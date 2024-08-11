// NEXT
"use client";
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// PROJECT IMPORTS
import AuthWrapper from 'sections/auth/AuthWrapper';

const AuthLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const config = {
      method: 'post',
      url: 'http://13.212.101.33/api/auth/partner/login',
      headers: {
        'COMPANY-CODE': 'def-mc-partner',
        'FRONTEND-KEY': 'XXX', // Placeholder FRONTEND-KEY
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
        // You don't need to add `formData.getHeaders()` here as it's not available in the browser
      },
      data: formData,
    };

    try {
      const response = await axios(config);
      setSuccessMessage('Login successful!');
      console.log(response.data);
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        {errorMessage && (
          <Grid item xs={12}>
            <Typography color="error">{errorMessage}</Typography>
          </Grid>
        )}
        {successMessage && (
          <Grid item xs={12}>
            <Typography color="success">{successMessage}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const Login = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography component={Link} href={'/register'} variant="body1" sx={{ textDecoration: 'none' }} color="primary" passHref>
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;


/*
// NEXT
"use client"
import Link from 'next/link';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
//import CustomLoginForm from 'sections/auth/auth-forms/CustomLoginForm';
// ================================|| LOGIN ||================================ //

const Login = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography component={Link} href={'/register'} variant="body1" sx={{ textDecoration: 'none' }} color="primary" passHref>
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;

// line 28 is AuthLogin component tag
*/