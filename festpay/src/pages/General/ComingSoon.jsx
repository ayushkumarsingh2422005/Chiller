import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import { TopBar, Footer } from '../../components';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TimerIcon from '@mui/icons-material/Timer';
import bg3 from "../../assets/images/bg3.webp";

export default function ComingSoon() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    // Set specific launch date to March 31st, 2024
    const launchDate = new Date('2025-03-31T23:59:59');
    const difference = launchDate - new Date();

    // Return all zeros if we're past the launch date
    if (difference < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Clear interval if we've reached the launch date
      if (Object.values(newTimeLeft).every(value => value === 0)) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <TopBar />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: `url(${bg3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mt: 7,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container 
          maxWidth="md" 
          sx={{ 
            py: { xs: 4, md: 8 },
            px: { xs: 2, md: 3 },
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <TimerIcon sx={{ 
              fontSize: { xs: 50, md: 80 }, 
              mb: 2, 
              animation: 'pulse 2s infinite',
              color: 'primary.main'
            }} />
            <RocketLaunchIcon sx={{ 
              fontSize: { xs: 50, md: 80 }, 
              mb: 2, 
              ml: 2,
              animation: 'float 3s ease-in-out infinite',
              color: 'primary.main'
            }} />
          </Box>
          
          <Typography 
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem' }
            }}
          >
            FestPay is Almost Ready!
          </Typography>

          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            sx={{ 
              mb: 2, 
              color: 'text.primary',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }
            }}
          >
            Your Ultimate Event Management Platform
          </Typography>

          <Typography 
            variant="h6" 
            sx={{ 
              mb: { xs: 4, md: 6 }, 
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' }
            }}
          >
            {timeLeft.days > 0 
              ? `Launching on March 31st! Only ${timeLeft.days} days to go!`
              : 'Launching Today! Get ready for a revolutionary way to manage college events.'}
          </Typography>

          {/* Countdown Timer */}
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 1, sm: 2, md: 4 },
              mb: { xs: 4, md: 8 },
              flexWrap: 'wrap'
            }}
          >
            {Object.entries(timeLeft).map(([unit, value]) => (
              <Box 
                key={unit}
                sx={{
                  p: { xs: 1.5, sm: 2, md: 3 },
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  minWidth: { xs: 70, sm: 80, md: 120 },
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Typography 
                  variant={isMobile ? "h4" : "h3"} 
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    color: 'primary.main'
                  }}
                >
                  {String(value).padStart(2, '0')}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }
                  }}
                >
                  {unit}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Feature Highlights */}
          <Box sx={{ mb: { xs: 4, md: 8 } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: { xs: 2, md: 3 },
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.25rem' },
                color: 'text.primary'
              }}
            >
              Get Ready For:
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              gap: { xs: 1, sm: 2 }
            }}>
              {[
                "Easy Event Management",
                "Secure Payments",
                "Real-time Analytics",
                "Smart Promotions",
                "Attendee Tracking"
              ].map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: 'background.paper',
                    px: { xs: 2, md: 3 },
                    py: { xs: 0.75, md: 1 },
                    borderRadius: '50px',
                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                    color: 'text.secondary',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      color: 'primary.main'
                    }
                  }}
                >
                  {feature}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </>
  );
} 