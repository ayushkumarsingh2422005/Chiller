import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function Page404() {
    return (
        <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                sx={{
                    textAlign: 'center',
                    color: 'text.primary',
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                }}
            >
                {/* Illustration or Icon */}
                <SentimentDissatisfiedIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
                
                {/* 404 Message */}
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Oops! The page you're looking for doesn't exist.
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                    Maybe it was removed or you mistyped the URL. Let's get you back on track.
                </Typography>

                {/* Button to Redirect to Home */}
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        px: 4,
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                    }}
                >
                    Go Home
                </Button>
            </Box>
        </Container>
    );
}
