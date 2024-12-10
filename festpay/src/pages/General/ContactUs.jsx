import React from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, FormControlLabel, Checkbox, Button, Paper } from '@mui/material';
import { Footer, TopBar } from '../../components';

export default function ContactUs() {
  return (
    <>
      <TopBar />

      <Box sx={{ pt: 7, pb: 5, bgcolor: 'background.default' }}>
        <Box sx={{ 
          textAlign: 'center', 
          py: 6, 
          px: 2, 
          bgcolor: 'primary.main', 
          color: 'white',
          mb: 6,
          borderRadius: { xs: 0, md: '0 0 20px 20px' }
        }}>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
            Get in Touch
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto', opacity: 0.9 }}>
            We're here to help and answer any questions you might have
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          px: { xs: 2, md: 4 },
          maxWidth: '1200px',
          mx: 'auto',
        }}>
          <Paper elevation={3} sx={{
            flex: 1,
            p: 4,
            textAlign: 'left',
            borderRadius: 2,
            bgcolor: 'background.paper',
            '& .MuiTypography-root': { color: 'text.primary' }
          }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
              Contact Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Feel free to reach out to us during our office hours.
            </Typography>
            
            <Box sx={{ 
              '& > div': { 
                mb: 3,
                p: 2,
                borderRadius: 1,
                '&:hover': { bgcolor: 'action.hover' }
              }
            }}>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  Office Address
                </Typography>
                <Typography sx={{ mt: 1 }}>123, Innovation Hub, Tech City, Country - 56789</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  Opening Hours
                </Typography>
                <Typography sx={{ mt: 1 }}>Monday - Friday: 9:00 AM - 6:00 PM</Typography>
                <Typography>Saturday: 10:00 AM - 4:00 PM</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  Contact Details
                </Typography>
                <Typography sx={{ mt: 1 }}>Phone: +1 234-567-890</Typography>
                <Typography>Email: contact@company.com</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{
            flex: 1,
            p: 4,
            textAlign: 'left',
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
              Send Us a Message
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Organization/Student"
                variant="outlined"
                margin="normal"
                select
                SelectProps={{ native: true }}
                required
                sx={{ mb: 2 }}
              >
                <option value="">Select your type</option>
                <option value="organization">Organization</option>
                <option value="student">Student</option>
              </TextField>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                required
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Request a Callback"
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 2
                }}
              >
                Send Message
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
