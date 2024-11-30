import React from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, FormControlLabel, Checkbox, Button, Paper } from '@mui/material';
import { Footer, TopBar } from '../../components';

export default function ContactUs() {
  return (
    <>
      <TopBar />

      <Box sx={{ pt: 12, pb: 5, bgcolor: 'background.default' }}>
        {/* Header Section */}
        {/* <Box sx={{ textAlign: 'center', py: 5, px: 2, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h4" fontWeight="bold">
            Get in Touch with Us
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            We are here to assist you with your inquiries and provide support.
          </Typography>
        </Box> */}

        {/* Main Content Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            px: 2,
            py: 5,
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {/* Contact Information */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 3,
              textAlign: 'left',
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              Feel free to reach out to us during our office hours.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Office Address:
              </Typography>
              <Typography>123, Innovation Hub, Tech City, Country - 56789</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Opening Hours:
              </Typography>
              <Typography>Monday - Friday: 9:00 AM - 6:00 PM</Typography>
              <Typography>Saturday: 10:00 AM - 4:00 PM</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Phone:
              </Typography>
              <Typography>+1 234-567-890</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Email:
              </Typography>
              <Typography>contact@company.com</Typography>
            </Box>
          </Paper>

          {/* Contact Form */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 3,
              textAlign: 'left',
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Send Us a Message
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                required
              />
              <TextField
                fullWidth
                label="Organization/Student"
                variant="outlined"
                margin="normal"
                select
                SelectProps={{ native: true }}
                required
              >
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
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Request a Callback"
                sx={{ mt: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
