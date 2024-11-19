import React, { useState } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem, CircularProgress, Tabs, Tab, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/monkey.png'

const UserRegistrationLoginPage = () => {
    const [tabValue, setTabValue] = useState(0);  // 0 for Registration, 1 for Login
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        registrationNumber: '',
        idcard: null, // Store image file
        program: '',
        branch: '',
        gender: 'Prefer Not to Choose',
    });
    const [loading, setLoading] = useState(false);  // To handle loading state
    const navigate = useNavigate();  // To redirect after successful action

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChange = (e) => {
        if (e.target.name === 'idcard') {
            // Handle image file input
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0],  // Store the file
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.idcard && tabValue === 0) {
            alert('Please upload your ID card image.');
            return;
        }

        setLoading(true);

        // Form data preparation for submission
        const formToSubmit = new FormData();
        Object.keys(formData).forEach((key) => {
            formToSubmit.append(key, formData[key]);
        });

        try {
            if (tabValue === 0) {
                // Simulate registration process
                console.log("Registering User", formData);
                navigate('/welcome');
            } else {
                // Simulate login process
                console.log("Logging in User", formData);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error during action:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                {/* Logo Section */}
                <div className="text-center md:text-left md:w-1/3">
                    {/* <Typography variant="h4" className="font-semibold mb-4 text-center">Chiller</Typography> */}
                    <img src={logo} alt="Logo" className="w-auto mx-auto md:mx-0" />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-2/3">
                    {/* <Typography variant="h4" className="text-center font-semibold mb-4">Welcome to Our Platform</Typography> */}

                    <Paper className="mb-4">
                        <Tabs value={tabValue} onChange={handleTabChange} centered>
                            <Tab label="Register" />
                            <Tab label="Login" />
                        </Tabs>
                    </Paper>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {tabValue === 0 && (
                            // Registration Form
                            <div className="space-y-4">
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="mb-4"
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="mb-4"
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="mb-4"
                                />
                                <TextField
                                    label="Registration Number"
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="mb-4"
                                />
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        name="idcard"
                                        onChange={handleChange}
                                        accept="image/*"
                                        required
                                        className="block w-full p-2 border rounded-md"
                                    />
                                    {formData.idcard && (
                                        <div className="mt-4">
                                            <Typography variant="body1">Selected Image:</Typography>
                                            <img
                                                src={URL.createObjectURL(formData.idcard)}
                                                alt="ID Card Preview"
                                                className="mt-2 w-full max-w-xs rounded-md shadow-md"
                                            />
                                        </div>
                                    )}
                                </div>
                                <FormControl fullWidth required className="mb-4">
                                    <InputLabel>Program</InputLabel>
                                    <Select
                                        name="program"
                                        value={formData.program}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="UG">Undergraduate</MenuItem>
                                        <MenuItem value="PG">Postgraduate</MenuItem>
                                        <MenuItem value="Ph.d">Ph.D</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Branch"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="mb-4"
                                />
                                <FormControl component="fieldset" className="mb-4">
                                    <RadioGroup
                                        row
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="Prefer Not to Choose" control={<Radio />} label="Prefer Not to Choose" />
                                    </RadioGroup>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    className="mt-4"
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Register'}
                                </Button>
                            </div>
                        )}

                        {tabValue === 1 && (
                            // Login Form
                            <div className="space-y-4">
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="mb-4"
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="mb-4"
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    className="mt-4"
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Login'}
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserRegistrationLoginPage;
