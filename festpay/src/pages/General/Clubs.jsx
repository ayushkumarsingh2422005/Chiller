import React, { useState, useEffect } from 'react';
import { Footer, TopBar } from '../../components';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  List,
  ListItem,
  Typography,
  TextField,
  Box,
  CircularProgress,
  Alert,
  InputAdornment,
  Tooltip,
  Avatar,
  Paper,
  Divider,
  Grid,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const dummyAds = [
  {
    image: 'https://via.placeholder.com/600x200/FF5733/FFFFFF',
    link: 'https://example.com/ad1',
    title: 'Advertisement 1'
  },
  {
    image: 'https://via.placeholder.com/600x200/33FF57/FFFFFF',
    link: 'https://example.com/ad2',
    title: 'Advertisement 2'
  },
  {
    image: 'https://via.placeholder.com/600x200/3357FF/FFFFFF',
    link: 'https://example.com/ad3',
    title: 'Advertisement 3'
  }
];

export default function Clubs() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/organization/all?${params.toString()}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }

      const data = await response.json();
      setOrganizations(data.organizations);
      setError(null);
    } catch (err) {
      setError('Failed to fetch organizations');
      console.error('Error fetching organizations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [search]);

  const handleClubClick = (orgId) => {
    navigate(`/clubs/${orgId}`);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const AdSection = ({ isMobile }) => (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        Sponsored
      </Typography>
      {isMobile ? (
        <Paper elevation={0} sx={{ bgcolor: 'background.paper', overflow: 'hidden' }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            interval={4000}
          >
            {dummyAds.map((ad, index) => (
              <Box
                key={index}
                component="a"
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  position: 'relative',
                  '&:hover': { opacity: 0.9 },
                }}
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </Box>
            ))}
          </AutoPlaySwipeableViews>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              gap: 1
            }}
          >
            {dummyAds.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: index === activeStep ? 'primary.main' : 'grey.300',
                }}
              />
            ))}
          </Box>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {dummyAds.map((ad, index) => (
            <Paper
              key={index}
              elevation={0}
              component="a"
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'block',
                overflow: 'hidden',
                '&:hover': { opacity: 0.9 },
                textDecoration: 'none'
              }}
            >
              <img
                src={ad.image}
                alt={ad.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );

  return (
    <>
      <TopBar />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 12, pb: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Main content */}
            <Grid item xs={12} md={9}>
              {/* Search Section */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  mb: 2,
                  position: 'sticky',
                  top: 80,
                  zIndex: 1,
                  backgroundColor: 'background.default'
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search organizations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                />
              </Paper>

              {/* Ads section for small screens - Moved here */}
              <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
                <AdSection isMobile={true} />
              </Box>

              {/* Error Message */}
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {/* Loading State */}
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                /* Organizations List */
                <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                  {organizations.map((org, index) => (
                    <React.Fragment key={org._id}>
                      <ListItem 
                        onClick={() => handleClubClick(org._id)}
                        sx={{ 
                          py: 2,
                          px: 3,
                          display: 'flex',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'action.hover'
                          }
                        }}
                      >
                        {/* Organization Image */}
                        <Avatar
                          src={org.image ? `${import.meta.env.VITE_IMAGE_URL}${org.image}` : undefined}
                          alt={org.name}
                          sx={{ 
                            width: 56, 
                            height: 56,
                            mr: 2,
                            bgcolor: 'grey.200'
                          }}
                        />
                        
                        {/* Organization Details */}
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 500 }}>
                              {org.name}
                            </Typography>
                            <Tooltip title="Total Events Created">
                              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1.5, gap: 0.5 }}>
                                <EventIcon color="action" fontSize="small" />
                                <Typography variant="body2" color="text.secondary">
                                  {org.createdEvents?.length || 0}
                                </Typography>
                              </Box>
                            </Tooltip>
                          </Box>
                          
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.4
                            }}
                          >
                            {org.description || 'No description available'}
                          </Typography>
                        </Box>
                      </ListItem>
                      {index < organizations.length - 1 && (
                        <Divider component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              )}

              {/* No Results Message */}
              {!loading && organizations.length === 0 && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No organizations found
                  </Typography>
                </Box>
              )}
            </Grid>

            {/* Ads section for medium and larger screens */}
            <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'sticky', top: 96 }}>
                <AdSection isMobile={false} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
