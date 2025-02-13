import React from 'react';
import { Footer, TopBar } from '../../components';
import { Box, Typography, Button, Grid, Card, Container, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Slider from "react-slick";
import CampaignIcon from '@mui/icons-material/Campaign';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShareIcon from '@mui/icons-material/Share';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import QrCodeIcon from '@mui/icons-material/QrCode';
import dasboardhero from "../../assets/images/hostevent.png"; // Update with host-related image
import bg3 from "../../assets/images/bg3.webp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from 'react-router-dom';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function HostEvent() {
  return (
    <>
      <TopBar />
      <Hero />
      <Features />
      <Faq />
      <Footer />
    </>
  );
}

function Hero() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <div className="bg-left-top bg-no-repeat bg-[length:800px]" style={{ backgroundImage: `url(${bg3})` }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 10 },
          maxWidth: "1300px",
          mx: "auto",
          mt: 7
        }}
      >
        {/* Left Content */}
        <Grid
          container
          direction="column"
          alignItems={isSmallScreen ? "center" : "flex-start"}
          sx={{ flex: 1, textAlign: isSmallScreen ? "center" : "left" }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Create & Manage Events: <br /> Simple & Powerful
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: "text.secondary",
              fontSize: { xs: "0.9rem", md: "1rem" },
              borderLeft: "4px solid",
              borderColor: "primary.main",
              pl: 2,
              py: 2
            }}
          >
            Streamline Your Event Management <br /> From Registration to Check-in
          </Typography>
          <Button
            component={Link}
            to="/coming-soon"
            variant="contained"
            color="primary"
            sx={{
              mt: 4,
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: "medium",
              boxShadow: 2,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4
              }
            }}
          >
            Host an Event
          </Button>
        </Grid>

        {/* Right Image */}
        <Box
          component="img"
          src={dasboardhero}
          alt="Event Hosting Dashboard"
          sx={{
            flex: 1,
            maxWidth: { xs: "100%", md: "600px" },
            height: "auto",
            mx: "auto",
          }}
        />
      </Box>
    </div>
  );
}

function Features() {
  const features = [
    {
      title: "Elevate Engagement",
      description: "Connect with participants in real time through comments, live updates, and information. Foster interaction, answer questions instantly, and make your event truly unforgettable!",
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: "#2196f3"
    },
    {
      title: "Real-time Monitoring",
      description: "You'll receive detailed analytics, including event views, participant interactions, and feedback, to help assess the success of your event.",
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      color: "#4caf50"
    },
    {
      title: "Setup an Event",
      description: "Setting up your event is quick and easy, typically taking just a few minutes to complete all necessary details and publish your event.",
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      color: "#ff9800"
    }
  ];

  return (
    <Box 
      sx={{ 
        px: { xs: 3, md: 8 }, 
        py: { xs: 6, md: 10 },
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 6,
            color: "primary.main",
            textAlign: "center",
            fontSize: { xs: "2rem", md: "2.5rem" }
          }}
        >
          Host Your Event with Ease
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 3
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    color: feature.color,
                    bgcolor: `${feature.color}15`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "text.primary",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ 
                    color: "text.secondary",
                    lineHeight: 1.7
                  }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function Faq() {
    const accordionData = [
        {
            title: "How do I create my first event?",
            content: "Creating an event is simple! Click 'Host an Event', fill in basic details like title, date, and venue, customize your registration form, set up ticket types, and publish. Our step-by-step wizard guides you through the entire process."
        },
        {
            title: "What types of tickets can I create?",
            content: "You can create multiple ticket types including free, paid, early bird, VIP, and student discounts. Set different prices, quantities, and sale periods for each ticket type to maximize attendance."
        },
        {
            title: "How does the check-in process work?",
            content: "We provide a mobile check-in app and QR code system. Attendees receive unique QR codes with their tickets, which can be scanned at entry for instant verification. You can also manage check-ins manually or assign check-in staff."
        },
        {
            title: "Can I customize registration forms?",
            content: "Yes! Create custom registration forms with various field types including text, multiple choice, file uploads, and more. Collect exactly the information you need from attendees."
        },
        {
            title: "How do I manage payments and refunds?",
            content: "Our platform integrates secure payment processing. Set up your payment account, track transactions in real-time, and process refunds when needed. We support multiple payment methods and automatic payment reconciliation."
        },
        {
            title: "What communication tools are available?",
            content: "Send automated confirmation emails, event reminders, and updates to registered attendees. Use our messaging system for announcements and create event-specific communication channels."
        },
        {
            title: "How can I track event performance?",
            content: "Access real-time analytics including ticket sales, revenue, attendance rates, and registration patterns. Generate reports and export data for detailed analysis."
        },
        {
            title: "What security features are included?",
            content: "We provide secure payment processing, fraud prevention, ticket verification, and data encryption. Control access with different staff permission levels and monitor all system activities."
        }
    ];

    return (
        <Box sx={{ py: 8, px: { xs: 3, md: 8 }, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    {/* FAQ Section */}
                    <Grid item xs={12} md={7}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: "bold",
                                mb: 3,
                                color: "primary.main",
                                fontSize: { xs: "2rem", md: "2.5rem" },
                            }}
                        >
                            Event Hosting Guide
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 4,
                                color: "text.secondary",
                                borderLeft: "4px solid",
                                borderLeftColor: "primary.main",
                                pl: 2,
                            }}
                        >
                            Learn how to effectively host and manage your events
                        </Typography>

                        {accordionData.map((item, index) => (
                            <Accordion 
                                key={index} 
                                sx={{ 
                                    mb: 2, 
                                    borderRadius: "8px", 
                                    '&:before': { display: 'none' },
                                    boxShadow: 'none',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                    }
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon color="primary" />}
                                    sx={{ 
                                        bgcolor: "background.paper",
                                        '&:hover': {
                                            bgcolor: 'primary.light',
                                        }
                                    }}
                                >
                                    <Typography 
                                        variant="subtitle1" 
                                        sx={{ 
                                            fontWeight: "bold",
                                            color: 'text.primary'
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography 
                                        variant="body1"
                                        sx={{ 
                                            color: 'text.secondary',
                                            lineHeight: 1.7
                                        }}
                                    >
                                        {item.content}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>

                    {/* Image Section */}
                    <Grid item xs={12} md={5}>
                        <Box
                            sx={{
                                p: 3,
                                bgcolor: 'background.default',
                                borderRadius: 4,
                                boxShadow: 3,
                                textAlign: 'center'
                            }}
                        >
                            <img
                                src={dasboardhero}
                                alt="Event Hosting Guide"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '12px'
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    mt: 3,
                                    color: 'text.primary',
                                    fontWeight: 'medium'
                                }}
                            >
                                Streamline your event management with our tools
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}