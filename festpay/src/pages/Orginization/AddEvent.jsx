import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {
  AddPhotoAlternate,
  CloudUpload,
  LocationOn,
  AccessTime,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDropzone } from "react-dropzone";
import { useContext } from 'react';
import { OrganizationContext } from '../../context/OrganizationContext';
import { useNavigate } from 'react-router-dom';

export default function AddEvent() {
  const { isOrganizationAvailable } = useContext(OrganizationContext);
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState({
    name: "",
    description: "",
    date: null,
    duration: "",
    location: "",
    status: "active",
    visibility: "public",
    maxAttendees: "",
    registrationRequired: false,
    registrationFee: "",
    registrationDeadline: null,
    bannerImage: "",
    resources: [{ title: "", link: "" }],
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      youtube: "",
    },
  });

  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (!isOrganizationAvailable) {
      showToast("Please complete your organization profile first", "error");
      navigate('/organization/account');
    }
  }, [isOrganizationAvailable]);

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => setToast({ ...toast, open: false });

  const validateForm = () => {
    const newErrors = {};
    if (!eventDetails.name.trim()) newErrors.name = "Event name is required";
    if (!eventDetails.description.trim()) newErrors.description = "Event description is required";
    if (!eventDetails.date) newErrors.date = "Event date is required";
    if (!eventDetails.location.trim()) newErrors.location = "Location is required";
    if (!eventDetails.bannerImage) newErrors.bannerImage = "Banner image is required";
    
    if (eventDetails.registrationRequired) {
      if (!eventDetails.registrationDeadline) {
        newErrors.registrationDeadline = "Registration deadline is required";
      }
      if (!eventDetails.registrationFee && eventDetails.registrationFee !== 0) {
        newErrors.registrationFee = "Registration fee is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field, value) => {
    setEventDetails((prev) => ({ ...prev, [field]: value }));
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setEventDetails((prev) => ({ ...prev, bannerImage: file }));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...eventDetails.resources];
    updatedResources[index][field] = value;
    setEventDetails((prev) => ({ ...prev, resources: updatedResources }));
  };

  const addResourceField = () => {
    setEventDetails((prev) => ({
      ...prev,
      resources: [...prev.resources, { title: "", link: "" }],
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();
    
    Object.keys(eventDetails).forEach((key) => {
      if (key === "resources" || key === "socialLinks") {
        formData.append(key, JSON.stringify(eventDetails[key]));
      } else if (key === "bannerImage" && eventDetails.bannerImage) {
        formData.append(key, eventDetails.bannerImage);
      } else {
        formData.append(key, eventDetails[key] || "");
      }
    });

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/event/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Event created successfully!");
        navigate('/organization/all-event');
      } else {
        showToast(data.message || "Failed to create event", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast(error.message || "An error occurred while creating the event", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <TextField
          label="Event Name*"
          name="name"
          value={eventDetails.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Event Description*"
          name="description"
          value={eventDetails.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Event Date*"
            value={eventDetails.date}
            onChange={(value) => handleDateChange("date", value)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          {eventDetails.registrationRequired && (
            <DatePicker
              label="Registration Deadline"
              value={eventDetails.registrationDeadline}
              onChange={(value) =>
                handleDateChange("registrationDeadline", value)
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        </LocalizationProvider>
        <TextField
          label="Duration (hours)"
          name="duration"
          value={eventDetails.duration}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <AccessTime sx={{ color: "action.active", mr: 1 }} />
            ),
          }}
        />
        <TextField
          label="Location"
          name="location"
          value={eventDetails.location}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <LocationOn sx={{ color: "action.active", mr: 1 }} />
            ),
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={eventDetails.status}
            onChange={handleInputChange}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Visibility</InputLabel>
          <Select
            name="visibility"
            value={eventDetails.visibility}
            onChange={handleInputChange}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed grey",
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            ":hover": { backgroundColor: "#eaeaea" },
          }}
        >
          <input {...getInputProps()} />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Banner Preview"
              style={{ width: "100%", borderRadius: 10 }}
            />
          ) : (
            <Typography variant="body2" sx={{ color: "#888" }}>
              Drag & Drop an image or click to upload*
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="h6">Resources</Typography>
          {eventDetails.resources.map((resource, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="center" marginTop={2}>
              <TextField
                label="Title"
                value={resource.title}
                onChange={(e) =>
                  handleResourceChange(index, "title", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Link"
                value={resource.link}
                onChange={(e) =>
                  handleResourceChange(index, "link", e.target.value)
                }
                fullWidth
              />
            </Stack>
          ))}
          <Button onClick={addResourceField}>Add Resource</Button>
        </Box>
        <Divider />
        <Typography variant="h6">Social Links</Typography>
        <Grid container spacing={2}>
          {Object.keys(eventDetails.socialLinks).map((key) => (
            <Grid item xs={6} key={key}>
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                // placeholder={`Enter ${key} URL`}
                value={eventDetails.socialLinks[key]}
                onChange={(e) =>
                  setEventDetails((prev) => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, [key]: e.target.value },
                  }))
                }
                fullWidth
                InputProps={{
                  startAdornment: {
                    facebook: <Facebook />,
                    instagram: <Instagram />,
                    twitter: <Twitter />,
                    linkedin: <LinkedIn />,
                    youtube: <YouTube />,
                  }[key],
                }}
              />
            </Grid>
          ))}
        </Grid>
        <TextField
          label="Event Name*"
          name="name"
          value={eventDetails.name}
          onChange={handleInputChange}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
        />

        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          onClick={handleSubmit}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Submitting..." : "Submit Event"}
        </Button>

      </Stack>
      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
