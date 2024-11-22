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
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { generateRandomDarkColor } from '../utils/RandomColor';
import Divider from '@mui/material/Divider';


export default function TopBar() {
    const { userData, loading, isUserAvailable, fetchUserData } = useContext(UserContext);

    useEffect(() => {
        fetchUserData(); // Fetch user data on component mount
    }, []);

    const getInitials = (name) => {
        if (!name) return '?'; // Default for missing names
        const names = name.split(' ');
        return names.map((n) => n[0]?.toUpperCase()).join('').slice(0, 2);
    };

    const [drawer, setDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPopover, setOpenPopover] = useState(false);

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
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar sx={{
                    background: "linear-gradient(to left, #F2F3FF, #D6E8FF, #fefeff)",
                    color: "black"
                }}>
                    {/* Left Icon to Toggle Drawer */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2}}
                        onClick={toggleDrawer(true)} // Open drawer on click
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Title */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to={'/'}>
                            {import.meta.env.VITE_AGENCY_NAME}
                        </Link>
                    </Typography>

                    {/* Conditionally render Login or Avatar */}
                    {isUserAvailable && userData ? (
                        <div className="flex items-center gap-2">
                            {/* Notification Icon with Badge */}
                            <Badge badgeContent={4} color="secondary" onClick={handlePopoverOpen}>
                                <NotificationsActiveIcon />
                            </Badge>

                            {/* Popover with Dummy Notifications */}
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
                                    {/* Title Section */}
                                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                                        Notifications
                                    </Typography>

                                    {/* Divider for a neat separation */}
                                    <Divider sx={{ mb: 2 }} />

                                    {/* Notification List */}
                                    <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                                        {/* Notification Item 1 */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{
                                                width: 40, height: 40,
                                                borderRadius: '50%',
                                                bgcolor: 'primary.main',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mr: 1,
                                                aspectRatio: 1 / 1
                                            }}>
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

                                        {/* Notification Item 2 */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{
                                                width: 40, height: 40,
                                                borderRadius: '50%',
                                                bgcolor: 'secondary.main',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mr: 1,
                                                aspectRatio: 1 / 1
                                            }}>
                                                <Typography sx={{ color: 'white' }}>2</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" fontWeight="bold">
                                                    Registration Success
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Your registration for the upcoming conference was successful.
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Notification Item 3 */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{
                                                width: 40, height: 40,
                                                borderRadius: '50%',
                                                bgcolor: 'error.main',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mr: 1,
                                                aspectRatio: 1 / 1
                                            }}>
                                                <Typography sx={{ color: 'white' }}>3</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" fontWeight="bold">
                                                    Payment Received
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Payment for your event has been successfully processed.
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Notification Item 4 */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{
                                                width: 40, height: 40,
                                                borderRadius: '50%',
                                                bgcolor: 'success.main',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mr: 1,
                                                aspectRatio: 1 / 1
                                            }}>
                                                <Typography sx={{ color: 'white' }}>4</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" fontWeight="bold">
                                                    New User Registered
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    A new user has registered on the platform.
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* Divider for a neat separation */}
                                    <Divider sx={{ mt: 2 }} />

                                    {/* Button to view all notifications (if needed) */}
                                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                                        <Button variant="outlined" size="small" onClick={handlePopoverClose}>
                                            View All
                                        </Button>
                                    </Box>
                                </Box>
                            </Popover>

                            <div className="w-2"></div>
                            <Link to={'/dashboard'}>
                                <Avatar
                                    alt={userData.name}
                                    src={userData.profilePicture} // Assuming `profilePicture` is the avatar URL
                                    sx={{ bgcolor: generateRandomDarkColor() }}
                                >
                                    {getInitials(userData.name)} {/* Fallback to initials */}
                                </Avatar>
                            </Link>
                        </div>
                    ) : (
                        <Link to='/user/registration'>
                            <Button color="inherit">Login</Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>

            {/* Drawer Component */}
            <Drawer openState={drawer} toggleDrawer={toggleDrawer} />
        </Box>
    );
}
