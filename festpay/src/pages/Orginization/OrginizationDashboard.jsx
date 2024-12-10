import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
  Avatar,
  Popover,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptIcon from '@mui/icons-material/Receipt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { OrganizationContext } from "../../context/OrganizationContext";
import { UserContext } from "../../context/UserContext";
import AllEvent from "./AllEvent";
import AddEvent from "./AddEvent";
import OrganizationProfile from "./OrganizationProfile"; // Fixed the spelling here
// import PaymentLink from "./PaymentLink";
import OrganizationTransaction from "./OrganizationTransaction"; // Fixed the spelling here
import PaymentLink from "./PaymentLink";
import Transaction from "./Transaction";
import OrganizationAccount from "./OrganizationAccount";
import EventDetails from './EventDetails';

// Updated Navigation with new icons
const NAVIGATION = [
  { text: "Add Event", icon: <EditCalendarIcon />, screen: "eventSearch", path: "/organization/add-event", component: <AddEvent /> },
  { text: "My Event", icon: <CalendarMonthIcon />, screen: "transactions", path: "/organization/all-event", component: <AllEvent /> },
  { text: "Account", icon: <AccountCircleIcon />, screen: "account", path: "/organization/account", component: <OrganizationAccount /> },
  { text: "Notification", icon: <NotificationsIcon />, screen: "notification", path: "/organization/notification", component: <OrganizationTransaction /> },
  { text: "Transictions", icon: <ReceiptIcon />, screen: "pay", path: "/organization/transictions", component: <Transaction /> },
  { text: "Links", icon: <InsertLinkIcon />, screen: "link", path: "/organization/links", component: <PaymentLink /> },
  { text: "Setting", icon: <SettingsIcon />, screen: "setting", path: "/organization/links", component: <PaymentLink /> }
];

const drawerWidth = 240;

function OrganizationDashboard(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    organizationData, 
    loading, 
    isOrganizationAvailable,
    fetchOrganizationData 
  } = useContext(OrganizationContext);

  // State to Track Current Screen
  const [currentScreen, setCurrentScreen] = useState("eventSearch");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Popover for Notifications
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const isPopoverOpen = Boolean(anchorEl);

  // Menu for Profile
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const handleProfileMenuOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/organization/auth');
        return;
      }

      try {
        await fetchOrganizationData();
      } catch (error) {
        console.error('Error fetching organization data:', error);
        localStorage.removeItem('token');
        navigate('/organization/auth');
      }
    };

    checkAuth();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Redirect if not authenticated
  if (!isOrganizationAvailable) {
    return null;
  }

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/organization/auth');
  };

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ ml: 1 }}>
          <Link to={"/"}>
            <img src={import.meta.env.VITE_FULL_DARK_LOGO_PATH} className="px-4" alt="Logo" />
          </Link>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {NAVIGATION.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => setCurrentScreen(item.screen)}
            selected={currentScreen === item.screen}
            sx={{
              bgcolor: currentScreen === item.screen ? "primary.main" : "inherit",
              "&:hover": { bgcolor: "primary.light" },
              cursor: 'pointer'
            }}
          >
            <ListItemIcon
              sx={{ color: currentScreen === item.screen ? "white" : "inherit" }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                color: currentScreen === item.screen ? "white" : "inherit",
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = typeof window !== 'undefined' ? window.document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {organizationData?.name || 'Dashboard'}
          </Typography>
          {/* Notifications Icon */}
          <IconButton color="inherit" onClick={handlePopoverOpen}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* Profile Avatar */}
          <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 2 }}>
            <Avatar>{organizationData?.name?.[0] || 'O'}</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Notifications Popover */}
      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">You have new notifications!</Typography>
        </Box>
      </Popover>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => setCurrentScreen("account")}>View Profile</MenuItem>
        <MenuItem onClick={() => setCurrentScreen("setting")}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {location.pathname.includes('/organization/event/') ? (
          <EventDetails />
        ) : (
          NAVIGATION.find((item) => item.screen === currentScreen)?.component || <AllEvent />
        )}
      </Box>
    </Box>
  );
}

OrganizationDashboard.propTypes = {
  window: PropTypes.func,
};

export default OrganizationDashboard;