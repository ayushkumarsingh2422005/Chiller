import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import DOMPurify from 'dompurify';

export default function EventOverview({ event }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'info';
      case 'upcoming':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: isMobile ? 'short' : 'long',
      year: 'numeric',
      month: isMobile ? 'short' : 'long',
      day: 'numeric',
    });
  };

  return (
    <Box>
      {/* Header Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          mb: { xs: 2, sm: 3 }, 
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          borderRadius: { xs: 0, sm: 1 }
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: isMobile ? 'flex-start' : 'center', 
              mb: 2,
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: isMobile ? 1 : 0
                }}
              >
                {event.name}
              </Typography>
              <Chip 
                label={event.status}
                color={getStatusColor(event.status)}
                size="small"
                sx={{ 
                  ml: isMobile ? 0 : 2,
                  mt: isMobile ? 1 : 0
                }}
              />
            </Box>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Organized by {event.organizer?.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ 
            display: 'flex', 
            justifyContent: isMobile ? 'flex-start' : 'flex-end'
          }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              size={isMobile ? "small" : "medium"}
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              Edit Event
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {/* Key Information Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Event Details
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarMonthIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(event.date)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body1">
                    {event.duration} hours
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    wordBreak: 'break-word',
                    maxWidth: isMobile ? '200px' : 'none'
                  }}>
                    {event.location}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Registration Information */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Registration Info
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Capacity
                  </Typography>
                  <Typography variant="body1">
                    {event.registrationProgress}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoneyIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Registration Fee
                  </Typography>
                  <Typography variant="body1">
                    ${event.registrationFee || 'Free'}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Registration Deadline
                  </Typography>
                  <Typography variant="body1">
                    {event.registrationDeadline ? formatDate(event.registrationDeadline) : 'No deadline'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'primary.light' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Quick Stats
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
                    <Typography variant={isMobile ? "h5" : "h4"} color="primary">
                      {event.totalRegistrations}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Registrations
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
                    <Typography variant={isMobile ? "h5" : "h4"} color="primary">
                      {event.totalAttendees}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Attendees
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Description Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Event Description
              </Typography>
              <Typography 
                variant="body1" 
                component="div"
                sx={{ 
                  '& img': { 
                    maxWidth: '100%', 
                    height: 'auto' 
                  }
                }}
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(event.description) 
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Resources Section */}
        {event.resources && event.resources.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Event Resources
                </Typography>
                <Grid container spacing={2}>
                  {event.resources.map((resource, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper sx={{ p: 2 }}>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            wordBreak: 'break-word',
                            mb: 1
                          }}
                        >
                          {resource.title}
                        </Typography>
                        <Button 
                          href={resource.link} 
                          target="_blank" 
                          variant="outlined" 
                          size={isMobile ? "small" : "medium"}
                          fullWidth={isMobile}
                        >
                          View Resource
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
} 