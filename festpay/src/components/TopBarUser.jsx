import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './Drawer'; // Make sure Drawer is implemented correctly
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';

export default function TopBarUser() {
    const { userData, loading, isUserAvailable, fetchUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const [drawer, setDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPopover, setOpenPopover] = useState(false);

    // Redirect if user is not available
    useEffect(() => {
        fetchUserData(); // Fetch user data on component mount
        if (!isUserAvailable && !loading) {
            navigate('/');
        }
    }, [isUserAvailable, loading, fetchUserData, navigate]);

    const getInitials = (name) => {
        if (!name) return '?'; // Default for missing names
        const names = name.split(' ');
        return names.map((n) => n[0]?.toUpperCase()).join('').slice(0, 2);
    };

    // Generate constant color based on user name (hash)
    const generateConstantColor = (name) => {
        if (!name) return '#cccccc'; // Fallback color
        const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colors = ['#ff5722', '#2196f3', '#4caf50', '#9c27b0', '#ff9800', '#607d8b'];
        return colors[hash % colors.length];
    };

    // Function to toggle drawer open/close
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawer(open);
    };

    // Function to handle the opening of the popover
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPopover(true);
    };

    // Function to handle the closing of the popover
    const handlePopoverClose = () => {
        setOpenPopover(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar
                    sx={{
                        background: 'linear-gradient(to left, #F2F3FF, #D6E8FF, #fefeff)',
                        color: 'black',
                    }}
                >
                    {/* Left Icon to Toggle Drawer */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)} // Open drawer on click
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Title */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to={'/'}>{import.meta.env.VITE_AGENCY_NAME}</Link>
                    </Typography>

                    {/* Conditionally render Login or Avatar */}
                    <div className="flex items-center gap-2">
                        {/* Notification Icon with Badge */}
                        <Badge badgeContent={4} color="secondary" onClick={handlePopoverOpen}>
                            <NotificationsActiveIcon />
                        </Badge>

                        {/* Popover with Notifications */}
                        <Popover
                            open={openPopover}
                            anchorEl={anchorEl}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <Box sx={{ width: 350, p: 2 }}>
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                                    Notifications
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                                    {/* Example Notification */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                bgcolor: 'primary.main',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mr: 1,
                                            }}
                                        >
                                            <Typography sx={{ color: 'white' }}>1</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" fontWeight="bold">
                                                Event Scheduled
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                A new event has been scheduled for next week.
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {/* Add other notifications here */}
                                </Box>
                                <Divider sx={{ mt: 2 }} />
                                <Box sx={{ textAlign: 'center', mt: 1 }}>
                                    <Button variant="outlined" size="small" onClick={handlePopoverClose}>
                                        View All
                                    </Button>
                                </Box>
                            </Box>
                        </Popover>

                        <div className="w-2"></div>
                        {userData && (
                            <Link to={'/dashboard'}>
                                <Avatar
                                    alt={userData.name}
                                    src={userData.profilePicture} // Profile picture URL
                                    sx={{
                                        bgcolor: generateConstantColor(userData.name),
                                    }}
                                >
                                    {getInitials(userData.name)} {/* Fallback to initials */}
                                </Avatar>
                            </Link>
                        )}
                    </div>
                </Toolbar>
            </AppBar>

            {/* Drawer Component */}
            <Drawer openState={drawer} toggleDrawer={toggleDrawer} />
        </Box>
    );
}
