import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Modal,
  Fade,
  Backdrop,
  Button,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";

const settings = [
  { name: "Profile", icon: <AccountCircleIcon fontSize="large" />, description: "Edit your profile details" },
  { name: "Change Password", icon: <LockIcon fontSize="large" />, description: "Update your password" },
  { name: "Notifications", icon: <NotificationsIcon fontSize="large" />, description: "Manage notification preferences" },
  { name: "Privacy Settings", icon: <PrivacyTipIcon fontSize="large" />, description: "Adjust privacy options" },
  { name: "Payment Methods", icon: <PaymentIcon fontSize="large" />, description: "Manage payment options" },
  { name: "Logout", icon: <LogoutIcon fontSize="large" />, description: "Sign out of your account" },
];

export default function UserSetting() {
  const [open, setOpen] = useState(false);
  const [currentSetting, setCurrentSetting] = useState(null);

  const handleOpen = (setting) => {
    setCurrentSetting(setting);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSetting(null);
  };

  const renderFields = () => {
    switch (currentSetting?.name) {
      case "Profile":
        return (
          <>
            <TextField fullWidth label="Full Name" variant="outlined" sx={{ my: 2 }} />
            <TextField fullWidth label="Email" variant="outlined" sx={{ my: 2 }} />
            <TextField fullWidth label="Phone Number" variant="outlined" sx={{ my: 2 }} />
          </>
        );
      case "Change Password":
        return (
          <>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              variant="outlined"
              sx={{ my: 2 }}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
              sx={{ my: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              sx={{ my: 2 }}
            />
          </>
        );
      case "Notifications":
        return (
          <>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email Notifications"
              sx={{ my: 2 }}
            />
            <FormControlLabel
              control={<Switch />}
              label="Push Notifications"
              sx={{ my: 2 }}
            />
            <FormControlLabel
              control={<Switch />}
              label="SMS Notifications"
              sx={{ my: 2 }}
            />
          </>
        );
      case "Privacy Settings":
        return (
          <>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Make Profile Public"
              sx={{ my: 2 }}
            />
            <FormControlLabel
              control={<Switch />}
              label="Allow Data Collection"
              sx={{ my: 2 }}
            />
          </>
        );
      case "Payment Methods":
        return (
          <>
            <TextField fullWidth label="Card Number" variant="outlined" sx={{ my: 2 }} />
            <TextField fullWidth label="Expiry Date" variant="outlined" sx={{ my: 2 }} />
            <TextField fullWidth label="CVV" variant="outlined" sx={{ my: 2 }} />
          </>
        );
      case "Logout":
        return (
          <Typography>
            Are you sure you want to logout? This action will sign you out from all devices.
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
        User Settings
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {settings.map((setting, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 3,
              borderRadius: 2,
              width: "300px",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
            onClick={() => handleOpen(setting)}
          >
            {/* Icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                bgcolor: "#EAF1FF",
              }}
            >
              {setting.icon}
            </Box>

            {/* Text Content */}
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {setting.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {setting.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Full-Screen Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: "400px",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {currentSetting?.name}
            </Typography>
            {renderFields()}
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
