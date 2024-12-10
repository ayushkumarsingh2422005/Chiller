import React, { useContext, useState } from "react";
import { 
  Box, 
  Typography, 
  Avatar, 
  Divider, 
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { 
  Phone, 
  Mail, 
  School, 
  Female, 
  Edit, 
  Save, 
  Cancel, 
  Grade, 
  Class, 
  Badge,
  Warning,
  CameraAlt
} from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";

export default function UserAccount() {
  const { userData, fetchUserData } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Initialize editedData when entering edit mode
  const handleEditClick = () => {
    setEditedData({
      name: userData?.name || '',
      phone: userData?.phone || '',
      gender: userData?.gender || 'Prefer Not to Choose',
      college: userData?.college || '',
      program: userData?.program || '',
      branch: userData?.branch || '',
      registrationNumber: userData?.registrationNumber || ''
    });
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        await fetchUserData();
        setEditMode(false);
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error (show message to user)
    }
  };

  const handleImageClick = () => {
    document.getElementById('profile-image-input').click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profilePicture', file);

        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/update-profile-picture`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          await fetchUserData();
        } else {
          throw new Error('Failed to update profile picture');
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
        // Handle error (show message to user)
      }
    }
  };
  // console.log(import.meta.env.VITE_IMAGE_URL+userData.profilePicture)
  if (!userData) return <Typography>Loading...</Typography>;

  const calculateProfileCompletion = () => {
    const requiredFields = [
      { name: 'name', value: userData?.name },
      { name: 'email', value: userData?.email },
      { name: 'phone', value: userData?.phone },
      { name: 'gender', value: userData?.gender },
      { name: 'college', value: userData?.college },
      { name: 'program', value: userData?.program },
      { name: 'branch', value: userData?.branch },
      { name: 'registrationNumber', value: userData?.registrationNumber }
    ];

    const completedFields = requiredFields.filter(field => field.value && field.value !== 'Prefer Not to Choose');
    const percentage = Math.round((completedFields.length / requiredFields.length) * 100);
    
    const missingFields = requiredFields
      .filter(field => !field.value || field.value === 'Prefer Not to Choose')
      .map(field => field.name);

    return {
      percentage,
      isComplete: percentage === 100,
      missingFields
    };
  };

  const ProfileCompletionStatus = ({ completion }) => (
    <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Profile Completion Status
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box
          sx={{
            width: '100%',
            height: 8,
            bgcolor: '#e0e0e0',
            borderRadius: 1,
            overflow: 'hidden',
            mr: 1,
          }}
        >
          <Box
            sx={{
              width: `${completion.percentage}%`,
              height: '100%',
              bgcolor: completion.isComplete ? '#4caf50' : '#ff9800',
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </Box>
        <Typography variant="body2" fontWeight="bold" sx={{ minWidth: 45 }}>
          {completion.percentage}%
        </Typography>
      </Box>
      {!completion.isComplete && (
        <Typography variant="body2" color="warning.main">
          Missing information: {completion.missingFields.map(field => 
            field.charAt(0).toUpperCase() + field.slice(1)
          ).join(', ')}
        </Typography>
      )}
    </Box>
  );
  const renderField = (label, value, field) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>{label}:</Typography>
        {editMode ? (
          <TextField
            value={editedData[field]}
            onChange={(e) => setEditedData({ ...editedData, [field]: e.target.value })}
            size="small"
            sx={{ minWidth: 200 }}
          />
        ) : (
          <Typography>{value || "Not provided"}</Typography>
        )}
      </Box>
    );
  };

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
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={import.meta.env.VITE_IMAGE_URL+userData.profilePicture}
              alt={userData.name}
              sx={{
                width: 80,
                height: 80,
                border: "4px solid #4caf50",
              }}
            />
            {editMode && (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    right: -5,
                    bgcolor: '#4caf50',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#3d8b40',
                    },
                  }}
                  onClick={handleImageClick}
                >
                  <CameraAlt sx={{ color: 'white', fontSize: 18 }} />
                </Box>
                <input
                  type="file"
                  id="profile-image-input"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </>
            )}
          </Box>
          <Box sx={{ ml: 2 }}>
            {editMode ? (
              <TextField
                value={editedData.name}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                size="small"
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography variant="h6" fontWeight="bold">
                {userData.name}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              Profile last updated - {new Date(userData.updatedAt).toLocaleDateString()}
            </Typography>
            
            <ProfileCompletionStatus completion={calculateProfileCompletion()} />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Profile Details */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Personal Information</Typography>
        
        {/* Gender Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Female sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Gender:</Typography>
          {editMode ? (
            <Select
              value={editedData.gender}
              onChange={(e) => setEditedData({ ...editedData, gender: e.target.value })}
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Prefer Not to Choose">Prefer Not to Choose</MenuItem>
            </Select>
          ) : (
            <Typography>{userData.gender}</Typography>
          )}
        </Box>

        {/* Phone Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Phone sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Phone:</Typography>
          {editMode ? (
            <TextField
              value={editedData.phone}
              onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
              size="small"
              sx={{ minWidth: 200 }}
            />
          ) : (
            <Typography>{userData.phone || "Not provided"}</Typography>
          )}
        </Box>

        {/* Email Field (Read-only) */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Mail sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Email:</Typography>
          <Typography>{userData.email}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        {/* Academic Information */}
        <Typography variant="h6" sx={{ mb: 2 }}>Academic Information</Typography>

        {/* College Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <School sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>College:</Typography>
          {editMode ? (
            <TextField
              value={editedData.college}
              onChange={(e) => setEditedData({ ...editedData, college: e.target.value })}
              size="small"
              sx={{ minWidth: 200 }}
            />
          ) : (
            <Typography>{userData.college || "Not provided"}</Typography>
          )}
        </Box>

        {/* Program Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Grade sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Program:</Typography>
          {editMode ? (
            <Select
              value={editedData.program}
              onChange={(e) => setEditedData({ ...editedData, program: e.target.value })}
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="UG">UG</MenuItem>
              <MenuItem value="PG">PG</MenuItem>
              <MenuItem value="Ph.d">Ph.D</MenuItem>
            </Select>
          ) : (
            <Typography>{userData.program || "Not provided"}</Typography>
          )}
        </Box>

        {/* Branch Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Class sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Branch:</Typography>
          {editMode ? (
            <TextField
              value={editedData.branch}
              onChange={(e) => setEditedData({ ...editedData, branch: e.target.value })}
              size="small"
              sx={{ minWidth: 200 }}
            />
          ) : (
            <Typography>{userData.branch || "Not provided"}</Typography>
          )}
        </Box>

        {/* Registration Number Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Badge sx={{ color: "#4caf50", mr: 2 }} />
          <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>Registration Number:</Typography>
          {editMode ? (
            <TextField
              value={editedData.registrationNumber}
              onChange={(e) => setEditedData({ ...editedData, registrationNumber: e.target.value })}
              size="small"
              sx={{ minWidth: 200 }}
            />
          ) : (
            <Typography>{userData.registrationNumber || "Not provided"}</Typography>
          )}
        </Box>
      </Box>

      {calculateProfileCompletion().percentage < 100 && (
        <Box sx={{ mt: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
          <Typography variant="body1" color="warning.main" sx={{ display: 'flex', alignItems: 'center' }}>
            <Warning sx={{ mr: 1 }} />
            Your profile is incomplete. Please fill in all required information to complete your profile.
          </Typography>
        </Box>
      )}

      {/* Edit/Save Buttons */}
      <Box sx={{ 
        mt: 4, 
        pt: 2, 
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        {editMode ? (
          <>
            <Button
              startIcon={<Save />}
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mr: 1 }}
            >
              Save Changes
            </Button>
            <Button
              startIcon={<Cancel />}
              variant="outlined"
              color="error"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            startIcon={<Edit />}
            variant="contained"
            color="primary"
            onClick={handleEditClick}
          >
            Edit Profile
          </Button>
        )}
      </Box>
    </Box>
  );
}
