import React from "react";
import { Box, Typography, Avatar, Divider, Button } from "@mui/material";
import { Phone, Mail, School, Female } from "@mui/icons-material";

export default function UserAccount() {
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
            src="https://via.placeholder.com/100" // Replace with actual image URL
            alt="Profile Picture"
            sx={{
              width: 80,
              height: 80,
              border: "4px solid #4caf50",
            }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Bhupender Jogi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Profile last updated - 31st Nov'24
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
          <Typography>Female</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Phone sx={{ color: "#4caf50", mr: 2 }} />
          <Typography>+91 9876543210</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Mail sx={{ color: "#4caf50", mr: 2 }} />
          <Typography>bhupenderjogi420@gmail.com</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <School sx={{ color: "#4caf50", mr: 2 }} />
          <Typography>National Institute of Technology Jamshedpur</Typography>
        </Box>
      </Box>
    </Box>
  );
}
