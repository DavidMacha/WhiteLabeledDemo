import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';

const DynamicRecaptcha = dynamic(() => import('react-google-recaptcha'), {
  ssr: false  // Ensure that ReCAPTCHA is not rendered on the server-side
});

const RecaptchaPage = () => {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    setRecaptchaLoaded(true);
  }, []);

  const handleOnChange = () => {
    // Handle onChange event
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={6}>
        <MainCard title="ReCaptcha Example" content={false}>
          <Box sx={{ p: { xs: 1.5, sm: 3 } }}>
            {recaptchaLoaded && (
              <DynamicRecaptcha sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleOnChange} />
            )}
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default RecaptchaPage;
