// sections/auth/auth-forms/CustomRegisterForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { TextField, Button, Typography, Grid } from '@mui/material';

// Define the shape of the form data
interface FormDataState {
  pers_fName: string;
  pers_mName: string;
  pers_lName: string;
  email: string;
  password: string;
  password_confirmation: string;
  pers_preferredTimezone: string;
  redirectUrl: string;
}

const CustomRegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    pers_fName: '',
    pers_mName: '',
    pers_lName: '',
    email: '',
    password: '',
    password_confirmation: '',
    pers_preferredTimezone: 'UTC',
    redirectUrl: 'http://lawonearth.org/',
  });

  const [error, setError] = useState<string | null>(null); // Correct type
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Correct type

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key as keyof FormDataState]));

      const response = await axios.post(
        'https://lawonearth.co.uk/api/auth/partner/register',
        data,
        {
          headers: {
            'COMPANY-CODE': 'def-mc-partner',
            'FRONTEND-KEY': 'XXX',
            'X-Requested-With': 'XMLHttpRequest',
            ...data.getHeaders(),
          },
        }
      );

      setSuccessMessage(response.data.primaryData.msg);
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="pers_fName"
            value={formData.pers_fName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Middle Name"
            name="pers_mName"
            value={formData.pers_mName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="pers_lName"
            value={formData.pers_lName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Preferred Timezone"
            name="pers_preferredTimezone"
            value={formData.pers_preferredTimezone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Register</Button>
        </Grid>
        {successMessage && (
          <Grid item xs={12}>
            <Typography color="green">{successMessage}</Typography>
          </Grid>
        )}
        {error && (
          <Grid item xs={12}>
            <Typography color="red">{error}</Typography>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default CustomRegisterForm;
