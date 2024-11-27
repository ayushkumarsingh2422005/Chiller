import React, { useContext } from "react";
import { Box, Typography, Avatar, Divider, Button } from "@mui/material";
import { Phone, Mail, School, Female } from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";

export default function UserAccount() {
  // const {userData} = useContext(UserContext);
  const userData = {
    "_id": {
      "$oid": "673cbdbf4c7cfe90ebfb4f51"
    },
    name: "Ayush Kumar",
    email: "ayush2422005@gmail.com",
    "password": "$2a$10$tl2GVM5p6AfX1Kr87imp9eXgZsSbC7T3qLedSCELp58krNUuFwYB.",
    "profileCompleted": false,
    profilePicture: "https://lh3.googleusercontent.com/a/ACg8ocLytd15xk0Cgz22HqoPOZqIgNTZ9NQtUj3do4Pq5uhbvKi5Pmci=s96-c",
    "active": true,
    gender: "Male",
    "notificationsEnabled": true,
    "enrolledEvents": [],
    createdAt: "2024-11-19T16:33:03.649Z",
    updatedAt: "2024-11-25T10:09:11.395Z",
    "__v": 0,
    "googleId": "116178257685431897801",
    phone: "8299797515",
    college: "National Institute of technology Jamshedput",
    "registrationNumber": "2023UGCS086",
    "branch": "CSE",
    "program": "UG"
  };
  console.log(userData);
  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 3,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Top Section with Avatar and Name */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Avatar with Border */}
          <Avatar
            src={userData.profilePicture} // Replace with actual image URL
            alt={userData.name}
            sx={{
              width: 80,
              height: 80,
              border: "4px solid #4caf50",
            }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Profile last updated - {userData.updatedAt}
            </Typography>
            {/* Progress Bar and View ID */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Box
                sx={{
                  width: 100,
                  height: 6,
                  bgcolor: "#e0e0e0",
                  borderRadius: 1,
                  overflow: "hidden",
                  mr: 1,
                }}
              >
                <Box
                  sx={{
                    width: "74%",
                    height: "100%",
                    bgcolor: "#4caf50",
                  }}
                />
              </Box>
              <Typography variant="body2" fontWeight="bold" color="text.secondary">
                74%
              </Typography>
            </Box>
            <Button
              size="small"
              sx={{ mt: 1, textTransform: "none", color: "#4caf50", fontWeight: "bold" }}
            >
              View ID Card
            </Button>
          </Box>
        </Box>
        {/* Share Icon */}
        <Box
          sx={{
            cursor: "pointer",
            fontSize: 20,
          }}
        >
          &#x1F517; {/* Share Icon */}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Profile Details */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Female sx={{ color: "#4caf50", mr: 2 }} />
          <Typography>{userData.gender}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Phone sx={{ color: "#4caf50", mr: 2 }} />
          <Typography>{userData.phone ? userData.phone : "xxxxxxxxxx"}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Mail sx={{ color: "#4caf50", mr: 2 }} />
          <Typography>{userData.email}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <School sx={{ color: "#4caf50", mr: 2 }} />
          <Typography>{userData.college ? userData.college : "Not Chosen Yet"}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
