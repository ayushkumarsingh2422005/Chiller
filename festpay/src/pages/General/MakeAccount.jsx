import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
import { Footer, TopBar } from "../../components";

import user from "../../assets/images/user.png";
import org from "../../assets/images/org.png";
import { Link } from "react-router-dom";

export default function MakeAccount() {
    return (
        <>
            <TopBar />
            <Box
                sx={{
                    // mt: "20px", // Space for fixed TopBar
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
                    Create Your Account
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 4,
                        width: "100%",
                        maxWidth: "1200px",
                    }}
                >
                    {/* Organization Card */}
                    <Card
                        sx={{
                            width: { xs: "100%", sm: "45%", md: "30%" }, // Responsive width
                            boxShadow: 3,
                            borderRadius: 2,
                            transition: "transform 0.3s",
                            // "&:hover": { transform: "scale(1.05)" },
                            textAlign: "center",
                        }}
                    >
                        <CardMedia
                            component="img"
                            alt="Organization"
                            height="200"
                            image={org} // Replace with actual image URL
                        />
                        <CardContent>
                            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                                Organization
                            </Typography>
                            <Link to="/organization/auth">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mx: 1 }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mx: 1 }}
                                >
                                    Register
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* User Card */}
                    <Card
                        sx={{
                            width: { xs: "100%", sm: "45%", md: "30%" }, // Responsive width
                            boxShadow: 3,
                            borderRadius: 2,
                            transition: "transform 0.3s",
                            // "&:hover": { transform: "scale(1.05)" },
                            textAlign: "center",
                        }}
                    >
                        <CardMedia
                            component="img"
                            alt="User"
                            height="200"
                            image={user} // Replace with actual image URL
                        />
                        <CardContent>
                            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                                User
                            </Typography>
                            <Link to="/user/auth">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mx: 1 }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mx: 1 }}
                                >
                                    Register
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <Footer />
        </>
    );
}
