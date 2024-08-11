
import axios from 'axios';
import FormData from 'form-data';
import { useState } from 'react';

export default function RegisterComponent() {
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        const data = new FormData();
        data.append('pers_fName', 'Client');
        data.append('pers_mName', '');
        data.append('pers_lName', 'Clt');
        data.append('email', 'clt@gmail.com');
        data.append('password', 'aAertyuiop@1');
        data.append('password_confirmation', 'aAertyuiop@1');
        data.append('pers_preferredTimezone', 'UTC');
        data.append('redirectUrl', 'http://lawonearth.org/');

        const config = {
            method: 'post',
            url: 'http://13.212.101.33/api/auth/partner/register',
            headers: { 
                'COMPANY-CODE': 'def-mc-partner', 
                'FRONTEND-KEY': 'XXX', 
                'X-Requested-With': 'XMLHttpRequest', 
                'User-Agent': 'Apidog/1.0.0 (https://apidog.com)', 
                ...data.getHeaders()
            },
            data: data
        };

        try {
            const response = await axios(config);
            setResponse(response.data);
        } catch (error: any) {
            setError(error.message || 'An error occurred');
        }
    };

    return (
        <div>
            <button onClick={handleRegister}>Register</button>
            {response && <div>Success: {JSON.stringify(response)}</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
}




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