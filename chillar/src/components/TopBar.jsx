import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './Drawer'; // Make sure Drawer is implemented correctly
import { Link } from 'react-router-dom';


export default function TopBar() {
    const [drawer, setDrawer] = useState(false);

    // Function to toggle drawer open/close
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawer(open);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
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
                        sx={{ mr: 2 }}
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
                    
                    <Link to='/user/registration'>
                        <Button color="inherit">Login</Button>
                    </Link>
                </Toolbar>
            </AppBar>

            {/* Drawer Component */}
            <Drawer openState={drawer} toggleDrawer={toggleDrawer} />
        </Box>
    );
}
