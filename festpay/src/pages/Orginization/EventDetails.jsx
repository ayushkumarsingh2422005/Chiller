import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LinkIcon from '@mui/icons-material/Link';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 240;

function TabPanel({ children, value, index, ...other }) {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const NAVIGATION = [
  { text: "Overview", icon: <InfoIcon />, index: 0 },
  { text: "Attendees", icon: <PeopleIcon />, index: 1 },
  { text: "Transactions", icon: <ReceiptIcon />, index: 2 },
  { text: "Payment Links", icon: <LinkIcon />, index: 3 },
  { text: "Statistics", icon: <BarChartIcon />, index: 4 },
];

export default function EventDetails() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/event/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch event details');
      
      const data = await response.json();
      setEvent(data.event);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Event not found</Typography>
      </Box>
    );
  }

  const renderContent = () => {
    switch (value) {
      case 0: // Overview
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                      {event.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {event.description}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="primary">Event Details</Typography>
                        <Typography variant="body2">Date: {new Date(event.date).toLocaleDateString()}</Typography>
                        <Typography variant="body2">Duration: {event.duration} hours</Typography>
                        <Typography variant="body2">Location: {event.location}</Typography>
                        <Typography variant="body2">Status: {event.status}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="primary">Registration Info</Typography>
                        <Typography variant="body2">
                          Registration Required: {event.registrationRequired ? 'Yes' : 'No'}
                        </Typography>
                        {event.registrationRequired && (
                          <>
                            <Typography variant="body2">
                              Fee: ${event.registrationFee}
                            </Typography>
                            <Typography variant="body2">
                              Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}
                            </Typography>
                          </>
                        )}
                        <Typography variant="body2">
                          Spots: {event.registrationProgress}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      sx={{ mr: 1 }}
                    >
                      Edit Event
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        );
      case 1: // Attendees
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Attendees List</Typography>
            {/* Add attendees list component here */}
          </Paper>
        );
      case 2: // Transactions
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Transactions List</Typography>
            {/* Add transactions list component here */}
          </Paper>
        );
      case 3: // Payment Links
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Payment Links</Typography>
            {/* Add payment links component here */}
          </Paper>
        );
      case 4: // Statistics
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Event Statistics</Typography>
            {/* Add statistics component here */}
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {NAVIGATION.map((item) => (
              <ListItem
                button
                key={item.text}
                selected={value === item.index}
                onClick={() => setValue(item.index)}
                sx={{
                  bgcolor: value === item.index ? "primary.main" : "inherit",
                  "&:hover": { bgcolor: "primary.light" },
                  color: value === item.index ? "white" : "inherit",
                }}
              >
                <ListItemIcon sx={{ color: value === item.index ? "white" : "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderContent()}
      </Box>
    </Box>
  );
} 