/*
'use client';
import { useState, SyntheticEvent } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Links from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAuth } from './AuthContext';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import FormData from 'form-data';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { Eye, EyeSlash } from 'iconsax-react';
import useScriptRef from 'hooks/useScriptRef';
import { fetcher } from 'utils/axios';
import { preload } from 'swr';

const AuthLogin = ({ providers, csrfToken }: any) => {
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(false);
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthData } = useAuth(); // Get setAuthData from context


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: 'minmattral@gmail.com',
        password: 'aAertyuiop@1',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}

      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          signIn('login', { redirect: false, email: values.email, password: values.password });
          const data = new FormData();
          data.append('email', values.email);
          data.append('password', values.password);

          //data.append('redirectUrl', '');
      
          const config = {
            method: 'post',
            url: 'https://lawonearth.co.uk/api/auth/core/login',
            headers: {
              'COMPANY-CODE': 'def-mc-admin',
              'FRONTEND-KEY': 'XXX', 
              //'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
            },
            data: data,
          };
      
          const response = await axios(config);
      
          if (response.status === 200 && response.data.status === 'treatmentSuccess') {
            setStatus({ success: true });
            setSubmitting(false);
            preload('api/menu/dashboard', fetcher);
            //save response
            setAuthData(response.data);
            localStorage.setItem('authData', JSON.stringify(response.data));
            sessionStorage.setItem('authData', JSON.stringify(response.data));
            
            const signInResult = await signIn('credentials', {
              redirect: false, // Prevent automatic redirect
              email: values.email,
              password: values.password,
              //callbackUrl: '/dashboard/default'
            });
      
            if (signInResult?.error) {
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: signInResult.error || 'Login failed' });
                setSubmitting(false);
              }
            } else 
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
                preload('api/menu/dashboard', fetcher); // Preload dashboard menu on login success
                window.location.href = '/dashboard/default'; // Manually redirect to the desired page
              }
            
          } else {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: response.data.message || 'Login failed' });
              setSubmitting(false);
            }
          }
        } catch (error: unknown) {
          if (scriptedRef.current) {
            setStatus({ success: false });
      
            if (axios.isAxiosError(error)) {
              setErrors({ submit: error.response?.data?.message || error.message || 'An error occurred' });
            } else if (error instanceof Error) {
              setErrors({ submit: error.message });
            } else {
              setErrors({ submit: 'An unknown error occurred' });
            }
      
            setSubmitting(false);
          }
        }
      }}
      
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Keep me signed in</Typography>}
                />
                <Links variant="h6" component={Link} href={session ? '/auth/forgot-password' : '/forgot-password'} color="text.primary">
                  Forgot Password?
                </Links>
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;
*/


//__________________________________________________________________________________________________

/*
"use client"
import { useState, SyntheticEvent } from 'react';

// NEXT
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { fetcher } from 'utils/axios';
import { preload } from 'swr';
// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Links from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

// THIRD - PARTY
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import FormData from 'form-data';

// PROJECT IMPORTS
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';


// ASSETS
import { Eye, EyeSlash } from 'iconsax-react';
import useScriptRef from 'hooks/useScriptRef';

const AuthLogin = ({ providers, csrfToken }: any) => {
  // @ts-ignore
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(false);
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: 'minmattral@gmail.com',
        password: 'aAertyuiop@1',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const data = new FormData();
          data.append('email', values.email);
          data.append('password', values.password);

          const config = {
            method: 'post',
            url: 'https://lawonearth.co.uk/api/auth/core/login',
            headers: {
              'COMPANY-CODE': 'def-mc-admin',
              'FRONTEND-KEY': 'XXX', // Replace with actual FRONTEND-KEY
              'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
              // No need to manually set Content-Type for FormData
            },
            
            data: data,
          };

          const response = await axios(config);

          /* do a test on HTTP response code 
            200,400,500,... (3 types)
            so I can make a coditional to check the response code?
            and handle each part
            if success 200,> will set processing steps
            and if failed raise a noti or toast or alert!
            and keep in same page.

        

          if (response.data.status === 'treatmentSuccess') {
            setStatus({ success: true });
            preload('api/menu/dashboard', fetcher);
          } else {
            setStatus({ success: false });
            setErrors({ submit: response.data.message || 'Login failed' });
          }
        } catch (error: any) {
          setStatus({ success: false });
          setErrors({ submit: error.message || 'An error occurred' });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Keep me signed in</Typography>}
                />
                <Links variant="h6" component={Link} href={session ? '/auth/forgot-password' : '/forgot-password'} color="text.primary">
                  Forgot Password?
                </Links>
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;
*/

//_______________________________________________________




'use client';

import { useState, SyntheticEvent } from 'react';

// NEXT
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Links from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

import axios from 'axios';

// THIRD - PARTY
import * as Yup from 'yup';
import { Formik } from 'formik';

// PROJECT IMPORTS
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { fetcher } from 'utils/axios';
import useScriptRef from 'hooks/useScriptRef';

// ASSETS
import { Eye, EyeSlash } from 'iconsax-react';
import { preload } from 'swr';

// ============================|| JWT - LOGIN ||============================ //

const AuthLogin = ({ providers, csrfToken }: any) => {
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(false);
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: 'info@phoenixcoded.co',
        password: '123456',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          signIn('login', { redirect: false, email: values.email, password: values.password });
          const data = new FormData();
          data.append('email', values.email);
          data.append('password', values.password);

          //data.append('redirectUrl', '');
      
          const config = {
            method: 'post',
            url: 'https://lawonearth.co.uk/api/auth/core/login',
            headers: {
              'COMPANY-CODE': 'def-mc-admin',
              'FRONTEND-KEY': 'XXX', 
              //'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
            },
            data: data,
          };
          const response = await axios(config);
          if (response.status === 200 && response.data.status === 'treatmentSuccess') {
            setStatus({ success: true });
            setSubmitting(false);
            preload('api/menu/dashboard', fetcher);
          }

          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
            preload('api/menu/dashboard', fetcher); // load menu on login success
          }
        } catch (err: any) {
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="-password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Keep me sign in</Typography>}
                />
                <Links variant="h6" component={Link} href={session ? '/auth/forgot-password' : '/forgot-password'} color="text.primary">
                  Forgot Password?
                </Links>
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;
