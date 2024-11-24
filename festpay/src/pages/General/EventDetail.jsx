import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import {
  LocationOn,
  CalendarToday,
  Schedule,
  People,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";

const EventDetail = ({ event }) => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Banner Section */}
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={event.bannerImage || "https://via.placeholder.com/800x300"}
          alt={`${event.name} Banner`}
        />
      </Card>

      <Grid container spacing={3} mt={2}>
        {/* Left Section: Event Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ padding: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {event.name}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <LocationOn color="primary" />
              <Typography variant="body1">{event.location}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <CalendarToday color="primary" />
              <Typography variant="body1">
                {new Date(event.date).toLocaleDateString()} at{" "}
                {new Date(event.date).toLocaleTimeString()}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <Schedule color="primary" />
              <Typography variant="body1">{event.duration} hours</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold">
              About the Event
            </Typography>
            <Typography color="text.secondary" mt={1}>
              {event.description || "No additional details provided."}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold">
              Event Organizer
            </Typography>
            <Typography color="text.secondary" mt={1}>
              {event.organizer.name}
            </Typography>
          </Card>
        </Grid>

        {/* Right Section: Payment, Attendees, and Social Links */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              {/* Payment Section */}
              <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                color="primary"
              >
                ₹{event.registrationFee}/-
              </Typography>
              <Typography
                textAlign="center"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Registration Fee
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Pay Now
              </Button>

              {/* Attendee Info */}
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography fontWeight="bold">Attendees:</Typography>
                <Typography>{event.attendees.length}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography fontWeight="bold">Max Attendees:</Typography>
                <Typography>{event.maxAttendees}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography fontWeight="bold">Registration Deadline:</Typography>
                <Typography>
                  {new Date(event.registrationDeadline).toLocaleDateString()}
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card sx={{ mt: 2, padding: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              {event.socialLinks.facebook && (
                <IconButton
                  href={event.socialLinks.facebook}
                  target="_blank"
                  color="primary"
                >
                  <Facebook />
                </IconButton>
              )}
              {event.socialLinks.instagram && (
                <IconButton
                  href={event.socialLinks.instagram}
                  target="_blank"
                  color="secondary"
                >
                  <Instagram />
                </IconButton>
              )}
              {event.socialLinks.twitter && (
                <IconButton
                  href={event.socialLinks.twitter}
                  target="_blank"
                  sx={{ color: "#1DA1F2" }}
                >
                  <Twitter />
                </IconButton>
              )}
              {event.socialLinks.linkedin && (
                <IconButton
                  href={event.socialLinks.linkedin}
                  target="_blank"
                  sx={{ color: "#0A66C2" }}
                >
                  <LinkedIn />
                </IconButton>
              )}
              {event.socialLinks.youtube && (
                <IconButton
                  href={event.socialLinks.youtube}
                  target="_blank"
                  sx={{ color: "#FF0000" }}
                >
                  <YouTube />
                </IconButton>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Sample Event Data
const sampleEvent = {
  name: "Break a Leg - Beat Breakers",
  description:
    "Join us for an amazing dance battle organized by the Beat Breakers! Show off your moves and enjoy the electrifying performances.",
  date: "2023-12-23T17:30:00",
  duration: 3,
  location: "Parking Area, D.J.L.H.C, NIT Jamshedpur",
  organizer: { name: "Beat Breakers Dance Club" },
  attendees: ["user1", "user2", "user3"],
  maxAttendees: 100,
  registrationFee: 500,
  registrationDeadline: "2023-12-20T23:59:59",
  bannerImage: "https://via.placeholder.com/800x300",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
};

export default function App() {
  return <EventDetail event={sampleEvent} />;
}
