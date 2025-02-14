import React from 'react';
import { Footer, TopBar } from '../../components';
import { Box, Typography, Button, Grid, Card, Container, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slider from "react-slick";
import bg3 from "../../assets/images/bg3.webp";
import dasboardhero from "../../assets/images/ticketing.png"; // Add ticketing-related image
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SecurityIcon from '@mui/icons-material/Security';
import LinkIcon from '@mui/icons-material/Link';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Link } from 'react-router-dom';
import faq from "../../assets/images/faq.png"

export default function TicketingSolution() {
  return (
    <>
      <TopBar />
      <Hero />
      <Features />
      <Benefits />
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
            Seamless Ticketing Solution <br /> for Your Events
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
            Generate secure payment links, process registrations, <br />
            and deliver tickets instantly to your attendees
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
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4
              }
            }}
          >
            Start Selling Tickets
          </Button>
        </Grid>

        <Box
          component="img"
          src={dasboardhero}
          alt="Ticketing Solution"
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
      title: "Secure Payment Links",
      description: "Generate unique payment links for your events that attendees can use to register and pay securely.",
      icon: <LinkIcon sx={{ fontSize: 40 }} />,
      color: "#2196f3"
    },
    {
      title: "Instant Ticket Delivery",
      description: "Automated ticket generation and delivery as soon as payment is confirmed, with QR codes for easy check-in.",
      icon: <QrCodeIcon sx={{ fontSize: 40 }} />,
      color: "#4caf50"
    },
    {
      title: "Automated Processing",
      description: "Streamlined payment processing and registration management, eliminating manual handling and reducing errors.",
      icon: <AutorenewIcon sx={{ fontSize: 40 }} />,
      color: "#ff9800"
    }
  ];

  return (
    <Box sx={{ py: 8, px: { xs: 3, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 6,
            textAlign: "center",
            color: "primary.main",
            fontSize: { xs: "2rem", md: "2.5rem" }
          }}
        >
          Powerful Ticketing Features
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
                    bgcolor: `${feature.color}15`
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "text.primary"
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
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

function Benefits() {
  const benefits = [
    {
      title: "Effortless Payment Processing",
      description: "Accept payments securely with multiple payment options and automatic reconciliation.",
      icon: <PaymentIcon />,
    },
    {
      title: "Digital Ticket Management",
      description: "Generate and manage digital tickets with unique QR codes for seamless check-in.",
      icon: <ReceiptLongIcon />,
    },
    {
      title: "Secure Transactions",
      description: "Enterprise-grade security for all payments and attendee data.",
      icon: <SecurityIcon />,
    }
  ];

  return (
    <Box sx={{ py: 8, px: { xs: 3, md: 8 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 6,
            textAlign: "center",
            color: "primary.main",
            fontSize: { xs: "2rem", md: "2.5rem" }
          }}
        >
          Why Choose Our Ticketing Solution?
        </Typography>
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%'
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2
                  }}
                >
                  {benefit.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography color="text.secondary">
                  {benefit.description}
                </Typography>
              </Box>
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
            title: "How does the payment process work?",
            content: "Our platform generates a secure payment link for your event. Attendees can click the link, complete their registration, and pay using various payment methods. Once payment is confirmed, they automatically receive their digital ticket."
        },
        {
            title: "What payment methods are supported?", 
            content: "We support multiple payment methods including credit/debit cards, UPI, and net banking to ensure convenient payment options for all attendees."
        },
        {
            title: "How are tickets delivered to attendees?",
            content: "After successful payment, attendees receive their tickets instantly via email. Each ticket includes a unique QR code for easy check-in at the event."
        }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-4 max-w-[1200px] mx-auto mb-36">
            {/* Accordion Section */}
            <div className="lg:w-1/2">
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                        color: "primary.main",
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    Frequently asked questions
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 3,
                        maxWidth: "800px",
                        color: "text.secondary",
                        fontSize: { xs: "1rem", md: "1.25rem" },
                        borderLeft: "4px solid",
                        borderLeftColor: "primary.main",
                        pl: 2,
                    }}
                >
                    Get answers to common questions about using our ticketing solution.
                </Typography>
                <br />
                {accordionData.map((item, index) => (
                    <Accordion key={index} sx={{ mb: 2, borderRadius: "8px", boxShadow: 0 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            sx={{ bgcolor: "background.paper" }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: "background.default" }}>
                            <Typography>{item.content}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>

            {/* Image/Preview Section */}
            <div className="lg:w-1/2 flex justify-center">
                <div className="w-full max-w-md rounded-lg bg-white flex items-center justify-center p-2">
                    <img
                        src={faq}
                        alt="Placeholder"
                        className="rounded-lg mb-4 w-full"
                    />
                </div>
            </div>
        </div>
    );
}
