import { useState, SyntheticEvent } from 'react';
// THIRD - PARTY
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';
// PROJECT IMPORTS
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import useScriptRef from 'hooks/useScriptRef';

// ASSETS
import { Eye, EyeSlash } from 'iconsax-react';

// ============================|| CUSTOM LOGIN ||============================ //

const AuthLogin = () => {
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{ //
        email: '', 
        password: '',
        submit: null // 4 (sucess, failed, waiting, default)
        // if submit is not NULL >> disable the bottom to save API rates 
        // opposite is NULL >> enable the submit bottom
      }}

      // provided by API side and swap with credentials results
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const formData = new FormData();
          formData.append('email', values.email);
          formData.append('password', values.password);

          const response = await axios.post(
            'https://lawonearth.co.uk/api/auth/partner/login',
            // 1st - https...../api (or) 2nd - load from env link to API (or) 3rd env up the path {/auth/partner/login}
            // todo do- centralize
            formData,
            {
              headers: {
                'COMPANY-CODE': 'def-mc-partner',
                'FRONTEND-KEY': 'XXX',
                //'User-Agent': 'Apidog/1.0.0 (https://apidog.com)', // automatically set by browser no need to manual
                // 'Content-Type': 'application/x-www-form-urlencoded', // Uncomment if server expects URL-encoded data
              /* will centralize the calls from a common private variable
               also there should be 2 parts, URL + {PATH}
               We can set a string ( any ) for checkup and if matched >>
               can concatinate the URL + corresponding path
               and return the results via function or "export const"
               then fetch from here to centralize and for better debugging and changes
              
               Headers should be encapsulated too similarly
              
               */
              }
            }
          );

          // current one >> relay on success
          /* do a test on HTTP response code 
            200,400,500,... (3 types)
            so I can make a coditional to check the response code?
            and handle each part
            if success 200,> will set processing steps
            and if failed raise a noti or toast or alert!
            and keep in same page.

          */

          if (response.data.status === 'treatmentSuccess') {
            // showing a toast to user to tell him success
            // Handle successful login
            setStatus({ success: true });
            setSubmitting(false);
            setLoginError(null);
            // Redirect or show success message
          } 
          else if (response.data.status === 'treatmentFailure') {
            /*
            throw new Error('Login failed');
            */      
          }
          else if (response.data.status === 'validationError') {
            // in each case > process
            // return a toast or may be alert or noti
          }
          else {
            // edge case (rare case)
            // log into cloudware
          }

        } catch (err: any) {
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setLoginError(err.message);
            setSubmitting(false);
          }
          // log into cloudwatch to see what happened (pop up noti or similar)
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
                  placeholder="Enter password..."
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
                <Typography variant="h6" component={Link} href='/forgot-password' color="text.primary">
                  Forgot Password?
                </Typography>
              </Stack>
            </Grid>
            {loginError && (
              <Grid item xs={12}>
                <FormHelperText error>{loginError}</FormHelperText>
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




/* 

old version simple one
'use client'; 

import { useState, SyntheticEvent } from 'react';
//import { ClerkProvider } from "@clerk/nextjs";
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
*/
