import React from "react";
import { Box, Typography, Card, CardContent, CardActions, Button, Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const notifications = [
  {
    id: 1,
    title: "Event Registration Reminder",
    message: "Don't forget to register for the upcoming tech talk event. Limited seats available!",
    timestamp: "2024-11-24 10:00 AM",
    read: false,
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Your payment for the 'JavaScript Workshop' has been successfully processed.",
    timestamp: "2024-11-23 2:30 PM",
    read: true,
  },
  {
    id: 3,
    title: "Account Update",
    message: "Your account details have been successfully updated. If this wasn't you, please contact support.",
    timestamp: "2024-11-22 6:00 PM",
    read: false,
  },
];

export default function UserNotification() {
  return (
    <Box sx={{ p: 4 }}>

      {/* Notifications List */}
      <Box sx={{ maxWidth: "100%", margin: "0 auto" }}>
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            sx={{
              mb: 2,
              bgcolor: notification.read ? "#f0f0f0" : "#EAF1FF", // Highlight unread notifications
              borderRadius: 2,
              boxShadow: 2,
              width: "100%", // Full screen width
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                <NotificationsIcon sx={{ fontSize: 24, mr: 1 }} />
                {notification.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {notification.message}
              </Typography>
            </CardContent>

            <Divider />

            <CardActions sx={{ justifyContent: "space-between", paddingX: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
                <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5 }} />
                <Typography variant="body2">{notification.timestamp}</Typography>
              </Box>
              <Button variant="outlined" color="primary" size="small">
                Mark as Read
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
