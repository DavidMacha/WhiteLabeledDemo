// pages/register.js
import Link from 'next/link';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Logo from 'components/logo';
import useUser from 'hooks/useUser';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthDivider from 'sections/auth/AuthDivider';
import AuthWrapper from 'sections/auth/AuthWrapper';
import CustomRegisterForm from 'sections/auth/auth-forms/CustomRegisterForm'; // Updated import
import React, { useState, useEffect } from 'react';
// ASSETS
const imgFacebook = '/assets/images/auth/facebook.svg';
const imgTwitter = '/assets/images/auth/twitter.svg';
const imgGoogle = '/assets/images/auth/google.svg';

// ================================|| REGISTER ||================================ //


// @ts-ignore
const ApiData: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const fetchData = async () => {
  const url = 'http://13.212.101.33/api/auth/core/login';

  // Define the headers
  const myHeaders = new Headers();
  myHeaders.append("COMPANY-CODE", "def-mc-admin");
  myHeaders.append("Authorization", "MC-H3HBRZU6ZK5744S");
  myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com)");
  myHeaders.append("es_code", "es-9cc51159-c706-414e-b4d2-db8f649772f6");
  myHeaders.append("FRONTEND-KEY", "XXX");
  myHeaders.append("es_username", "7a64b5001@smtp-brevo.com");

  // Create the form data
  const formData = new FormData();
  formData.append('pers_fName', "Min");
  formData.append('pers_mName', "Htet");
  formData.append('pers_lName', "Myet");
  formData.append('email', "minmattral@gmail.com");
  formData.append('password', "aAertyuiop@1");
  formData.append('password_confirmation', "aAertyuiop@1");
  formData.append('pers_preferredTimezone', "UTC");
  formData.append('redirectUrl', "http://lawonearth.org/");
  formData.append('es_protocol', "");
  formData.append('es_protocol', "smtp");
  formData.append('es_encryption', "ssl");
  formData.append('es_port', "465");

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
};

const RegisterPage = () => {
  const user = useUser();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AuthSocButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image src={imgFacebook} alt="Facebook" width={16} height={16} />
                  <Typography>Sign up with Facebook</Typography>
                </Stack>
              </AuthSocButton>
            </Grid>
            <Grid item xs={12}>
              <AuthSocButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image src={imgTwitter} alt="Twitter" width={16} height={16} />
                  <Typography>Sign up with Twitter</Typography>
                </Stack>
              </AuthSocButton>
            </Grid>
            <Grid item xs={12}>
              <AuthSocButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image src={imgGoogle} alt="Google" width={16} height={16} />
                  <Typography>Sign up with Google</Typography>
                </Stack>
              </AuthSocButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AuthDivider>
            <Typography variant="body1">OR</Typography>
          </AuthDivider>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Sign up</Typography>
            <Typography
              component={Link}
              href={user ? '/auth/login' : '/login'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Already have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <CustomRegisterForm /> {/* Updated component */}
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default RegisterPage;

/*
'use client';

// NEXT
import Link from 'next/link';
import Image from 'next/image';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// PROJECT IMPORTS
import Logo from 'components/logo';
import useUser from 'hooks/useUser';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthDivider from 'sections/auth/AuthDivider';
import AuthWrapper from 'sections/auth/AuthWrapper';
import FirebaseRegister from 'sections/auth/auth-forms/AuthRegister';

// ASSETS
const imgFacebook = '/assets/images/auth/facebook.svg';
const imgTwitter = '/assets/images/auth/twitter.svg';
const imgGoogle = '/assets/images/auth/google.svg';

// ================================|| REGISTER ||================================ //

const RegisterPage = () => {
  const user = useUser();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AuthSocButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image src={imgFacebook} alt="Facebook" width={16} height={16} />
                  <Typography>Sign up with Facebook</Typography>
                </Stack>
              </AuthSocButton>
            </Grid>
            <Grid item xs={12}>
              <AuthSocButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image src={imgTwitter} alt="Twitter" width={16} height={16} />
                  <Typography>Sign up with Twitter</Typography>
                </Stack>
              </AuthSocButton>
            </Grid>
            <Grid item xs={12}>
              <AuthSocButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image src={imgGoogle} alt="Google" width={16} height={16} />
                  <Typography>Sign up with Google</Typography>
                </Stack>
              </AuthSocButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AuthDivider>
            <Typography variant="body1">OR</Typography>
          </AuthDivider>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Sign up</Typography>
            <Typography
              component={Link}
              href={user ? '/auth/login' : '/login'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Already have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <FirebaseRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default RegisterPage;
*/