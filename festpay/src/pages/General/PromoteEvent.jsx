import React from 'react';
import { Footer, TopBar } from '../../components';
import { Box, Typography, Button, Grid, Card, Container, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Slider from "react-slick";
import CampaignIcon from '@mui/icons-material/Campaign';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShareIcon from '@mui/icons-material/Share';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import dasboardhero from "../../assets/images/promoteevent.png"; // Update with promotion-related image
import bg3 from "../../assets/images/bg3.webp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from 'react-router-dom';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function PromoteEvent() {
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
            Amplify Your Event's Reach: <br /> Promote & Engage
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
            Reach the Right Audience and Boost <br /> Event Visibility with Smart Promotion Tools
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
            Start Promoting
          </Button>
        </Grid>

        {/* Right Image */}
        <Box
          component="img"
          src={dasboardhero}
          alt="Event Promotion Dashboard"
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
      title: "Track the Success",
      description: "Our platform offers real-time analytics to monitor views, RSVPs, and participant interactions, helping you measure and optimize your event's performance.",
      icon: <BarChartIcon sx={{ fontSize: 40 }} />,
      color: "#2196f3"
    },
    {
      title: "Type of Events",
      description: "You can promote all types of college events, including academic, cultural, sports, and club activities, ensuring every event gets the attention it deserves.",
      icon: <CampaignIcon sx={{ fontSize: 40 }} />,
      color: "#4caf50"
    },
    {
      title: "Effectively Promote your Event",
      description: "Our platform centralizes your event details, enhances visibility through targeted audiences, and provides tools for seamless sharing and engagement, ensuring maximum reach.",
      icon: <ShareIcon sx={{ fontSize: 40 }} />,
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
          Promotion Features
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  p: 4,
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  bgcolor: `${feature.color}15`,
                  border: '1px solid',
                  borderColor: `${feature.color}30`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 3,
                    borderColor: feature.color,
                    '& .feature-icon': {
                      bgcolor: feature.color,
                      color: 'white'
                    }
                  }
                }}
              >
                <Box 
                  className="feature-icon"
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
            title: "How can I maximize my event's visibility on the platform?",
            content: "To maximize visibility, ensure your event details are complete with engaging descriptions, high-quality images, and relevant tags. Utilize our social media integration tools, schedule promotional posts, and engage with your target audience through our platform's messaging features."
        },
        {
            title: "What promotional tools are available for event organizers?", 
            content: "We offer a comprehensive suite of promotional tools including social media integration, email marketing templates, QR code generation, automated reminders, targeted notifications, and analytics dashboard to track promotion effectiveness."
        },
        {
            title: "How does the targeted promotion feature work?",
            content: "Our smart targeting system analyzes user interests, past event attendance, and engagement patterns to recommend your event to the most relevant audience. You can also set specific parameters like department, year of study, and interests to reach your ideal audience."
        },
        {
            title: "What strategies work best for promoting different types of events?",
            content: "For academic events, focus on department-specific targeting and professional networking features. Cultural events benefit from visual content sharing and early-bird promotions. Sports events can utilize real-time updates and team participation features. We provide customized promotion strategies based on your event type."
        },
        {
            title: "How early should I start promoting my event?",
            content: "We recommend starting promotions 3-4 weeks before the event. Create an initial announcement, followed by regular updates about speakers, activities, or early-bird registrations. Our platform helps you schedule and automate these promotional activities."
        },
        {
            title: "Can I track the effectiveness of my event promotion?",
            content: "Yes! Our analytics dashboard provides real-time metrics including view counts, registration rates, social media engagement, and audience demographics. You can track which promotional channels are most effective and adjust your strategy accordingly."
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
                    Get answers to common questions about using our dashboard to manage your events effectively.
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

            {/* Image Section */}
            <div className="lg:w-1/2 flex justify-center">
                <div className="w-full max-w-md rounded-lg bg-white flex items-center justify-center p-2">
                    <img
                        src={dasboardhero}
                        alt="Promotion Guide"
                        className="rounded-lg mb-4 w-full"
                    />
                </div>
            </div>
        </div>
    );
}