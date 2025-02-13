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
        },
        {
            title: "How can I engage with potential attendees before the event?",
            content: "Use our interactive features like polls, Q&A sessions, sneak peeks, and updates to keep potential attendees engaged. You can also create event-specific discussion groups and send targeted updates to registered participants."
        },
        {
            title: "What are the best practices for creating engaging event listings?",
            content: "Create compelling event titles, use high-quality images, write clear descriptions with key highlights, include speaker bios if applicable, and clearly state the value proposition. Our platform provides templates and guidelines to help you create attractive event listings."
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
                            Promotion Guide
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
                            Learn how to effectively promote your events and reach the right audience
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
                                alt="Promotion Guide"
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
                                Boost your event's reach with our promotional tools
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}