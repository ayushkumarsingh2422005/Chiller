import React from "react";
import {
  Box,
  Typography,
  Stack,
  Container,
} from "@mui/material";
import bg from "../../assets/images/aboutusBg.png";
import { Footer, TopBar } from "../../components";
import { FaLightbulb, FaBolt, FaShieldAlt } from "react-icons/fa";

export default function AboutUs() {
  return (
    <>
      <TopBar />
      <Box component="img" src={bg} alt="" sx={{ mt: '64px', width: '100%' }} />
      <Box sx={{ mb: 4 }} />

      {/* Who We Are Section */}
      <Typography
        sx={{
          fontSize: { xs: '40px', md: '56px' },
          textAlign: 'center',
          fontFamily: 'Krona One',
        }}
      >
        Who We Are <Box component="span" sx={{ color: '#1F4EB4' }}>?</Box>
        <Box sx={{ width: '80px', height: '2px', bgcolor: '#1F4EB4', mx: 'auto', borderRadius: '8px' }} />
      </Typography>
      <Box sx={{ mb: 2 }} />
      <Typography sx={{ 
        maxWidth: '56rem', 
        mx: 'auto', 
        textAlign: 'center', 
        fontSize: { xs: '16px', md: '20px' },
        fontWeight: 500
      }}>
        We are {import.meta.env.VITE_AGENCY_NAME}, a platform dedicated to simplifying event management and payments for students and clubs, fostering seamless campus engagement.
      </Typography>
      <Box sx={{ mb: 16 }} />

      {/* Core Values Section */}
      <Typography
        sx={{
          fontSize: { xs: '40px', md: '56px' },
          textAlign: 'center',
          fontFamily: 'Krona One',
        }}
      >
        CORE <Box component="span" sx={{ color: '#1F4EB4' }}>VALUES</Box>
        <Box sx={{ width: '80px', height: '2px', bgcolor: '#1F4EB4', mx: 'auto', borderRadius: '8px' }} />
      </Typography>
      <Box sx={{ mb: 2 }} />
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={4}
        sx={{ 
          maxWidth: '72rem',
          mx: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4
        }}
      >
        {/* Innovation */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#EAF1FF',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Box sx={{ color: '#1F4EB4', fontSize: '2.25rem', mb: 2 }}>
            <FaLightbulb />
          </Box>
          <Typography sx={{ fontSize: { xs: '20px', md: '24px' }, fontWeight: 'bold', color: '#1F4EB4' }}>
            INNOVATION
          </Typography>
          <Typography sx={{ textAlign: 'center', fontSize: { xs: '14px', md: '16px' }, mt: 1 }}>
            We constantly evolve and adapt to meet the changing needs of our users, bringing creative solutions to campus event management.
          </Typography>
        </Box>

        {/* Efficiency */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#EAF1FF',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Box sx={{ color: '#1F4EB4', fontSize: '2.25rem', mb: 2 }}>
            <FaBolt />
          </Box>
          <Typography sx={{ fontSize: { xs: '20px', md: '24px' }, fontWeight: 'bold', color: '#1F4EB4' }}>
            EFFICIENCY
          </Typography>
          <Typography sx={{ textAlign: 'center', fontSize: { xs: '14px', md: '16px' }, mt: 1 }}>
            We streamline processes and optimize workflows to save your valuable time, making event management seamless and hassle-free.
          </Typography>
        </Box>

        {/* Trust */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#EAF1FF',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Box sx={{ color: '#1F4EB4', fontSize: '2.25rem', mb: 2 }}>
            <FaShieldAlt />
          </Box>
          <Typography sx={{ fontSize: { xs: '20px', md: '24px' }, fontWeight: 'bold', color: '#1F4EB4' }}>
            TRUST
          </Typography>
          <Typography sx={{ textAlign: 'center', fontSize: { xs: '14px', md: '16px' }, mt: 1 }}>
            Your security is our priority. We ensure safe transactions and protect your data with industry-standard security measures.
          </Typography>
        </Box>
      </Stack>
      <Box sx={{ mb: 8 }} />

      {/* Our Team Section */}
      <Box sx={{ py: 16, bgcolor: 'grey.50' }}>
        <Typography
          sx={{
            fontSize: { xs: '40px', md: '56px' },
            textAlign: 'center',
            fontFamily: 'Krona One',
          }}
        >
          OUR <Box component="span" sx={{ color: '#1F4EB4' }}>TEAM</Box>
          <Box sx={{ width: '80px', height: '2px', bgcolor: '#1F4EB4', mx: 'auto', borderRadius: '8px' }} />
        </Typography>
        <Box sx={{ mb: 2 }} />
        <Container sx={{ maxWidth: '72rem', px: 4 }}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4
          }}>
            <Box sx={{ 
              bgcolor: 'white',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: 'center'
            }}>
              <Box
                component="img"
                src="https://via.placeholder.com/150"
                alt="Team Member"
                sx={{
                  width: '128px',
                  height: '128px',
                  borderRadius: '50%',
                  mx: 'auto',
                  mb: 2
                }}
              />
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1F4EB4' }}>
                John Doe
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Founder & CEO
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mission Statement */}
      <Box sx={{ bgcolor: '#1F4EB4', color: 'white', py: 16 }}>
        <Typography
          sx={{
            fontSize: { xs: '40px', md: '56px' },
            textAlign: 'center',
            fontFamily: 'Krona One',
          }}
        >
          OUR <Box component="span" sx={{ color: 'white' }}>MISSION</Box>
          <Box sx={{ width: '80px', height: '2px', bgcolor: 'white', mx: 'auto', borderRadius: '8px' }} />
        </Typography>
        <Box sx={{ mb: 2 }} />
        <Typography sx={{ 
          maxWidth: '56rem',
          mx: 'auto',
          textAlign: 'center',
          fontSize: { xs: '16px', md: '20px' },
          fontWeight: 500,
          px: 4
        }}>
          To revolutionize campus event management by providing a secure, efficient, and user-friendly platform that empowers students and organizations to create memorable experiences while simplifying administrative processes.
        </Typography>
      </Box>

      <Footer />
    </>
  );
}
