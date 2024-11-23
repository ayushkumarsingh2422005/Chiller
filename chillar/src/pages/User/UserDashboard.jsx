import React, { useState } from "react";
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
  Avatar,
  Popover,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventSearch from "./EventSearch";
import UserSetting from "./UserSetting";
import BookMark from "./BookMark";
import UserTransaction from "./UserTransaction";
import UserAccount from "./UserAccount";
// import UserProfile from "./UserAccount";

// Example Content components

function OrdersContent() {
  return <Box><Typography variant="h4">Manage Orders</Typography></Box>;
}

// Navigation Items
const NAVIGATION = [
  { text: "Event Search", icon: <EventAvailableIcon />, screen: "eventSearch", component: <EventSearch /> },
  { text: "Transactions", icon: <ShoppingCartIcon />, screen: "transactions", component: <UserTransaction /> },
  { text: "BookMark", icon: <BookmarkIcon />, screen: "bookmark", component: <BookMark /> },
  { text: "Account", icon: <AccountCircleIcon />, screen: "account", component: <UserAccount /> },
  { text: "Setting", icon: <SettingsIcon />, screen: "usersetting", component: <UserSetting /> },
];

// Drawer Width
const drawerWidth = 240;

function UserDashboard(props) {
  const { window } = props;

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

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ ml: 1 }}>Chillar</Typography>
      </Toolbar>
      <Divider />
      <List>
        {NAVIGATION.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => setCurrentScreen(item.screen)}
            selected={currentScreen === item.screen}
            sx={{
              bgcolor: currentScreen === item.screen ? "primary.main" : "inherit",
              "&:hover": { bgcolor: "primary.light" },
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top AppBar */}
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
            {NAVIGATION.find((item) => item.screen === currentScreen)?.text || "Dashboard"}
          </Typography>
          {/* Notifications Icon */}
          <IconButton color="inherit" onClick={handlePopoverOpen}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* Profile Avatar */}
          <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 2 }}>
            <Avatar>U</Avatar>
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
        <MenuItem onClick={() => alert("View Profile")}>View Profile</MenuItem>
        <MenuItem onClick={() => alert("Edit Profile")}>Edit Profile</MenuItem>
        <MenuItem onClick={() => alert("Logout")}>Logout</MenuItem>
      </Menu>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar"
      >
        {/* Mobile Drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Permanent Drawer */}
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

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Render the Current Screen's Content */}
        {NAVIGATION.find((item) => item.screen === currentScreen)?.component || <EventSearch />}
      </Box>
    </Box>
  );
}

UserDashboard.propTypes = {
  window: PropTypes.func,
};

export default UserDashboard;
