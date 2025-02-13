import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { TopBar, Footer } from '../../components';
import { FaRocket, FaRegLightbulb, FaRegClock } from 'react-icons/fa';

export default function EarlyAccess() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: 'student',
    organizationName: '',
    role: '',
    purpose: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/earlyaccess/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar />
      <Box 
        sx={{ 
          minHeight: '100vh',
          pt: '64px',
          background: 'linear-gradient(180deg, #EAF1FF 0%, rgba(234, 241, 255, 0.4) 100%)',
        }}
      >
        {/* Hero Section */}
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                mb: 2,
                fontFamily: 'Krona One'
              }}
            >
              Get Early <Box component="span" sx={{ color: '#1F4EB4' }}>Access</Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 6,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Be among the first to experience our revolutionary platform for campus event management and payments
            </Typography>

            {/* Benefits Section */}
            <Grid container spacing={4} sx={{ mb: 8 }}>
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-8px)' }
                  }}
                >
                  <FaRocket size={40} style={{ color: '#1F4EB4', marginBottom: '1rem' }} />
                  <Typography variant="h6" sx={{ mb: 2 }}>Early Bird Benefits</Typography>
                  <Typography color="text.secondary">
                    Get exclusive features and priority support as an early adopter of our platform
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-8px)' }
                  }}
                >
                  <FaRegLightbulb size={40} style={{ color: '#1F4EB4', marginBottom: '1rem' }} />
                  <Typography variant="h6" sx={{ mb: 2 }}>Shape the Future</Typography>
                  <Typography color="text.secondary">
                    Provide feedback and help us build features that matter most to you
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-8px)' }
                  }}
                >
                  <FaRegClock size={40} style={{ color: '#1F4EB4', marginBottom: '1rem' }} />
                  <Typography variant="h6" sx={{ mb: 2 }}>Limited Time Offer</Typography>
                  <Typography color="text.secondary">
                    Special pricing and perks available only for early access members
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Form Section */}
            <Paper 
              elevation={0}
              sx={{ 
                maxWidth: '600px', 
                mx: 'auto', 
                p: { xs: 3, md: 6 },
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              {success ? (
                <Box textAlign="center">
                  <Typography variant="h5" sx={{ color: 'success.main', mb: 2 }}>
                    Thank you for your interest!
                  </Typography>
                  <Typography>
                    We'll be in touch with you shortly with more information about early access.
                  </Typography>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      Request Early Access
                    </Typography>

                    <TextField
                      required
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <TextField
                      required
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />

                    <TextField
                      required
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    <FormControl>
                      <FormLabel>I am a</FormLabel>
                      <RadioGroup
                        row
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                      >
                        <FormControlLabel 
                          value="student" 
                          control={<Radio />} 
                          label="Student" 
                        />
                        <FormControlLabel 
                          value="organization" 
                          control={<Radio />} 
                          label="Organization" 
                        />
                      </RadioGroup>
                    </FormControl>

                    {formData.userType === 'organization' && (
                      <>
                        <TextField
                          required
                          fullWidth
                          label="Organization Name"
                          name="organizationName"
                          value={formData.organizationName}
                          onChange={handleChange}
                        />
                        <TextField
                          required
                          fullWidth
                          label="Your Role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                        />
                      </>
                    )}

                    <TextField
                      required
                      fullWidth
                      label="How do you plan to use our platform?"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      multiline
                      rows={4}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{
                        bgcolor: '#1F4EB4',
                        py: 1.5,
                        '&:hover': {
                          bgcolor: '#1a439b'
                        }
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Request Early Access'
                      )}
                    </Button>
                  </Stack>
                </form>
              )}
            </Paper>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
