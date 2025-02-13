import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
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
  Avatar,
  IconButton,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LinkIcon from '@mui/icons-material/Link';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventOverview from './sections/EventOverview';
import EventAttendees from './sections/EventAttendees';
import EventTransactions from './sections/EventTransactions';
import EventPaymentLinks from './sections/EventPaymentLinks';
import EventStatistics from './sections/EventStatistics';

const drawerWidth = 240;

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/event/${id}`, {
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
      case 0:
        return <EventOverview event={event} />;
      case 1:
        return <EventAttendees event={event} />;
      case 2:
        return <EventTransactions event={event} />;
      case 3:
        return <EventPaymentLinks event={event} />;
      case 4:
        return <EventStatistics event={event} />;
      default:
        return null;
    }
  };

  const renderMobileNavigation = () => (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        borderRadius: 0,
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        {NAVIGATION.map((item) => (
          <BottomNavigationAction
            key={item.text}
            label={item.text}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );

  const renderDesktopNavigation = () => (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        display: { xs: 'none', sm: 'block' }
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
                borderRadius: 1,
                mx: 1,
                mb: 1,
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
  );

  return (
    <Box sx={{ display: 'flex', pb: isMobile ? '56px' : 0 }}>
      <CssBaseline />
      {!isMobile && renderDesktopNavigation()}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mb: isMobile ? 7 : 0
        }}
      >
        {renderContent()}
      </Box>
      {isMobile && renderMobileNavigation()}
    </Box>
  );
} 