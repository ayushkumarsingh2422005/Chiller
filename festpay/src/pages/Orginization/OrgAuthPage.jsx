import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Tabs, Tab, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Alert, CircularProgress, Box, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../components';
import organizationImg from '../../assets/images/organization.svg';
import { OrganizationContext } from '../../context/OrganizationContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function OrgAuthPage() {
    const { organizationData, isOrganizationAvailable, fetchOrganizationData } = useContext(OrganizationContext);
    const [activeTab, setActiveTab] = useState(0); // 0: Register, 1: Login
    const [orgDetails, setOrgDetails] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/organization/dashboard');
        }
    }, []);

    const handleTabChange = (event, newTab) => {
        setActiveTab(newTab);
    };

    const handleInputChange = (e) => {
        setOrgDetails({
            ...orgDetails,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!orgDetails.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setErrorMessage('Please enter a valid email address.');
            return false;
        }
        if (orgDetails.password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return false;
        }
        if (activeTab === 0 && !orgDetails.phone.match(/^\d{10}$/)) {
            setErrorMessage('Please enter a valid 10-digit phone number.');
            return false;
        }
        return true;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setLoading(true);
        setErrorMessage(null);

        try {
            const endpoint = activeTab === 0
                ? `${import.meta.env.VITE_SERVER_URL}/auth/organization/register`
                : `${import.meta.env.VITE_SERVER_URL}/auth/organization/login`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orgDetails),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                await fetchOrganizationData();
                navigate('/organization/dashboard');
            } else {
                setErrorMessage(data.message || 'Authentication failed. Please try again.');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const closeWelcomeModal = () => {
        setWelcomeModalOpen(false);
        navigate('/organization/complete-profile');
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <TopBar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 mt-14">
                <div className="max-w-7xl mx-auto">
                    <Paper elevation={3} className="rounded-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col justify-center items-center text-white">
                                <img 
                                    src={organizationImg} 
                                    alt="Organization" 
                                    className="w-3/4 max-w-md mb-8 animate-float"
                                />
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold mb-4">
                                        {activeTab === 0 ? 'Join Our Platform' : 'Welcome Back'}
                                    </h2>
                                    <p className="text-lg text-blue-100">
                                        {activeTab === 0 
                                            ? 'Create an account to showcase your events and connect with participants.'
                                            : 'Sign in to manage your events and organization profile.'}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 p-8">
                                <Paper elevation={0} className="mb-6">
                                    <Tabs 
                                        value={activeTab} 
                                        onChange={handleTabChange} 
                                        centered
                                        sx={{
                                            '& .MuiTabs-indicator': {
                                                backgroundColor: '#4F46E5',
                                            },
                                            '& .Mui-selected': {
                                                color: '#4F46E5 !important',
                                            },
                                        }}
                                    >
                                        <Tab label="Register" />
                                        <Tab label="Login" />
                                    </Tabs>
                                </Paper>

                                <form onSubmit={handleFormSubmit} className="space-y-6">
                                    {activeTab === 0 && (
                                        <div className="space-y-4">
                                            <TextField
                                                label="Organization Name"
                                                name="name"
                                                value={orgDetails.name}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '&:hover fieldset': {
                                                            borderColor: '#4F46E5',
                                                        },
                                                    },
                                                }}
                                            />
                                            <TextField
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={orgDetails.email}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                            />
                                            <TextField
                                                label="Phone Number"
                                                name="phone"
                                                type="tel"
                                                value={orgDetails.phone}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                placeholder="10-digit phone number"
                                                inputProps={{
                                                    maxLength: 10,
                                                    pattern: '[0-9]*'
                                                }}
                                                helperText="Enter 10-digit phone number without spaces or special characters"
                                            />
                                            <TextField
                                                label="Password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={orgDetails.password}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                helperText="Password must be at least 6 characters long"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleTogglePasswordVisibility}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                fullWidth
                                                disabled={loading}
                                                sx={{
                                                    backgroundColor: '#4F46E5',
                                                    padding: '12px',
                                                    '&:hover': {
                                                        backgroundColor: '#4338CA',
                                                    },
                                                }}
                                            >
                                                {loading ? <CircularProgress size={24} /> : 'Register'}
                                            </Button>
                                        </div>
                                    )}

                                    {activeTab === 1 && (
                                        <div className="space-y-4">
                                            <TextField
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={orgDetails.email}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                            />
                                            <TextField
                                                label="Password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={orgDetails.password}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleTogglePasswordVisibility}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                fullWidth
                                                disabled={loading}
                                                sx={{
                                                    backgroundColor: '#4F46E5',
                                                    padding: '12px',
                                                    '&:hover': {
                                                        backgroundColor: '#4338CA',
                                                    },
                                                }}
                                            >
                                                {loading ? <CircularProgress size={24} /> : 'Login'}
                                            </Button>
                                        </div>
                                    )}
                                </form>

                                {errorMessage && (
                                    <Alert 
                                        severity="error" 
                                        className="mt-4"
                                        sx={{
                                            borderRadius: '8px',
                                        }}
                                    >
                                        {errorMessage}
                                    </Alert>
                                )}
                            </div>
                        </div>
                    </Paper>
                </div>

                <Dialog 
                    open={welcomeModalOpen}
                    PaperProps={{
                        style: {
                            borderRadius: '12px',
                        },
                    }}
                >
                    <DialogTitle>Welcome!</DialogTitle>
                    <DialogContent>
                        <Typography>Thank you for registering. Please complete your profile.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={closeWelcomeModal} 
                            sx={{
                                color: '#4F46E5',
                            }}
                        >
                            Complete Profile
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
} 