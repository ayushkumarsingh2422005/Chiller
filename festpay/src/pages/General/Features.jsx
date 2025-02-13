import React from 'react';
import { Footer, TopBar } from '../../components';
import { Box, Typography, Card, Grid, Container, Icon } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Features() {
  return (
    <>
      <TopBar />
      <HeroSection />
      <MainFeatures />
      <DetailedFeatures />
      <Footer />
    </>
  );
}

function HeroSection() {
  return (
    <Box
      sx={{
        background: "radial-gradient(circle, #4992F2, #2A548C 80%)",
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        mt: 7
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Powerful Features for Modern Event Management
        </Typography>
        <Typography
          variant="h5"
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            opacity: 0.9,
            mb: 4
          }}
        >
          Everything you need to manage events, handle payments, and engage with participants - all in one platform
        </Typography>
      </Container>
    </Box>
  );
}

function MainFeatures() {
  const features = [
    {
      icon: <EventIcon fontSize="large" />,
      title: "Event Management",
      description: "Create and manage events with ease. Set up registration, ticketing, and schedules in minutes."
    },
    {
      icon: <PaymentIcon fontSize="large" />,
      title: "Secure Payments",
      description: "Integrated payment system with multiple options and automatic reconciliation capabilities."
    },
    {
      icon: <AnalyticsIcon fontSize="large" />,
      title: "Analytics Dashboard",
      description: "Real-time insights into event performance, attendance, and revenue metrics."
    },
    {
      icon: <GroupIcon fontSize="large" />,
      title: "Club Management",
      description: "Efficiently manage club members, roles, and permissions with dedicated tools."
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 3
                }
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function DetailedFeatures() {
  const detailedFeatures = [
    {
      icon: <QrCodeScannerIcon />,
      title: "QR Code Check-ins",
      description: "Streamline event entry with QR code-based check-ins for quick and efficient attendance tracking."
    },
    {
      icon: <SecurityIcon />,
      title: "Enhanced Security",
      description: "Advanced security measures to protect user data and financial transactions."
    },
    {
      icon: <NotificationsActiveIcon />,
      title: "Smart Notifications",
      description: "Automated reminders and updates to keep participants informed about event details."
    },
    {
      icon: <DashboardIcon />,
      title: "Customizable Dashboard",
      description: "Personalized dashboard views for different user roles and preferences."
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight="bold"
          mb={6}
          color="primary.main"
        >
          Why Choose FestPay?
        </Typography>
        <Grid container spacing={4}>
          {detailedFeatures.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateX(8px)',
                    boxShadow: 2
                  }
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.light',
                    p: 2,
                    borderRadius: 2,
                    height: 'fit-content'
                  }}
                >
                  {feature.icon}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
