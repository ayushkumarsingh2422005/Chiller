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
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptIcon from '@mui/icons-material/Receipt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import AllEvent from "./AllEvent";
import AddEvent from "./AddEvent";
import OrganizationProfile from "./OrganizationProfile"; // Fixed the spelling here
// import PaymentLink from "./PaymentLink";
import OrganizationTransaction from "./OrganizationTransaction"; // Fixed the spelling here
import PaymentLink from "./PaymentLink";
import Transaction from "./Transaction";

// Updated Navigation with new icons
const NAVIGATION = [
  { text: "Add Event", icon: <EditCalendarIcon />, screen: "eventSearch", path: "/organization/add-event", component: <AddEvent /> },
  { text: "My Event", icon: <CalendarMonthIcon />, screen: "transactions", path: "/organization/all-event", component: <AllEvent /> },
  { text: "Account", icon: <AccountCircleIcon />, screen: "account", path: "/organization/account", component: <OrganizationProfile /> },
  { text: "Notification", icon: <NotificationsIcon />, screen: "notification", path: "/organization/notification", component: <OrganizationTransaction /> },
  { text: "Transictions", icon: <ReceiptIcon />, screen: "pay", path: "/organization/transictions", component: <Transaction /> },
  { text: "Links", icon: <InsertLinkIcon />, screen: "link", path: "/organization/links", component: <PaymentLink /> },
  { text: "Setting", icon: <SettingsIcon />, screen: "setting", path: "/organization/links", component: <PaymentLink /> }
];

const drawerWidth = 240;

function OrganizationDashboard(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUserData } = useContext(UserContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  const { window } = props;

  const [currentScreen, setCurrentScreen] = useState("eventSearch");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Update current screen based on the URL
  useEffect(() => {
    const currentPath = location.pathname;
    const matchedNav = NAVIGATION.find((nav) => nav.path === currentPath);
    if (matchedNav) {
      setCurrentScreen(matchedNav.screen);
    }
  }, [location.pathname]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Update both state and URL on navigation
  const handleNavigation = (screen) => {
    const navItem = NAVIGATION.find((nav) => nav.screen === screen);
    if (navItem) {
      setCurrentScreen(screen);
      navigate(navItem.path);
    }
  };

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ ml: 1 }}>
          <Link to={"/"}>
            <img src={import.meta.env.VITE_FULL_DARK_LOGO_PATH} className="px-4" />
          </Link>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {NAVIGATION.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.screen)}
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
        </Toolbar>
      </AppBar>

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
        {NAVIGATION.find((item) => item.screen === currentScreen)?.component || <AllEvent />}
      </Box>
    </Box>
  );
}

OrganizationDashboard.propTypes = {
  window: PropTypes.func,
};

export default OrganizationDashboard;
