import React, { useState } from "react";
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
} from "@mui/material";
import { LocationOn, DateRange, People, Search, FilterList } from "@mui/icons-material";

const dummyEvents = [
  {
    id: 1,
    name: "Music Festival",
    description: "Enjoy a night of great music and fun.",
    date: "2024-12-01",
    location: "Central Park, NY",
    maxAttendees: 500,
    category: "Music",
    status: "active", // active or inactive
    visibility: "public", // public or private
    bannerImage: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Tech Meetup",
    description: "Discuss the latest in technology and networking.",
    date: "2024-12-10",
    location: "Silicon Valley, CA",
    maxAttendees: 300,
    category: "Technology",
    status: "inactive",
    visibility: "private",
    bannerImage: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    name: "Art Exhibition",
    description: "A showcase of local artists' work.",
    date: "2024-12-15",
    location: "Downtown Gallery, LA",
    maxAttendees: 200,
    category: "Art",
    status: "active",
    visibility: "public",
    bannerImage: "https://via.placeholder.com/300x200",
  },
];

export default function AllEvent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [openFilter, setOpenFilter] = useState(false); // Drawer state

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

  const filteredEvents = dummyEvents.filter((event) => {
    return (
      // Filter by search
      (event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      // Filter by category
      (selectedCategory ? event.category === selectedCategory : true) &&
      // Filter by status
      (selectedStatus ? event.status === selectedStatus : true) &&
      // Filter by visibility
      (selectedVisibility ? event.visibility === selectedVisibility : true) &&
      // Filter by date
      (selectedDate ? event.date === selectedDate : true)
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
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={event.bannerImage}
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
                  <Typography>{event.date}</Typography>
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
                  <Typography>{`Max Attendees: ${event.maxAttendees}`}</Typography>
                </Stack>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {event.description}
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
