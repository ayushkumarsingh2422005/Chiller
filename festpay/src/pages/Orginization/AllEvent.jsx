import React, { useState, useEffect, useContext } from "react";
import { OrganizationContext } from "../../context/OrganizationContext";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Chip,
} from "@mui/material";
import { LocationOn, DateRange, People, Search, FilterList } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

export default function AllEvent() {
  const { organizationData } = useContext(OrganizationContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [openFilter, setOpenFilter] = useState(false); // Drawer state

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/event/organization`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setSelectedVisibility(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    return (
      (event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory ? event.category === selectedCategory : true) &&
      (selectedStatus ? event.status === selectedStatus : true) &&
      (selectedVisibility ? event.visibility === selectedVisibility : true) &&
      (selectedDate ? new Date(event.date).toISOString().split('T')[0] === selectedDate : true)
    );
  });

  const toggleDrawer = (open) => {
    setOpenFilter(open);
  };

  return (
    <Box sx={{ px: 2, py: 4 }}>
      {/* Search and Filter Button */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TextField
          label="Search Events"
          fullWidth
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FilterList />}
          onClick={() => toggleDrawer(true)}
          sx={{ ml: 2 }}
        >
          Filter
        </Button>
      </Box>

      {/* Drawer for Filters */}
      <Drawer anchor="right" open={openFilter} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Filter Options
          </Typography>

          {/* Category Filter */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Art">Art</MenuItem>
            </Select>
          </FormControl>

          {/* Status Filter */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          {/* Visibility Filter */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Visibility</InputLabel>
            <Select
              value={selectedVisibility}
              onChange={handleVisibilityChange}
              label="Visibility"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
          </FormControl>

          {/* Date Filter */}
          <TextField
            label="Event Date"
            type="date"
            fullWidth
            variant="outlined"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />

          {/* Close Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => toggleDrawer(false)}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>


      {/* Event Cards */}
      <Grid container spacing={3}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredEvents.length === 0 ? (
          <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No events found
            </Typography>
          </Box>
        ) : (
          filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={event.bannerImage ? 
                    `${import.meta.env.VITE_IMAGE_URL}/${event.bannerImage}` : 
                    "https://via.placeholder.com/300x200"}
                  alt={`${event.name} banner`}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {event.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <IconButton size="small" disabled>
                      <DateRange />
                    </IconButton>
                    <Typography>{new Date(event.date).toLocaleDateString()}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <IconButton size="small" disabled>
                      <LocationOn />
                    </IconButton>
                    <Typography>{event.location}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <IconButton size="small" disabled>
                      <People />
                    </IconButton>
                    <Typography>
                      {event.maxAttendees === -1 
                        ? 'Unlimited Attendees' 
                        : `Max Attendees: ${event.maxAttendees}`}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Chip 
                      label={event.status} 
                      color={event.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                    <Chip 
                      label={event.visibility} 
                      color={event.visibility === 'public' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  </Box>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/organization/event/${event._id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
