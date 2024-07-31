'use client';

// MATERIAL - UI
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// THIRD - PARTY
import { motion } from 'framer-motion';

// PROJECT IMPORTS
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';

// ASSETS
import { ExportSquare } from 'iconsax-react';
const featureFigma = '/assets/images/landing/feature-figma.png';
const featureComponents = '/assets/images/landing/feature-components.png';
const featureDocumentation = '/assets/images/landing/feature-documentation.png';

const Technologies = [
  {
    icon: featureFigma,
    title: 'Consult with Legal Advisor',
    description: 'Check the live preview of LoE Video Consultations. Schedule now!.',
    preview: '#'
  },
  {
    icon: featureComponents,
    title: 'Explore Legal Contents',
    description: 'Access all components of LoE in one place to make your work easier.',
    preview: '/components-overview/buttons'
  },
  {
    icon: featureDocumentation,
    title: 'Document Generation',
    description: 'Find solutions and navigate through our Service with ease.',
    preview: '#'
  }
];

// ==============================|| LANDING - ComboPage ||============================== //

const ComboPage = () => {
  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography variant="h2">Complete Combo</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Typography>
                  We caters to the needs of both Advisors and Clients, whether they are professional or students.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            {Technologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h5">{tech.title}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{tech.description}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CardMedia component="img" image={tech.icon} sx={{ width: '100%' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          startIcon={<ExportSquare />}
                          component={Link}
                          href={tech.preview}
                          target="_blank"
                          sx={{
                            fontWeight: 500,
                            bgcolor: 'secondary.light',
                            color: 'secondary.darker',
                            '&:hover': { color: 'secondary.lighter' }
                          }}
                        >
                          Reference
                        </Button>
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ComboPage;
