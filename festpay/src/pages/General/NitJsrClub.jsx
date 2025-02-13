import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
} from '@mui/material';
import { TopBar, Footer } from '../../components';
import { FaCode, FaRobot, FaCamera, FaPalette, FaMicrochip, FaTheaterMasks, FaInstagram, FaLinkedin } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';

// Hardcoded clubs data
const clubsData = [
  {
    id: 1,
    name: 'Innoreva',
    icon: FaCode,
    shortDesc: 'IOT and Robotics Club',
    banner: '/clubs/pconbanner.png',
    logo: '/clubs/Innorevalogo.png',
    established: '2019',
    teamSize: '50+',

    description: `Team Innoreva is the official IoT Applications and Implementation team of NIT Jamshedpur working in the domain of IoT, Robotics, Web/App Development, and Machine Learning/AI.
The Team was formed in the year 2019. Team is mainly research-oriented and provides students with the opportunity to work on real-world problems and come up with innovative solutions.
The team believes that the future of technology lies in the intersection of various domains, and we strive to be at the forefront of this intersection.`,
    achievements: [
      'Third prize in  Industry Academia Conclave 2024 in Model presentation and competition for ScorBot ER-III Controller.',
      'First prize in Electro Quest and 4th prize in Robo Sumo in Innovision 2024, technical fest at NIT Rourkela.',
      'Second prize in Robo war, in Techroot 2024, technical fest at Srinath university.'
    ],
    contacts: {
      email: 'teaminnorevanitjsr@nitjsr.ac.in',
      phone: '+917004632130',
      faculty: 'Prof. Jayendra Kumar',
      socialMedia: {
        instagram: '@team_innoreva_nitjsr',
        linkedin: 'team-innoreva'
      }

    }
  },
  {
    id: 2,
    name: 'NSS',
    icon: FaRobot,
    shortDesc: 'National Service Scheme',
    banner: '/clubs/roboticsbanner.png',
    logo: '/clubs/nsslogo.png',
    established: '1969',
    teamSize: '200+',

    description: 'NSS is Central Sector Scheme of Government of India, Ministry of Youth Affairs & Sports Sole aim of the NSS is to provide hands on experience to young students in delivering community service. Primary objective of developing the personality and character of the student youth through voluntary community service. ‘Education through Service’ is the purpose of the NSS. The ideological orientation of the NSS is inspired by the ideals of Mahatma Gandhi.',
    achievements: [
      'Raksha Bandhan with Security Guard',
      'Swachhta Pakhwada Event',
      'Blood Donation Camp'
    ],
    contacts: {
      email: 'nss@nitjsr.ac.in',
      phone: '+91 6392185224',
      faculty: 'Satyam Shukla(President)',
      socialMedia: {
        instagram: '@nss_nitjsr',
        linkedin: 'nssnitjsr'
      }
    }
  },
  {
    id: 3,
    name: 'PCON',
    icon: FaCamera,
    shortDesc: 'Programming Club Of NIT Jamshedpur',
    banner: '/clubs/pconbanner.png',
    logo: '/clubs/pconlogo.png',
    established: '2017',
    teamSize: '30+',

    description: 'We, at Programming Club of NIT Jamshedpur, are a group of highly enthusiastic and dedicated individuals striving to spread algorithmic thinking to ignite the minds of the contemporary generation to Code for the Future.',
    achievements: [
      'Best College Photography Club 2023',
      'National Geographic Feature',
      'Annual Photo Exhibition'
    ],
    contacts: {
      email: 'photography@nitjsr.ac.in',
      phone: '+91 9876543212',
      faculty: 'Prof. Michael Brown',
      socialMedia: {
        instagram: '@nitjsr_photography',
        linkedin: 'nitjsr-photography-club'
      }
    }
  },
  {
    id: 4,
    name: 'DRT',
    icon: FaTheaterMasks,
    shortDesc: 'Official Formula student racing team',
    banner: '/clubs/drtbanner.png',
    logo: '/clubs/drtlogo.png',
    established: '2009',
    teamSize: '30+',

    description: 'Drift Racing is NIT Jamshedpur\'s formula student team that designs and builds race cars. The team participates in Formula Bharat competitions, focusing on automotive innovation, aerodynamics and vehicle dynamics through hands-on engineering.',
    achievements: [
      '1.	1st in EV Category in FFS - 2022',
      '2.	1st in design report , 4th overall- 2021',
      '3.	2nd among all NITs, IITs in Formula Student India-2018'
    ],
    contacts: {
      email: 'drt@nitjsr.ac.in',
      phone: '+91 8877023130',
      faculty: 'Paras Parimal(Captain)',
      socialMedia: {
        instagram: '@nitjsrdrt',
        linkedin: 'nitjsr-drt'
      }
    }
  },
  {
    id: 5,
    name: 'Daksh',
    icon: FaTheaterMasks,
    shortDesc: 'Off-road car racing team',
    banner: '/clubs/dakshbanner.png',
    logo: '/clubs/dakshlogo.png',
    established: '2009',
    teamSize: '65+',
    description: 'Team Daksh is the official off-road car racing team of NIT Jamshedpur. Started in the year 2009, Team Daksh has been participating in BAJA SAE EVENTS (NATIONAL and INTERNATIONAL).',
    achievements: [
      'BEST ENGINEERING DESIGN AWARD',
      'BAJA STUDENT INDIA 2015 Winner',
      'BAJA SAE INDIA 2016 Winner',
    ],
    contacts: {
      email: 'daksh@nitjsr.ac.in',
      phone: '+91 6207785102',
      faculty: 'Adarsh Gupta(Captain)',
      socialMedia: {
        instagram: '@team.daksh',
        linkedin: 'team-daksh'
      }
    }
  },
  {
    id: 6,
    name: 'Revanta',
    icon: FaTheaterMasks,
    shortDesc: 'Rolling since 2009',
    banner: '/clubs/revantabanner.jpg',
    logo: '/clubs/revantalogo.png',
    established: '2009',
    teamSize: '30+',
    description: ' Team Revanta is the official technical team of NIT Jamshedpur which designs solar electric vehicles. We aim for designing a highly efficient mileage hybrid solar electric vehicle with minimal carbon footprint.',
    achievements: [
      'BEST ENGINEERING DESIGN AWARD',
      'BAJA STUDENT INDIA 2015 Winner',
      'BAJA SAE INDIA 2016 Winner',
    ],
    contacts: {
      email: 'revanta@nitjsr.ac.in',
      phone: '+91 xxxxxxxxxx',
      faculty: 'Amit (Captain)',
      socialMedia: {
        instagram: '@revanta_nit_jsr',
        linkedin: 'team-revanta'
      }
    }
  },
  {
    id: 7,
    name: 'BeatBreakers',
    icon: FaTheaterMasks,
    shortDesc: 'Official Dance Club',
    banner: '/clubs/beatbreakersbanner.png',
    logo: '/clubs/beatbreakerlogo.png',
    established: '2014',
    teamSize: '30+',
    description: 'BeatBreakers is the official dance club of NIT Jamshedpur. It is a group of highly enthusiastic and dedicated individuals striving to spread the love for dance to ignite the minds of the contemporary generation.',
    achievements: [
      'Winner of Culfest 2015, 2017, 2018, 2019, 2024',
    ],
    contacts: {
      email: 'support@digicraft.one',
      phone: '+91 8757428586',
      faculty: 'Rohan Kumar (Captain)',
      socialMedia: {
        instagram: '@beatbreakers_',
        linkedin: 'beat-breakers'
      }
    }
  },
  {
    id: 8,
    name: 'Aahwan',
    icon: FaTheaterMasks,
    shortDesc: 'A creative group that explores acting',
    banner: '/clubs/aahwanbanner.png',
    logo: '/clubs/aahwanlogo.jpg',
    established: '2013',
    teamSize: '60+',
    description: 'A dramatics club specializing in mime, skits, and nukkad natak brings stories to life through expressive gestures, impactful performances, and socially relevant street plays, captivating audiences without the need for elaborate sets or dialogues. Organizing various events througout the year',
    achievements: [
      'Winner - Nukkad | Cultural fest of XLRI',
      'Regular script writing and dramatic events'
    ],
    contacts: {
      email: 'teamaahwannitjsr@gmail.com',
      phone: '+91 9115014489',
      faculty: 'Shreshta',
      socialMedia: {
        instagram: '@aahwan_nitjsr',
        linkedin: 'aahwan-nitjsr'
      }
    }
  },
];

// Add a new style object for consistent colors
const styles = {
  primary: '#1F4EB4',
  secondary: '#EAF1FF',
  cardHoverShadow: '0 8px 24px rgba(31, 78, 180, 0.15)',
};

export default function NitJsrClub() {
  const [selectedClub, setSelectedClub] = useState(null);

  const handleClubClick = (club) => {
    setSelectedClub(club);
  };

  const handleClose = () => {
    setSelectedClub(null);
  };

  return (
    <>
      <TopBar />
      <Box 
        sx={{ 
          mt: '64px',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #EAF1FF 0%, rgba(234, 241, 255, 0.4) 100%)',
        }}
      >
        {/* Hero Section */}
        <Box sx={{ 
          textAlign: 'center', 
          py: { xs: 6, md: 10 },
          px: 4,
          position: 'relative'
        }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontFamily: 'Krona One',
              fontSize: { xs: '2rem', md: '3.5rem' },
              mb: 2,
              position: 'relative',
              display: 'inline-block'
            }}
          >
            Our Initial <Box component="span" sx={{ color: styles.primary }}>Customers</Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              color: 'text.secondary',
              mb: 8,
              lineHeight: 1.6
            }}
          >
            Meet the pioneering clubs that have trusted us to streamline their event management and payment processes. Join these forward-thinking organizations in revolutionizing campus activities.
          </Typography>

          {/* Clubs Grid */}
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ maxWidth: '1200px', mx: 'auto' }}>
            {clubsData.map((club) => (
              <Grid item xs={12} sm={6} md={4} key={club.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid rgba(31, 78, 180, 0.1)',
                    borderRadius: { xs: 2, sm: 3 },
                    overflow: 'hidden',
                    '&:hover': {
                      transform: { xs: 'scale(1.02)', sm: 'translateY(-8px)' },
                      boxShadow: styles.cardHoverShadow,
                      '& .club-logo': {
                        transform: 'scale(1.1)',
                      }
                    },
                  }}
                  onClick={() => handleClubClick(club)}
                >
                  <CardContent sx={{ 
                    textAlign: 'center',
                    p: { xs: 3, sm: 4 },
                    background: `linear-gradient(135deg, ${styles.secondary} 0%, white 100%)`,
                  }}>
                    <Box 
                      className="club-logo"
                      sx={{ 
                        width: '120px',
                        height: '120px',
                        mx: 'auto',
                        mb: 3,
                        transition: 'transform 0.3s ease-in-out',
                        position: 'relative'
                      }}
                    >
                      <Box
                        component="img"
                        src={club.logo}
                        alt={`${club.name} logo`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          padding: 2,
                          boxShadow: '0 4px 12px rgba(31, 78, 180, 0.1)',
                        }}
                      />
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 'bold',
                        mb: 2,
                        color: styles.primary
                      }}
                    >
                      {club.name}
                    </Typography>
                    <Typography 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.95rem',
                        lineHeight: 1.6
                      }}
                    >
                      {club.shortDesc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Club Details Dialog */}
        <Dialog
          open={Boolean(selectedClub)}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              overflow: 'visible',
              borderRadius: 3,
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
              background: '#FAFBFF',
            }
          }}
        >
          {selectedClub && (
            <>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: { xs: -12, sm: -16 },
                  top: { xs: -12, sm: -16 },
                  bgcolor: styles.primary,
                  color: 'white',
                  zIndex: 1,
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                  boxShadow: '0 4px 12px rgba(31, 78, 180, 0.3)',
                  '&:hover': {
                    bgcolor: '#1a439b',
                    transform: 'rotate(90deg)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <CloseIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
              </IconButton>
              <DialogContent sx={{ p: 0, position: 'relative' }}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={selectedClub.banner}
                    alt={selectedClub.name}
                    sx={{
                      width: '100%',
                      // height: { xs: '200px', sm: '300px' },
                      objectFit: 'cover',
                      filter: 'brightness(0.7)',
                      aspectRatio: '16/9',
                    }}
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      position: 'absolute',
                      bottom: { xs: '80px', sm: '100px' },
                      left: '50%',
                      transform: 'translateX(-50%)',
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      width: '100%',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      fontSize: { xs: '1.75rem', sm: '2.5rem' },
                      px: 2,
                    }}
                  >
                    {selectedClub.name}
                  </Typography>
                  <Box
                    component="img"
                    src={selectedClub.logo}
                    alt={`${selectedClub.name} logo`}
                    sx={{
                      width: { xs: '100px', sm: '140px' },
                      height: { xs: '100px', sm: '140px' },
                      borderRadius: '50%',
                      position: 'absolute',
                      bottom: { xs: '-50px', sm: '-70px' },
                      left: '50%',
                      transform: 'translateX(-50%)',
                      border: { xs: '6px solid white', sm: '8px solid white' },
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'white',
                    }}
                  />
                </Box>

                <Box sx={{ 
                  mt: { xs: 8, sm: 12 },
                  px: { xs: 2, sm: 4, md: 6 },
                  pb: { xs: 4, sm: 6 }
                }}>
                  <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 4, sm: 6 } }}>
                    <Grid item xs={6}>
                      <Box sx={{
                        p: 3,
                        textAlign: 'center',
                        bgcolor: styles.secondary,
                        borderRadius: 3,
                        boxShadow: '0 2px 8px rgba(31, 78, 180, 0.1)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <Typography variant="overline" sx={{ color: styles.primary, fontWeight: 'bold' }}>
                          ESTABLISHED
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: styles.primary }}>
                          {selectedClub.established}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{
                        p: 3,
                        textAlign: 'center',
                        bgcolor: styles.secondary,
                        borderRadius: 3,
                        boxShadow: '0 2px 8px rgba(31, 78, 180, 0.1)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <Typography variant="overline" sx={{ color: styles.primary, fontWeight: 'bold' }}>
                          TEAM SIZE
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: styles.primary }}>
                          {selectedClub.teamSize}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: { xs: 4, sm: 6 },
                      lineHeight: 1.8,
                      color: 'text.secondary',
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      textAlign: 'center',
                      maxWidth: '800px',
                      mx: 'auto'
                    }}
                  >
                    {selectedClub.description}
                  </Typography>

                  <Box sx={{ 
                    bgcolor: 'white', 
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                    mb: { xs: 4, sm: 6 }
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3,
                        color: styles.primary,
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      🏆 Key Achievements
                    </Typography>
                    <Grid container spacing={2}>
                      {selectedClub.achievements.map((achievement, index) => (
                        <Grid item xs={12} key={index}>
                          <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: styles.secondary,
                            '&:hover': {
                              transform: 'translateX(8px)',
                              bgcolor: '#E3EBFF'
                            },
                            transition: 'all 0.3s ease',
                          }}>
                            <Typography variant="body1">
                              {achievement}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Box sx={{ 
                    bgcolor: 'white', 
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)'
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: { xs: 3, sm: 4 },
                        color: styles.primary,
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                      }}
                    >
                      📞 Contact Information
                    </Typography>
                    <Grid container spacing={{ xs: 3, sm: 4 }}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={{ xs: 2, sm: 3 }}>
                          <Box>
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                              Coordinator
                            </Typography>
                            <Typography variant="h6">
                              {selectedClub.contacts.faculty}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                              Email
                            </Typography>
                            <Typography 
                              variant="h6" 
                              component="a" 
                              href={`mailto:${selectedClub.contacts.email}`}
                              sx={{ 
                                color: styles.primary,
                                textDecoration: 'none',
                                '&:hover': { color: '#1a439b' }
                              }}
                            >
                              {selectedClub.contacts.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={{ xs: 2, sm: 3 }}>
                          <Box>
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                              Phone
                            </Typography>
                            <Typography 
                              variant="h6" 
                              component="a" 
                              href={`tel:${selectedClub.contacts.phone}`}
                              sx={{ 
                                color: styles.primary,
                                textDecoration: 'none',
                                '&:hover': { color: '#1a439b' }
                              }}
                            >
                              {selectedClub.contacts.phone}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                              Social Media
                            </Typography>
                            <Stack direction="row" spacing={3}>
                              <Typography 
                                component="a" 
                                href={`https://instagram.com/${selectedClub.contacts.socialMedia.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ 
                                  color: '#E1306C',
                                  textDecoration: 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  '&:hover': { 
                                    transform: 'translateY(-2px)',
                                  },
                                  transition: 'transform 0.2s ease'
                                }}
                              >
                                <FaInstagram size={24} />
                              </Typography>
                              <Typography 
                                component="a" 
                                href={`https://linkedin.com/company/${selectedClub.contacts.socialMedia.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ 
                                  color: '#0077B5',
                                  textDecoration: 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  '&:hover': { 
                                    transform: 'translateY(-2px)',
                                  },
                                  transition: 'transform 0.2s ease'
                                }}
                              >
                                <FaLinkedin size={24} />
                              </Typography>
                            </Stack>
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Box>
      <Footer />
    </>
  );
}
