import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Menu, MenuItem, FormControl, Select, InputLabel, OutlinedInput, TextField } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/lab"; // Add this for date selection

// Dummy event data
const events = [
  {
    name: "Tech Conference",
    description: "A tech conference for developers and tech enthusiasts.",
    date: "2024-12-10",
    location: "San Francisco",
    category: "Tech",
    maxAttendees: 500,
    bannerImage: "https://via.placeholder.com/500x300",
    registrationRequired: true,
    registrationFee: 50,
    totalRegistrations: 100,
  },
  {
    name: "Music Festival",
    description: "A grand music festival featuring top artists.",
    date: "2024-12-15",
    location: "New York",
    category: "Music",
    maxAttendees: 1000,
    bannerImage: "https://via.placeholder.com/500x300",
    registrationRequired: false,
    registrationFee: 0,
    totalRegistrations: 300,
  },
  // Add more events here
];

export default function EventSearch() {
  // State for filter menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter events based on search, category, location, and date
  const filteredEvents = events.filter((event) => {
    return (
      (event.name.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery) &&
      (event.category === selectedCategory || !selectedCategory) &&
      (event.location === selectedLocation || !selectedLocation) &&
      (selectedDate ? new Date(event.date) >= selectedDate : true)
    );
  });

  return (
    <Box sx={{ p: 4 }}>

      {/* Search Bar and Filter Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <TextField
          label="Search Events"
          variant="outlined"
          fullWidth
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mr: 2 }}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleFilterClick}
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
      >
        <Box sx={{ p: 2, width: 250 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filters
          </Typography>

          {/* Category Filter */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Music">Music</MenuItem>
            </Select>
          </FormControl>

          {/* Location Filter */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Location</InputLabel>
            <Select
              value={selectedLocation}
              onChange={handleLocationChange}
              label="Location"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="San Francisco">San Francisco</MenuItem>
              <MenuItem value="New York">New York</MenuItem>
            </Select>
          </FormControl>

          {/* Date Filter */}
          <DatePicker
            label="Event Date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
            sx={{ mb: 2 }}
          />

          <Button
            variant="outlined"
            fullWidth
            onClick={handleFilterClose}
            sx={{ mt: 2 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Menu>

      {/* Display Filtered Events */}
      <Grid container spacing={3}>
        {filteredEvents.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={event.bannerImage}
                alt={event.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {event.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.location}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {event.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={event.registrationRequired && event.totalRegistrations >= event.maxAttendees}
                >
                  {event.registrationRequired ? "Register Now" : "View Details"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
