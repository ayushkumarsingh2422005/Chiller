import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Footer, TopBar } from '../../components';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Avatar,
  Paper,
  Grid,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Stack
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTube from '@mui/icons-material/YouTube';
import Language from '@mui/icons-material/Language';
import WhatsApp from '@mui/icons-material/WhatsApp';
import DOMPurify from 'dompurify';

export default function ClubDetails() {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const socialMediaConfig = {
    instagram: {
      icon: <InstagramIcon />,
      color: '#E4405F',
      label: 'Instagram'
    },
    facebook: {
      icon: <FacebookIcon />,
      color: '#1877F2',
      label: 'Facebook'
    },
    twitter: {
      icon: <TwitterIcon />,
      color: '#1DA1F2',
      label: 'Twitter'
    },
    linkedin: {
      icon: <LinkedInIcon />,
      color: '#0A66C2',
      label: 'LinkedIn'
    },
    youtube: {
      icon: <YouTube />,
      color: '#FF0000',
      label: 'YouTube'
    },
    website: {
      icon: <Language />,
      color: '#000000',
      label: 'Website'
    },
    whatsapp: {
      icon: <WhatsApp />,
      color: '#25D366',
      label: 'WhatsApp'
    }
  };

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/organization/details/${id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch organization details');
        }

        const data = await response.json();
        setOrganization(data.organization);
        setError(null);
      } catch (err) {
        setError('Failed to fetch organization details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationDetails();
  }, [id]);

  const handleCall = () => {
    if (organization?.phone) {
      window.location.href = `tel:${organization.phone}`;
    }
  };

  const handleEmail = () => {
    if (organization?.email) {
      window.location.href = `mailto:${organization.email}`;
    }
  };

  const handleSocialClick = (platform, link) => {
    if (!link) return;
    
    let url = link;
    if (platform === 'whatsapp') {
      url = `https://wa.me/${link.replace(/\+/, '')}`;
    } else if (!link.startsWith('http')) {
      url = `https://${link}`;
    }
    
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <>
        <TopBar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopBar />
        <Container sx={{ pt: 12, pb: 8 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Box sx={{ bgcolor: 'background.default', pt: 12, pb: 8 }}>
        <Container maxWidth="md">
          {/* Header Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
              <Grid item>
                <Avatar
                  src={organization?.image ? `${import.meta.env.VITE_IMAGE_URL}${organization.image}` : undefined}
                  alt={organization?.name}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="h4" gutterBottom>
                  {organization?.name}
                </Typography>
                
                {/* Contact Info Chips */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Chip
                    icon={<EventIcon />}
                    label={`${organization?.createdEvents?.length || 0} Events`}
                    variant="outlined"
                  />
                  {organization?.email && (
                    <Tooltip title="Click to send email">
                      <Chip
                        icon={<EmailIcon />}
                        label={organization.email}
                        variant="outlined"
                        onClick={handleEmail}
                        clickable
                        sx={{
                          '&:hover': {
                            bgcolor: 'action.hover',
                            cursor: 'pointer'
                          }
                        }}
                      />
                    </Tooltip>
                  )}
                  {organization?.phone && (
                    <Tooltip title="Click to call">
                      <Chip
                        icon={<PhoneIcon />}
                        label={organization.phone}
                        variant="outlined"
                        onClick={handleCall}
                        clickable
                        sx={{
                          '&:hover': {
                            bgcolor: 'action.hover',
                            cursor: 'pointer'
                          }
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Description Section */}
          {organization?.description && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography
                component="div"
                sx={{
                  '& a': { color: 'primary.main' },
                  '& ul, & ol': { pl: 2 },
                  '& blockquote': {
                    borderLeft: '4px solid',
                    borderColor: 'grey.300',
                    pl: 2,
                    ml: 0,
                    my: 1
                  }
                }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(organization.description)
                }}
              />
            </Paper>
          )}

          {/* Events Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Events
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {organization?.createdEvents?.length > 0 ? (
              <Grid container spacing={2}>
                {/* Add event cards here */}
                <Typography>Events will be displayed here</Typography>
              </Grid>
            ) : (
              <Typography color="text.secondary">
                No events created yet
              </Typography>
            )}
          </Paper>

          {/* Contact Section */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {/* Quick Contact Buttons */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Quick Contact
              </Typography>
              <Stack direction="row" spacing={2}>
                {organization?.phone && (
                  <Tooltip title="Call">
                    <IconButton 
                      onClick={handleCall}
                      color="primary"
                      sx={{ 
                        border: '1px solid',
                        borderColor: 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'white'
                        }
                      }}
                    >
                      <CallIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {organization?.email && (
                  <Tooltip title="Send Email">
                    <IconButton 
                      onClick={handleEmail}
                      color="primary"
                      sx={{ 
                        border: '1px solid',
                        borderColor: 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'white'
                        }
                      }}
                    >
                      <MailOutlineIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            </Box>

            {/* Social Media Grid */}
            {organization?.socialMedia && 
             Object.values(organization.socialMedia).some(link => link) && (
              <>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Social Media
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(organization.socialMedia).map(([platform, link]) => {
                    if (!link) return null;
                    const config = socialMediaConfig[platform];
                    if (!config) return null;

                    return (
                      <Grid item xs={12} sm={6} md={4} key={platform}>
                        <Box
                          onClick={() => handleSocialClick(platform, link)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1.5,
                            borderRadius: 1,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                              bgcolor: `${config.color}15`,
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{
                              color: config.color,
                              mr: 1,
                              '&:hover': { bgcolor: 'transparent' }
                            }}
                          >
                            {config.icon}
                          </IconButton>
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                              {config.label}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: config.color,
                                maxWidth: 200,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {platform === 'whatsapp' ? 
                                `+${link}` : 
                                link.replace(/^https?:\/\/(www\.)?/, '')}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
} 