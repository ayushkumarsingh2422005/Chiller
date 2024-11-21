import React, { useEffect, useState } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, FormControl, CircularProgress, Tabs, Tab, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/monkey.png';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin } from '@react-oauth/google';
import TopBar from '../components/TopBar';

const UserAuthPage = () => {
    const [activeTab, setActiveTab] = useState(0); // 0: Register, 1: Login
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        gender: 'Prefer Not to Choose',
    });
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
    const [profileCompleteModalOpen, setProfileCompleteModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleTabChange = (event, newTab) => {
        setActiveTab(newTab);
    };

    const handleInputChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        try {
            const endpoint =
                activeTab === 0
                    ? `${import.meta.env.VITE_SERVER_URL}/api/auth/user/register`
                    : `${import.meta.env.VITE_SERVER_URL}/api/auth/user/login`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);

                if (activeTab === 0) {
                    setWelcomeModalOpen(true);
                } else {
                    navigate('/dashboard');
                }
            } else {
                if (activeTab === 1) {
                    setErrorMessage('Invalid email or password.');
                } else if (response.status === 400) {
                    setProfileCompleteModalOpen(true);
                }
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (response) => {
        const googleToken = response.credential;

        // console.log(googleToken);

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user/google-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: googleToken }),
            });

            const data = await res.json();
            localStorage.setItem('token', data.token);
            // console.log(data);

            if (res.ok) {
                navigate('/dashboard');
            } else {
                console.error('Error during Google Login:', data.message);
            }
        } catch (error) {
            console.error('Google Login API Error:', error);
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google Login Error:', error);
    };

    const closeWelcomeModal = () => {
        setWelcomeModalOpen(false);
        navigate('/complete-profile');
    };

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigate('/dashboard');
        }

    },[]);

    return (
        <>
            <TopBar />
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    {/* Logo */}
                    <div className="text-center md:text-left md:w-1/3">
                        <img src={logo} alt="Logo" className="w-auto mx-auto md:mx-0" />
                    </div>

                    {/* Form */}
                    <div className="w-full md:w-2/3">
                        <Paper className="mb-4">
                            <Tabs value={activeTab} onChange={handleTabChange} centered>
                                <Tab label="Register" />
                                <Tab label="Login" />
                            </Tabs>
                        </Paper>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            {activeTab === 0 && (
                                <div className="space-y-4">
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={userDetails.name}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={userDetails.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type={passwordVisible ? 'text' : 'password'}
                                        value={userDetails.password}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={togglePasswordVisibility}>
                                                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            row
                                            name="gender"
                                            value={userDetails.gender}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                            <FormControlLabel
                                                value="Prefer Not to Choose"
                                                control={<Radio />}
                                                label="Prefer Not to Choose"
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Register'}
                                    </Button>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleFailure}
                                        useOneTap
                                    />
                                </div>
                            )}

                            {activeTab === 1 && (
                                <div className="space-y-4">
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={userDetails.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type={passwordVisible ? 'text' : 'password'}
                                        value={userDetails.password}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={togglePasswordVisibility}>
                                                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Login'}
                                    </Button>

                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleFailure}
                                        useOneTap
                                    />
                                </div>
                            )}
                        </form>

                        <br />

                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    </div>
                </div>

                {/* Welcome Modal */}
                <Dialog open={welcomeModalOpen}>
                    <DialogTitle>Welcome!</DialogTitle>
                    <DialogContent>
                        <Typography>Thank you for registering. Please complete your profile.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeWelcomeModal} color="primary">
                            Complete Profile
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Profile Completion Modal */}
                <Dialog
                    open={profileCompleteModalOpen}
                    onClose={() => setProfileCompleteModalOpen(false)}
                >
                    <DialogTitle>Already Registered!</DialogTitle>
                    <DialogContent>
                        <Typography>You have already registered. Please complete your profile.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeWelcomeModal} color="primary">
                            Complete Profile
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default UserAuthPage;
